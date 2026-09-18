/* Skill Saga — Learner App Foundation runtime v1
 * Runtime counterpart to admin-console-foundation-control.js.
 */
(function(){
'use strict';
var cache={startup:null,authentication:null,learnerSetup:null,home:null};
var defaults={
 startup:{enabled:true,maintenanceMode:false,maintenanceMessage:'Skill Saga is temporarily under maintenance. Please try again shortly.',minimumVersion:'1.0.0',forceUpdate:false},
 authentication:{emailLoginEnabled:true,emailSignupEnabled:true,passwordResetEnabled:true,mobileLoginEnabled:false,mobileSignupEnabled:false,learnerSignupEnabled:true,parentSignupEnabled:true,teacherSignupEnabled:true,requireProfileSetup:true,requireEmailVerification:false,requireTerms:true},
 learnerSetup:{enabled:true,requireBoard:true,requireClass:true,requireSubjects:true,requireLearningGoals:false,requireLearningProfile:false,boards:['CBSE'],classes:[1,2,3,4,5,6,7,8,9,10,11,12],defaultSubjects:[],goals:['Improve school performance','Practice regularly','Build core skills']},
 home:{enabled:true,showStats:true,showDailyMission:true,showSkills:true,showMilestone:true,showContinueLearning:true,showBottomNote:true,showNotifications:true,sectionOrder:'stats,dailyMission,skills,milestone,continueLearning',welcomeTitle:'A smarter way to learn — one challenge at a time.',welcomeQuote:'Small Steps | Big Achievements!'}
};
function merge(a,b){return Object.assign({},a,b||{})}
async function getConfig(id){
  if(cache[id])return cache[id];
  var d=defaults[id];
  try{
    if(typeof cloudDb==='undefined'||!cloudDb)return d;
    var s=await cloudDb.collection('appSettings').doc(id).get();
    cache[id]=s.exists?merge(d,s.data()):d;
  }catch(e){cache[id]=d}
  return cache[id];
}
window.ssFoundationResetConfig=function(){cache={startup:null,authentication:null,learnerSetup:null,home:null}};
window.ssFoundationStartupGate=async function(){
  var root=document.getElementById('root');
  if(root)root.innerHTML='<div class="auth" style="min-height:100vh;justify-content:center;text-align:center"><div><img src="logo.png" style="width:86px;height:86px;border-radius:22px"><h1 style="margin:14px 0 5px">Skill Saga</h1><div class="muted">A smarter way to learn</div><div style="margin-top:18px;color:#1769ff;font-weight:800">Loading your learning space…</div></div></div>';
  var s=await getConfig('startup');
  await Promise.all([getConfig('authentication'),getConfig('learnerSetup'),getConfig('home')]);
  if(s.enabled===false)return true;
  if(s.maintenanceMode){
    if(root)root.innerHTML='<div class="auth" style="min-height:100vh;justify-content:center;text-align:center"><div class="authbox"><img src="logo.png" style="width:76px;height:76px;border-radius:20px"><h1>Skill Saga</h1><div class="notice">'+escFoundation(s.maintenanceMessage||defaults.startup.maintenanceMessage)+'</div><div class="muted">Please try again later.</div></div></div>';
    return false;
  }
  await new Promise(function(resolve){setTimeout(resolve,350)});
  return true;
};
function escFoundation(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function needSetup(u,o){
  if(!u||u.role!=='learner'||o.enabled===false)return false;
  if(u.onboardingCompleted===true)return false;
  if(o.requireBoard&&!u.board)return true;
  if(o.requireClass&&!u.studentClass)return true;
  if(o.requireSubjects&&(!Array.isArray(u.subjects)||!u.subjects.length))return true;
  if(o.requireLearningGoals&&(!Array.isArray(u.learningGoals)||!u.learningGoals.length))return true;
  if(o.requireLearningProfile&&!u.learningProfile)return true;
  return true;
}
window.ssFoundationRoute=async function(u){
  var a=await getConfig('authentication');
  if(a.requireEmailVerification&&u&&u.role==='learner'&&cloudUser&&cloudUser.emailVerified===false){
    return ssFoundationVerifyEmail();
  }
  var o=await getConfig('learnerSetup');
  if(needSetup(u,o))return ssFoundationSetupScreen(u,o);
  return false;
};
window.ssFoundationSetupScreen=function(u,o){
  var root=document.getElementById('root');
  if(!root)return true;
  var boards=(o.boards&&o.boards.length?o.boards:['CBSE']).map(function(x){return '<option value="'+escFoundation(x)+'" '+(String(u.board||'')===String(x)?'selected':'')+'>'+escFoundation(x)+'</option>'}).join('');
  var classes=(o.classes&&o.classes.length?o.classes:[1,2,3,4,5,6,7,8,9,10,11,12]).map(function(x){return '<option value="'+escFoundation(x)+'" '+(String(u.studentClass||'')===String(x)?'selected':'')+'>Class '+escFoundation(x)+'</option>'}).join('');
  var subs=o.defaultSubjects&&o.defaultSubjects.length?o.defaultSubjects:['English','Hindi','Mathematics','Science','Social Science'];
  var goals=o.goals&&o.goals.length?o.goals:['Improve school performance','Practice regularly','Build core skills'];
  var subjectHtml=subs.map(function(x,i){var on=Array.isArray(u.subjects)&&u.subjects.indexOf(x)>=0;return '<label style="display:flex;gap:8px;align-items:center;margin:8px 0"><input class="ss-setup-subject" type="checkbox" value="'+escFoundation(x)+'" '+(on?'checked':'')+'> '+escFoundation(x)+'</label>'}).join('');
  var goalHtml=goals.map(function(x){var on=Array.isArray(u.learningGoals)&&u.learningGoals.indexOf(x)>=0;return '<label style="display:flex;gap:8px;align-items:center;margin:8px 0"><input class="ss-setup-goal" type="checkbox" value="'+escFoundation(x)+'" '+(on?'checked':'')+'> '+escFoundation(x)+'</label>'}).join('');
  root.innerHTML='<div class="auth" style="min-height:100vh;background:linear-gradient(145deg,#eef4ff,#f7f1ff);padding:24px 16px"><div class="authbox" style="max-width:430px;margin:auto"><div style="text-align:center"><img src="logo.png" style="width:72px;height:72px;border-radius:19px"><h1 style="margin:12px 0 4px">Let’s set up your learning space 🎓</h1><div class="muted">A few details help Skill Saga personalize Learn, Play and your Home.</div></div>'+
    (o.requireBoard?'<label>Board</label><select id="ssSetupBoard" class="input">'+boards+'</select>':'')+
    (o.requireClass?'<label>Class</label><select id="ssSetupClass" class="input">'+classes+'</select>':'')+
    (o.requireSubjects?'<label>Your subjects</label><div class="card">'+subjectHtml+'</div>':'')+
    (o.requireLearningGoals?'<label>Learning goals</label><div class="card">'+goalHtml+'</div>':'')+
    (o.requireLearningProfile?'<label>Learning profile</label><select id="ssSetupProfile" class="input"><option value="balanced">Balanced</option><option value="exam">Exam Focused</option><option value="practice">Practice Focused</option><option value="skills">Skills Focused</option></select>':'')+
    '<button class="btn gold block" onclick="ssFoundationSaveSetup()">Continue to Skill Saga →</button>'+
    '<div class="muted center" style="margin-top:10px">You can update these details later from your profile.</div></div></div>';
  return true;
};
window.ssFoundationSaveSetup=async function(){
  var u=typeof user==='function'?user():null;
  if(!u||!cloudUser||!cloudDb)return toast('Please sign in again.');
  var o=await getConfig('learnerSetup'),d={onboardingCompleted:true,onboardingCompletedAt:new Date(),updatedAt:new Date(),updatedBy:cloudUser.uid};
  var b=document.getElementById('ssSetupBoard'),cl=document.getElementById('ssSetupClass'),pf=document.getElementById('ssSetupProfile');
  if(b)d.board=b.value;
  if(cl)d.studentClass=cl.value;
  d.subjects=Array.prototype.slice.call(document.querySelectorAll('.ss-setup-subject:checked')).map(function(e){return e.value});
  d.learningGoals=Array.prototype.slice.call(document.querySelectorAll('.ss-setup-goal:checked')).map(function(e){return e.value});
  if(pf)d.learningProfile=pf.value;
  if(o.requireBoard&&!d.board)return toast('Please select your board.');
  if(o.requireClass&&!d.studentClass)return toast('Please select your class.');
  if(o.requireSubjects&&!d.subjects.length)return toast('Select at least one subject.');
  if(o.requireLearningGoals&&!d.learningGoals.length)return toast('Select at least one learning goal.');
  try{
    Object.assign(u,d);
    await cloudDb.collection('users').doc(cloudUser.uid).set(d,{merge:true});
    if(typeof writeLocal==='function')writeLocal(u);
    toast('Learning setup saved ✓');
    setTimeout(function(){home()},200);
  }catch(e){toast(e.message||'Could not save setup')}
};
window.ssFoundationVerifyEmail=function(){
  var root=document.getElementById('root');if(!root)return true;
  root.innerHTML='<div class="auth" style="min-height:100vh;justify-content:center"><div class="authbox"><h1>Verify your email</h1><p class="muted">Please verify your email address before entering Skill Saga.</p><button class="btn block" onclick="ssFoundationSendVerification()">Resend verification email</button><button class="btn light block" style="margin-top:8px" onclick="location.reload()">I verified — Continue</button><button class="btn light block" style="margin-top:8px" onclick="logout()">Logout</button></div></div>';
  return true;
};
window.ssFoundationSendVerification=async function(){try{if(cloudUser)await cloudUser.sendEmailVerification();toast('Verification email sent ✓')}catch(e){toast(e.message||'Could not send verification email')}};
window.ssFoundationAuthConfig=async function(){return getConfig('authentication')};
window.ssFoundationAuthCached=function(){return cache.authentication||defaults.authentication};
window.ssFoundationHomeConfig=async function(){return getConfig('home')};
window.ssFoundationApplyHome=function(h){
  if(!h)return;
  var root=document.querySelector('.ss-home-final');if(!root)return;
  function hide(selector){var e=root.querySelector(selector);if(e)e.style.display='none'}
  if(h.enabled===false){root.innerHTML='<div class="card"><h2>Home is temporarily unavailable</h2><p class="muted">Please check back shortly.</p></div>';return}
  if(h.showStats===false)hide('.ss-home-stats');
  if(h.showDailyMission===false){hide('.ss-home-mission');hide('.ss-home-mission') ;var x=Array.from(root.querySelectorAll('.ss-home-section')).find(function(e){return e.textContent.indexOf("Today")>=0});if(x)x.style.display='none'}
  if(h.showSkills===false){hide('.ss-home-skills');var x2=Array.from(root.querySelectorAll('.ss-home-section')).find(function(e){return e.textContent.indexOf('Your Skills')>=0});if(x2)x2.style.display='none'}
  if(h.showMilestone===false){hide('.ss-home-card');var x3=Array.from(root.querySelectorAll('.ss-home-section')).find(function(e){return e.textContent.indexOf('Next Milestone')>=0});if(x3)x3.style.display='none'}
  if(h.showContinueLearning===false){Array.from(root.querySelectorAll('.ss-home-continue')).forEach(function(e){e.style.display='none'});var x4=Array.from(root.querySelectorAll('.ss-home-section')).find(function(e){return e.textContent.indexOf('Continue Learning')>=0});if(x4)x4.style.display='none'}
  if(h.showBottomNote===false){var n=root.querySelector('.ss-home-bottom-note');if(n)n.style.display='none'}
  var title=root.querySelector('.ss-home-sub');if(title&&h.welcomeTitle)title.textContent=h.welcomeTitle;
  var q=root.querySelector('.ss-home-quote');if(q&&h.welcomeQuote)q.innerHTML=escFoundation(h.welcomeQuote).replace(/\|/g,'<br>');
};
})();
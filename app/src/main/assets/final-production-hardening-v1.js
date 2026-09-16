/* Skill Saga — production hardening v1
 * Additive launch fixes. Keeps the tested quiz/admin engine intact.
 */
(function(){
'use strict';
if(window.__SS_PRODUCTION_HARDENING_V1)return;
window.__SS_PRODUCTION_HARDENING_V1=true;

function toast(m){if(typeof window.toast==='function')window.toast(m);}
function esc(v){return String(v==null?'':v).replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c];});}
function user(){try{return typeof window.user==='function'?window.user():null;}catch(e){return null;}}
function db(){return window.firebase&&firebase.firestore?firebase.firestore():null;}
function cleanQuestions(q){
  if(!q)return q;
  var raw=q.questionsJson;
  if(raw){
    try{
      var parsed=typeof raw==='string'?JSON.parse(raw):raw;
      if(Array.isArray(parsed)){
        q.questions=parsed.map(function(x){
          if(Array.isArray(x))return x;
          return [String(x.question||''),Array.isArray(x.options)?x.options:[],Number(x.correctIndex||0),String(x.explanation||'')];
        }).filter(function(x){return x[0];});
      }
    }catch(e){console.warn('Skill Saga question normalization failed',e);}
  }
  if(!Array.isArray(q.questions))q.questions=[];
  return q;
}
function normalizeLocalContent(){
  if(window.local&&Array.isArray(window.local.content))window.local.content=window.local.content.map(cleanQuestions);
}

/* Ensure Firestore questionJson is authoritative even if older test documents
 * still contain a stale questions field. */
function patchContentLoader(){
  if(typeof window.loadCloudContent!=='function'||window.__SS_LOADER_PATCHED)return;
  window.__SS_LOADER_PATCHED=true;
  var original=window.loadCloudContent;
  window.loadCloudContent=async function(){
    var result=await original.apply(this,arguments);
    normalizeLocalContent();
    return result;
  };
}

/* Preserve question-by-question attempt data in local history. */
function patchFinishQuiz(){
  if(typeof window.finishQuiz!=='function'||window.__SS_FINISH_PATCHED)return;
  window.__SS_FINISH_PATCHED=true;
  var original=window.finishQuiz;
  window.finishQuiz=async function(){
    var before=null;
    try{
      var s=window.quizState;
      if(s&&s.c&&Array.isArray(s.c.questions)){
        before={questions:JSON.parse(JSON.stringify(s.c.questions)),responses:Array.isArray(s.responses)?s.responses.slice():[]};
      }
    }catch(e){}
    var result=await original.apply(this,arguments);
    try{
      var u=user();
      if(u&&Array.isArray(u.history)&&u.history.length&&before){
        var last=u.history[u.history.length-1];
        if(last&&!Array.isArray(last.questions))last.questions=before.questions;
        if(last&&!Array.isArray(last.responses))last.responses=before.responses;
        if(typeof window.writeLocal==='function')window.writeLocal(u);
        if(typeof window.persistUser==='function')await window.persistUser(u);
      }
    }catch(e){console.warn('Attempt detail persistence failed',e);}
    return result;
  };
}

/* Password reset from Settings must not depend on the login-screen email box. */
window.ssChangePassword=function(){
  if(!window.firebase||!firebase.auth)return toast('Firebase is not connected');
  var cu=firebase.auth().currentUser;
  var email=cu&&cu.email?cu.email:'';
  if(!email){email=window.prompt('Enter the email address for your Skill Saga account:','')||'';email=email.trim().toLowerCase();}
  if(!email)return;
  firebase.auth().sendPasswordResetEmail(email).then(function(){toast('Password reset email sent to '+email);}).catch(function(e){toast(e&&e.message?e.message:'Could not send password reset email');});
};

/* Assigned-quiz notification action. */
window.ssOpenAssignedQuiz=async function(id){
  var d=db();
  if(!d||!id)return toast('Assigned quiz is unavailable');
  try{
    var snap=await d.collection('quizzes').doc(String(id)).get();
    if(!snap.exists)return toast('This assigned quiz is no longer available.');
    var q=cleanQuestions(Object.assign({id:snap.id},snap.data()));
    if(window.local&&Array.isArray(window.local.content)){
      var i=window.local.content.findIndex(function(x){return x&&String(x.id)===String(q.id);});
      if(i>=0)window.local.content[i]=q;else window.local.content.push(q);
    }
    if(typeof window.startQuiz==='function')return window.startQuiz(q.id);
    toast('Quiz engine is not ready.');
  }catch(e){console.warn(e);toast('Unable to open assigned quiz.');}
};

async function appendAssignmentNotifications(){
  if(!(window.SKILL_SAGA_FEATURES&&window.SKILL_SAGA_FEATURES.ACTIONABLE_ASSIGNMENT_NOTIFICATIONS_ENABLED))return;
  var u=user(),d=db();
  if(!u||u.role!=='learner'||!d)return;
  try{
    var snap=await d.collection('assignments').where('studentUid','==',u.uid).where('status','==','assigned').get();
    var rows=snap.docs.map(function(x){return Object.assign({id:x.id},x.data());}).filter(function(x){return x.quizId;});
    if(!rows.length)return;
    var main=document.querySelector('.main');
    if(!main)return;
    var old=document.getElementById('ss-actionable-assignments');if(old)old.remove();
    var box=document.createElement('div');box.id='ss-actionable-assignments';box.className='card';box.style.cssText='margin-bottom:12px;border:1px solid #d8e5ff;background:#f4f8ff';
    box.innerHTML='<div class="row"><div style="font-size:24px">📚</div><div style="flex:1"><b>Pending assigned work</b><div class="muted">You have '+rows.length+' quiz'+(rows.length===1?'':'zes')+' waiting.</div></div></div>'+rows.slice(0,5).map(function(a){return '<div class="notice" style="display:flex;align-items:center;gap:8px"><div style="flex:1"><b>'+esc(a.quizTitle||'Assigned Quiz')+'</b><div class="small">Assigned by '+esc(a.teacherName||'Teacher')+'</div></div><button class="btn" style="padding:8px 10px;font-size:11px" onclick="ssOpenAssignedQuiz(\''+esc(a.quizId).replace(/'/g,'\\\'')+'\')">Start</button></div>';}).join('');
    main.insertBefore(box,main.firstChild);
  }catch(e){console.warn('Actionable notification load failed',e);}
}

/* Make Profile Privacy and Help cards useful without changing the visual design. */
window.ssPrivacyScreen=function(){
  if(typeof window.shell!=='function')return;
  window.shell('<div class="row"><button class="back" onclick="go(\'profile\')">‹</button><div><h1 style="margin:0">Privacy</h1><div class="muted">Data & security</div></div></div>'+
  '<div class="section"><b>What Skill Saga stores</b></div><div class="card"><p>Skill Saga uses account information, learning progress, quiz results, XP, Coins, badges and linked learner/teacher/parent relationships to provide the app features.</p><p>Authentication and cloud learning data are handled through Firebase. Some preferences and cached app data may be stored locally on the device.</p></div>'+
  '<div class="section"><b>What is currently disabled</b></div><div class="card"><div class="row"><span>Advertising</span><span class="badge">Disabled</span></div><div class="row"><span>Premium payments</span><span class="badge">Disabled</span></div><div class="row"><span>Precise location</span><span class="badge">Not used</span></div></div>'+
  '<div class="notice">Before Play Store launch, publish the final privacy policy URL and ensure the Play Console Data Safety answers exactly match the production configuration.</div>');
};
window.ssHelpScreen=function(){
  if(typeof window.shell!=='function')return;
  window.shell('<div class="row"><button class="back" onclick="go(\'profile\')">‹</button><div><h1 style="margin:0">Help & Support</h1><div class="muted">Get help with Skill Saga</div></div></div>'+
  '<div class="section"><b>Common help</b></div><div class="card"><p><b>Quiz not opening?</b><br>Check your internet connection and try again.</p><p><b>Assigned quiz missing?</b><br>Open Notifications to see pending assigned work.</p><p><b>Password problem?</b><br>Use Settings → Change / Reset Password.</p><p><b>Account deletion?</b><br>Use Profile → Settings → Delete Account.</p></div>'+
  '<div class="notice">For launch, add the final support email/WhatsApp/chat contact here and in the Play Store listing.</div>');
};

function patchSettingsActions(){
  if(window.__SS_SETTINGS_PATCHED)return;window.__SS_SETTINGS_PATCHED=true;
  document.addEventListener('click',function(e){
    var t=e.target&&e.target.closest?e.target.closest('.ss-profile-account-card'):null;
    if(!t)return;
    var s=(t.textContent||'').toLowerCase();
    if(s.indexOf('privacy')>=0){e.preventDefault();e.stopImmediatePropagation();window.ssPrivacyScreen();}
    else if(s.indexOf('help')>=0){e.preventDefault();e.stopImmediatePropagation();window.ssHelpScreen();}
  },true);
}

/* Skill Mastery: remove duplicate skill rows and make each row open a detail view. */
window.ssSkillDetail=function(name,value){
  if(typeof window.shell!=='function')return;
  window.shell('<div class="row"><button class="back" onclick="go(\'profile\')">‹</button><div><h1 style="margin:0">'+esc(name)+'</h1><div class="muted">Skill Mastery</div></div></div>'+
  '<div class="hero"><small>MASTERY</small><h2>'+esc(String(value))+'%</h2><p>Keep practising to improve this skill.</p></div><div class="card"><b>Practice suggestion</b><p class="muted">Use Play → Quick Practice or Topic Practice to continue improving '+esc(name)+'.</p><button class="btn block" onclick="go(\'play\')">Practice Now →</button></div>');
};
function cleanMasteryDom(){
  document.querySelectorAll('.ss-mastery').forEach(function(box){
    var seen={};
    Array.prototype.slice.call(box.children).forEach(function(row){
      var txt=(row.textContent||'').replace(/\s+/g,' ').trim();
      var m=txt.match(/(Numerical|Reasoning|Scientific Thinking|Vocabulary|Communication|Problem Solving|Creativity)/i);
      if(!m)return;
      var key=m[1].toLowerCase();
      if(seen[key])row.remove();else{seen[key]=true;row.style.cursor='pointer';row.onclick=function(){var vm=txt.match(/(\d{1,3})%/);window.ssSkillDetail(m[1],vm?vm[1]:'0');};}
    });
  });
}
function install(){
  patchContentLoader();patchFinishQuiz();patchSettingsActions();normalizeLocalContent();
  document.addEventListener('click',function(e){
    var b=e.target&&e.target.closest?e.target.closest('.iconbtn'):null;
    if(b&&(b.textContent||'').indexOf('🔔')>=0)setTimeout(appendAssignmentNotifications,80);
  },true);
  var obs=new MutationObserver(function(){cleanMasteryDom();});
  obs.observe(document.body,{childList:true,subtree:true});
  setTimeout(cleanMasteryDom,250);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
setTimeout(appendAssignmentNotifications,700);
})();

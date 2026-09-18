/* Skill Saga — Final learner UI layer
 * Applies the approved Home / Learn / Play / Compete / Profile structure
 * without replacing the tested quiz engine or admin workflows.
 */
(function(){
'use strict';
var legacyShell=window.shell;
var legacyGo=window.go;
var legacyHome=window.home;
var legacyPlay=window.play;
var legacyCompete=window.compete;
var legacySkills=window.skills;
var legacyProfile=window.profile;

function css(){if(document.getElementById('ss-final-ui-css'))return;var s=document.createElement('style');s.id='ss-final-ui-css';s.textContent=`
.ss-final{padding:4px 0 18px}.ss-hero{position:relative;overflow:hidden;border-radius:24px;padding:18px 17px;margin-bottom:11px;background:linear-gradient(135deg,#edf5ff,#e9f0ff 58%,#f3edff);border:1px solid #e1e8f5}.ss-hero.blue{background:linear-gradient(135deg,#1769ff,#315ff1 58%,#7047ef);color:#fff}.ss-hero-copy{position:relative;z-index:2;width:68%}.ss-eyebrow{font-size:10px;font-weight:900;letter-spacing:.5px;color:#1769ff}.blue .ss-eyebrow{color:#fff}.ss-title{font-size:25px;line-height:1.05;margin:5px 0 7px;color:#081b43;letter-spacing:-.5px}.blue .ss-title{color:#fff}.ss-sub{font-size:11px;line-height:1.4;color:#63728d}.blue .ss-sub{color:#fff}.ss-quote{display:inline-block;margin-top:11px;padding:8px 10px;border-radius:11px;background:#fff8;color:#1769ff;font-size:10px;font-weight:900}.ss-hero-art{position:absolute;right:8px;bottom:4px;width:34%;height:145px;display:flex;align-items:flex-end;justify-content:center}.ss-hero-circle{position:absolute;width:115px;height:115px;border-radius:50%;background:#1769ff;opacity:.10}.ss-hero-mascot{position:relative;font-size:67px;z-index:2;filter:drop-shadow(0 6px 7px #12346b22)}.ss-hero-words{position:absolute;right:0;top:5px;font-size:11px;font-weight:1000;line-height:1.02;transform:rotate(-5deg);z-index:4;color:#11275c}.ss-hero-words b{color:#1769ff}.ss-hero-words i{display:block;width:34px;height:3px;background:#ffd32f;border-radius:4px;margin:4px 0 0 7px}.ss-blue-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin:10px 0 14px}.ss-stat{background:#fff;border:1px solid #e6ebf4;border-radius:16px;padding:10px 8px;text-align:center}.ss-stat-icon{font-size:18px}.ss-stat b{display:block;font-size:17px;color:#142343}.ss-stat small{font-size:8px;color:#78869d}.ss-section{display:flex;align-items:center;justify-content:space-between;margin:15px 2px 8px}.ss-section b{font-size:15px;color:#101e3d}.ss-section span{font-size:10px;font-weight:900;color:#1769ff}.ss-tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin:10px 0}.ss-tab{border:1px solid #e1e7f1;border-radius:16px;padding:11px 7px;background:#fff;text-align:left;cursor:pointer}.ss-tab.active{background:#1769ff;color:#fff;border-color:#1769ff}.ss-tab .i{font-size:22px;display:block}.ss-tab b{display:block;font-size:12px;margin-top:4px}.ss-tab small{font-size:9px}.ss-cards{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.ss-card{border:1px solid #e5eaf3;border-radius:17px;padding:12px;background:#fff;box-shadow:0 5px 15px #1c35620b}.ss-card.center{text-align:center}.ss-card .i{font-size:26px}.ss-card b{display:block;font-size:11px;color:#172542;margin-top:5px}.ss-card small{display:block;color:#75829a;font-size:8px;margin-top:3px;line-height:1.3}.ss-action{border:0;border-radius:10px;padding:8px 11px;background:#1769ff;color:#fff;font-size:9px;font-weight:1000;cursor:pointer;margin-top:8px}.ss-soft{background:#eef5ff}.ss-green{background:#e9f8ef}.ss-pink{background:#fff0f4}.ss-purple{background:#f2edff}.ss-yellow{background:#fff7df}.ss-learn-classes{display:grid;grid-template-columns:repeat(6,1fr);gap:6px}.ss-class{border:1px solid #e1e8f3;border-radius:12px;padding:10px 2px;text-align:center;background:#fff;font-size:11px;font-weight:900;color:#243452;cursor:pointer}.ss-class.active{background:#1769ff;color:#fff;border-color:#1769ff}.ss-subjects{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.ss-subject{padding:13px;border-radius:17px;border:1px solid #e5eaf3;text-align:center}.ss-subject .i{font-size:27px}.ss-subject b{display:block;font-size:11px;margin-top:4px}.ss-subject small{font-size:8px;color:#78869c}.ss-progress-card{padding:13px;border-radius:18px;background:#fff;border:1px solid #e5eaf3}.ss-progress-row{display:flex;align-items:center;gap:10px}.ss-thumb{width:58px;height:58px;border-radius:14px;background:#dcecff;display:flex;align-items:center;justify-content:center;font-size:30px}.ss-progress-copy{flex:1}.ss-progress-copy b{font-size:11px}.ss-progress-copy small{display:block;color:#75829a;font-size:8px;margin-top:3px}.ss-bar{height:6px;background:#e4eaf3;border-radius:6px;overflow:hidden;margin-top:8px}.ss-bar i{display:block;height:100%;background:#22ae6b}.ss-popular{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.ss-topic{padding:11px;border-radius:16px;text-align:center;border:1px solid #e5eaf3}.ss-topic .i{font-size:25px}.ss-topic b{display:block;font-size:10px}.ss-topic small{font-size:8px;color:#78869c}.ss-locks{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}.ss-lock{padding:11px 6px;text-align:center;border:1px solid #dfe6f1;border-radius:15px;background:#fff}.ss-lock .i{font-size:22px}.ss-lock b{display:block;font-size:10px;margin-top:4px}.ss-lock small{font-size:7px;color:#74819a;line-height:1.25;display:block;margin-top:3px}.ss-lock button{border:0;background:#eaf2ff;color:#174fae;border-radius:8px;padding:6px;width:100%;font-size:8px;font-weight:900;margin-top:7px}.ss-lock.current{background:#ebfaf0;border-color:#bde8ce}.ss-lock.current button{background:#c8f1d7;color:#16804d}.ss-play-modes{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.ss-mode{padding:13px;border-radius:17px;text-align:center;border:1px solid #e4eaf3}.ss-mode .i{font-size:27px}.ss-mode b{display:block;font-size:11px;margin-top:4px}.ss-mode small{font-size:8px;color:#75829a;line-height:1.3}.ss-assigned{padding:13px;border-radius:18px;background:#f3efff;border:1px solid #e3d9ff}.ss-assignment{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #e3dcf2}.ss-assignment:last-child{border-bottom:0}.ss-assignment .i{font-size:25px}.ss-assignment-main{flex:1}.ss-assignment-main b{font-size:10px}.ss-assignment-main small{display:block;font-size:8px;color:#74819a;margin-top:3px}.ss-assignment button{border:0;border-radius:9px;background:#1769ff;color:#fff;padding:8px 10px;font-size:8px;font-weight:900}.ss-competition-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.ss-comp{padding:13px;border-radius:17px;border:1px solid #e4eaf3;text-align:center}.ss-comp .i{font-size:27px}.ss-comp b{display:block;font-size:10px;margin-top:5px}.ss-comp small{font-size:8px;color:#74819a;line-height:1.3}.ss-upcoming{display:grid;gap:7px}.ss-event{display:flex;align-items:center;gap:9px;padding:11px;border:1px solid #e4eaf3;border-radius:15px;background:#fff}.ss-date{width:39px;text-align:center;border-radius:9px;background:#eef4ff;color:#1769ff;padding:6px 2px;font-weight:1000;font-size:9px}.ss-event-main{flex:1}.ss-event-main b{font-size:10px}.ss-event-main small{display:block;color:#74819a;font-size:8px;margin-top:3px}.ss-event button{border:0;background:#1769ff;color:#fff;border-radius:8px;padding:7px 9px;font-size:8px;font-weight:900}.ss-board{padding:12px;border-radius:18px;background:#fff;border:1px solid #e4eaf3}.ss-board-row{display:flex;align-items:center;gap:7px;padding:8px 3px;border-bottom:1px solid #eef1f5;font-size:9px}.ss-board-row:last-child{border-bottom:0}.ss-board-rank{width:24px;font-weight:1000;text-align:center}.ss-avatar{width:27px;height:27px;border-radius:50%;background:#e8f0ff;display:flex;align-items:center;justify-content:center}.ss-board-name{flex:1;font-weight:800}.ss-board-xp{font-weight:1000}.ss-forum{padding:13px;border-radius:18px;background:linear-gradient(135deg,#f0eaff,#e8f4ff);border:1px solid #e1ddf3}.ss-forum b{font-size:13px}.ss-forum p{font-size:9px;color:#66758e;line-height:1.35}.ss-forum button{border:0;border-radius:9px;background:#1769ff;color:#fff;padding:8px 11px;font-size:8px;font-weight:900}.ss-final-note{padding:12px;border-radius:17px;background:#edf6ff;color:#27436c;text-align:center;font-size:9px;font-weight:800;margin-top:10px}
@media(max-width:380px){.ss-title{font-size:23px}.ss-hero-copy{width:70%}.ss-hero-mascot{font-size:58px}.ss-class{font-size:10px}}
`;document.head.appendChild(s)}
function U(){
  try{var x=typeof user==='function'?user():null;if(x&&x.uid)return x}catch(e){}
  try{
    if(typeof cloudUser!=='undefined'&&cloudUser&&cloudUser.uid){
      return {uid:cloudUser.uid,name:cloudUser.displayName||cloudUser.email||'Learner',displayName:cloudUser.displayName||'',email:cloudUser.email||''};
    }
  }catch(e){}
  try{
    if(window.firebase&&firebase.auth){
      var a=firebase.auth().currentUser;
      if(a&&a.uid)return {uid:a.uid,name:a.displayName||a.email||'Learner',displayName:a.displayName||'',email:a.email||''};
    }
  }catch(e){}
  return null;
}
function esc(v){return String(v==null?'':v).replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]})}
function stats(){var u=U()||{};return {xp:Number(u.xp||0),coins:Number(u.coins||0),streak:Number(u.streak||0),level:Number(u.level||Math.max(1,Math.floor(Number(u.xp||0)/500)+1)),accuracy:Number(u.accuracy||u.avgAccuracy||0)}}
function base(content,active){
  if(typeof legacyShell==='function')legacyShell(content);else if(typeof shell==='function')shell(content);
  var nav=document.querySelector('.nav');if(!nav)return;
  nav.innerHTML='<button data-s="home">⌂<span>Home</span></button><button data-s="learn">▣<span>Learn</span></button><button data-s="play">▶<span>Play</span></button><button data-s="compete">🏆<span>Compete</span></button><button data-s="profile">●<span>Profile</span></button>';
  nav.querySelectorAll('button').forEach(function(b){b.classList.toggle('active',b.dataset.s===active);b.onclick=function(){window.go(b.dataset.s)}});
}
async function ssData(){
  var u=U(); if(!u||typeof cloudDb==='undefined'||!cloudDb||!window.firebase)return {u:u||{},quizzes:[],curriculum:[],materials:[],assignments:[],competitions:[],results:[],attempts:[],rewards:[],badges:[],notifications:[]};
  async function allPublished(name){
    try{var s=await cloudDb.collection(name).where('status','in',['published','active']).get();return s.docs.map(function(d){return Object.assign({id:d.id},d.data())})}
    catch(e){try{var s2=await cloudDb.collection(name).where('published','==',true).get();return s2.docs.map(function(d){return Object.assign({id:d.id},d.data())})}catch(e2){return[]}}
  }
  async function getMine(name,field){
    try{var s=await cloudDb.collection(name).where(field,'==',u.uid).get();return s.docs.map(function(d){return Object.assign({id:d.id},d.data())})}catch(e){return[]}
  }
  var p=await Promise.all([allPublished('quizzes'),allPublished('curriculum'),allPublished('learningMaterials'),getMine('assignments','studentUid'),allPublished('competitions'),getMine('competitionResults','uid'),getMine('quizAttempts','uid'),allPublished('rewards'),allPublished('badges'),allPublished('notifications')]);
  return {u:u,quizzes:p[0],curriculum:p[1],materials:p[2],assignments:p[3],competitions:p[4],results:p[5],attempts:p[6],rewards:p[7],badges:p[8],notifications:p[9]};
}
function ssClassNumber(u){return Number(u&&u.studentClass)||8}
function ssBoardName(u){return String(u&&u.board||'').trim()}
function ssPublished(x){return x&&x.published!==false&&(x.status==null||x.status==='published'||x.status==='active')}
function ssClassMatch(x,n){return Number(x&&((x.classNumber!=null?x.classNumber:x.classLevel)))===n}
function ssSubjectName(x){return String(x&&x.subject||x.category||'').trim()}
function ssSkillMap(u){
  var m=u&&u.skillScores&&typeof u.skillScores==='object'?u.skillScores:{};
  return ['Numerical','Scientific Thinking','Vocabulary','Reasoning'].map(function(n){return [n,Math.max(0,Math.min(100,Number(m[n]||0)))];});
}
async function ssRankFor(u){
  if(!u||!cloudDb||!cloudUser)return 1;
  try{
    var s=await cloudDb.collection('users').orderBy('xp','desc').get(),n=1;
    s.docs.forEach(function(d){var x=d.data();if(d.id!==cloudUser.uid&&Number(x.xp||0)>Number(u.xp||0))n++;});
    return n;
  }catch(e){return 1}
}

function headerTitle(){return ''}
async function homeFinal(){
  var d=await ssData(),u=d.u||{},s=stats(),rank=await ssRankFor(u);
  var skills=ssSkillMap(u);
  var daily=d.quizzes.filter(function(q){return ssPublished(q)&&String(q.type||'').toLowerCase()==='daily' && ssClassMatch(q,ssClassNumber(u));})[0]||
    d.quizzes.filter(function(q){return ssPublished(q)&&ssClassMatch(q,ssClassNumber(u));})[0];
  var attempts=d.attempts.filter(function(a){return a.uid===u.uid;});
  var mission=daily?'<div class="ss-card ss-blue-stats" style="display:block;background:linear-gradient(135deg,#1769ff,#6544ec);color:#fff;padding:16px"><div style="font-size:9px;font-weight:900">DAILY CHALLENGE</div><div style="font-size:19px;font-weight:1000;margin:7px 0">'+esc(daily.title||'Daily Challenge')+'</div><div style="font-size:10px">'+Number(daily.questions&&daily.questions.length||daily.questionCount||0)+' Questions • '+esc(daily.difficulty||'Basic')+'</div><button class="ss-action" style="background:#fff;color:#1769ff" onclick="startQuiz(''+esc(daily.id)+'')">Start Challenge →</button></div>':
    '<div class="ss-card"><b>No published challenge yet</b><small>New challenges will appear here when Admin publishes them.</small></div>';
  base('<div class="ss-final"><section class="ss-hero"><div class="ss-hero-copy"><div class="ss-eyebrow">LEARN • PLAY • COMPETE • GROW</div><h1 class="ss-title">Small Steps<br><span style="color:#1769ff">Big Achievements!</span></h1><div class="ss-sub">Explore. Practice. Compete. Build a brighter tomorrow.</div><div class="ss-quote">“Play • Learn • Win!”</div></div><div class="ss-hero-art"><div class="ss-hero-circle"></div><div class="ss-hero-words">Play<br><b>Learn</b><br>Win<i></i></div><div class="ss-hero-mascot">🎓</div></div></section>'+
  '<div class="ss-blue-stats"><div class="ss-stat"><div class="ss-stat-icon">⭐</div><b>'+s.xp.toLocaleString()+'</b><small>XP Points</small></div><div class="ss-stat"><div class="ss-stat-icon">🔥</div><b>'+s.streak+'</b><small>Day Streak</small></div><div class="ss-stat"><div class="ss-stat-icon">🏆</div><b>#'+rank+'</b><small>Current Rank</small></div></div>'+
  '<div class="ss-section"><b>Today\'s Mission</b><span onclick="window.go(\'play\')">View all →</span></div>'+mission+
  '<div class="ss-section"><b>Your Skills</b><span onclick="window.go(\'learn\')">View all →</span></div><div class="ss-cards">'+skills.map(function(x){var icons={'Numerical':'🔢','Scientific Thinking':'🧪','Vocabulary':'📖','Reasoning':'🧠'};return '<div class="ss-card center '+({'Numerical':'ss-soft','Scientific Thinking':'ss-green','Vocabulary':'ss-pink','Reasoning':'ss-purple'}[x[0]]||'ss-soft')+'"><div class="i">'+icons[x[0]]+'</div><b>'+x[0]+'</b><small style="font-weight:1000;color:#172542">'+x[1]+'%</small></div>'}).join('')+'</div>'+
  '<div class="ss-section"><b>Next Milestone</b><span>'+s.xp%500+'/500 XP</span></div><div class="ss-progress-card"><div style="display:flex;justify-content:space-between;font-size:10px;font-weight:900"><b>Level '+s.level+'</b><b>'+s.xp%500+'/500 XP</b></div><div class="ss-bar"><i style="width:'+Math.min(100,(s.xp%500)/5)+'%"></i></div><small style="display:block;color:#78869d;font-size:8px;margin-top:7px">Keep learning to reach your next level.</small></div>'+
  '<div class="ss-final-note">'+attempts.length+' recorded quiz attempt'+(attempts.length===1?'':'s')+' so far.</div></div>','home');
}
async function learnFinal(){
  var d=await ssData(),u=d.u||{},n=ssClassNumber(u),board=ssBoardName(u),attempts=d.attempts.filter(function(a){return a.uid===u.uid;});
  var rows=d.curriculum.filter(function(x){return ssPublished(x)&&ssClassMatch(x,n)&&(!board||!x.board||String(x.board).toLowerCase()===board.toLowerCase());});
  var subjects={};rows.forEach(function(x){var s=ssSubjectName(x);if(s)subjects[s]=1});
  d.materials.filter(function(x){return ssPublished(x)&&ssClassMatch(x,n)}).forEach(function(x){var s=ssSubjectName(x);if(s)subjects[s]=1});
  var names=Object.keys(subjects).sort(),subHtml=names.length?names.map(function(s){var total=rows.filter(function(x){return ssSubjectName(x)===s}).length,done=attempts.filter(function(a){return ssSubjectName(a)===s}).length,pct=total?Math.min(100,Math.round(done/total*100)):0;return '<div class="ss-subject"><div class="i">📚</div><b>'+esc(s)+'</b><small>'+pct+'% completed</small></div>'}).join(''):'<div class="ss-card"><b>No published curriculum yet</b><small>Admin-published subjects will appear here.</small></div>';
  var mat=d.materials.filter(function(x){return ssPublished(x)&&ssClassMatch(x,n)}).sort(function(a,b){return String(a.updatedAt||'').localeCompare(String(b.updatedAt||''));})[0];
  var continueHtml=mat?'<div class="ss-progress-card"><div class="ss-progress-row"><div class="ss-thumb">📚</div><div class="ss-progress-copy"><b>'+esc(mat.title||mat.topic||'Learning Material')+'</b><small>'+esc(ssSubjectName(mat)||'General')+' • '+esc(mat.chapter||mat.topic||'Study')+'</small><div class="ss-bar"><i style="width:0%"></i></div></div></div></div>':'<div class="ss-card"><small>Start learning from a published lesson. Your progress will appear here.</small></div>';
  base('<div class="ss-final"><section class="ss-hero"><div class="ss-hero-copy"><div class="ss-eyebrow">LEARN</div><h1 class="ss-title">Explore. Understand. Grow.</h1><div class="ss-sub">Build your knowledge step by step with concepts, examples, videos and practice.</div><div class="ss-quote">“Better Learning. Brighter Tomorrow!”</div></div><div class="ss-hero-art"><div class="ss-hero-circle"></div><div class="ss-hero-mascot">📚</div></div></section><div class="ss-tabs"><button class="ss-tab active"><span class="i">🎓</span><b>Academic</b><small>Class '+n+'</small></button><button class="ss-tab"><span class="i">🧠</span><b>Skills</b><small>Thinking & skills</small></button><button class="ss-tab"><span class="i">🌍</span><b>Other</b><small>GK & life skills</small></button></div><div class="ss-section"><b>Choose Your Class</b><span>'+esc(board||'All Boards')+'</span></div><div class="ss-learn-classes">'+[1,2,3,4,5,6,7,8,9,10,11,12].map(function(k){return '<button class="ss-class '+(k===n?'active':'')+'" onclick="ssClass('+k+')">'+k+'</button>'}).join('')+'</div><div class="ss-section"><b>Class '+n+' Subjects</b><span>'+names.length+' subjects</span></div><div class="ss-subjects">'+subHtml+'</div><div class="ss-section"><b>Continue Learning</b><span>From Admin content</span></div>'+continueHtml+'<div class="ss-section"><b>Published Topics</b><span>'+rows.length+' topics</span></div><div class="ss-popular">'+(rows.slice(0,8).map(function(x){return '<div class="ss-topic"><div class="i">📘</div><b>'+esc(x.topic||x.chapter||x.book||ssSubjectName(x)||'Topic')+'</b><small>'+esc(ssSubjectName(x)||'Academic')+' • Published</small></div>'}).join('')||'<div class="ss-card"><small>No published topics for this class yet.</small></div>')+'</div><div class="ss-final-note">📚 Admin-published curriculum and learning materials appear here automatically.</div></div>','learn');
}
function learnSkills(){base(`<div class="ss-final"><section class="ss-hero"><div class="ss-hero-copy"><div class="ss-eyebrow">SKILLS</div><h1 class="ss-title">Think Better.<br>Learn Smarter.</h1><div class="ss-sub">Build reasoning, numerical, scientific and language skills alongside school learning.</div></div><div class="ss-hero-art"><div class="ss-hero-circle"></div><div class="ss-hero-mascot">🧠</div></div></section><div class="ss-tabs"><button class="ss-tab"><span class="i">🎓</span><b>Academic</b></button><button class="ss-tab active"><span class="i">🧠</span><b>Skills</b></button><button class="ss-tab"><span class="i">🌍</span><b>Other</b></button></div><div class="ss-section"><b>Core Skills</b><span>Practice regularly</span></div><div class="ss-cards">${[['🔢','Numerical','100%','ss-soft'],['🧪','Scientific Thinking','31%','ss-green'],['📖','Vocabulary','0%','ss-pink'],['🧠','Reasoning','31%','ss-purple'],['🧩','Problem Solving','0%','ss-yellow'],['💭','Memory','0%','ss-soft']].map(function(x){return '<div class="ss-card center '+x[3]+'"><div class="i">'+x[0]+'</div><b>'+x[1]+'</b><small>'+x[2]+' mastery</small><button class="ss-action" onclick="ssSkillAction(\''+x[1]+'\')">Practice →</button></div>'}).join('')}</div><div class="ss-section"><b>Puzzles</b><span>Sharpen your thinking</span></div><div class="ss-cards">${[['⚙️','Logic Puzzles'],['🧩','Number Puzzles'],['💡','Visual Reasoning'],['🎲','Word Puzzles']].map(function(x){return '<div class="ss-card ss-soft"><div class="i">'+x[0]+'</div><b>'+x[1]+'</b><small>Solve & think</small></div>'}).join('')}</div><div class="ss-section"><b>Locked Classes</b></div><div class="ss-locks">${[['🔒','Class 7','500 XP + 50 Coins'],['🔓','Class 8','Your Class'],['🔒','Class 9','1,000 XP + 100 Coins'],['🔒','Class 10','2,000 XP + 200 Coins']].map(function(x,i){return '<div class="ss-lock '+(i===1?'current':'')+'"><div class="i">'+x[0]+'</div><b>'+x[1]+'</b><small>'+x[2]+'</small><button>'+ (i===1?'✓ Unlocked':'Unlock')+'</button></div>'}).join('')}</div><div class="ss-final-note">🎁 Complete quizzes, earn XP and coins, and unlock new classes.</div></div>`,'learn')}
function ssSkillAction(name){if(typeof toast==='function')toast(name+' practice is ready — content integration remains connected to the existing engine.');}
async function ssClass(n){
  var u=U();if(!u)return;
  n=Number(n);if(n<1||n>12)return;
  u.studentClass=String(n);
  try{if(typeof saveCloudUser==='function')await saveCloudUser(u);else if(cloudDb&&cloudUser)await cloudDb.collection('users').doc(cloudUser.uid).set({studentClass:String(n),updatedAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});}catch(e){console.warn('Class save failed',e)}
  try{if(typeof writeLocal==='function')writeLocal(u)}catch(e){}
  await learnFinal();
}
function playFinal(){
  var d=await ssData(),u=d.u||{},n=ssClassNumber(u);
  var quizzes=d.quizzes.filter(function(q){return ssPublished(q)&&(!q.classNumber&&!q.classLevel||ssClassMatch(q,n));});
  var assignments=d.assignments.filter(function(a){return a.studentUid===u.uid&&a.status==='assigned';});
  var assignedHtml=assignments.length?assignments.slice(0,10).map(function(a){var q=quizzes.find(function(x){return x.id===a.quizId;});return '<div class="ss-assignment"><div class="i">📝</div><div class="ss-assignment-main"><b>'+esc(a.quizTitle||q&&q.title||'Assigned Quiz')+'</b><small>'+esc(a.skill||q&&q.skill||'General')+' • '+esc(a.difficulty||q&&q.difficulty||'Medium')+'</small></div>'+(q?'<button onclick="startAssignedQuiz(''+esc(q.id)+'',''+esc(a.id)+'')">Open</button>':'<small>Unavailable</small>')+'</div>'}).join(''):'<div class="ss-assignment"><div class="ss-assignment-main"><b>No pending assignments</b><small>Admin/Teacher assignments will appear here.</small></div></div>';
  var daily=quizzes.find(function(q){return String(q.type||'').toLowerCase()==='daily';})||quizzes[0];
  var modes=[['⚡','Quick Quiz','5 questions • Fast practice'],['📅','Daily Quiz','Published daily challenge'],['📚','Practice','Practice by subject & topic'],['🎯','Skill Quiz','Focus on core skills']];
  base('<div class="ss-final"><section class="ss-hero"><div class="ss-hero-copy"><div class="ss-eyebrow">PLAY</div><h1 class="ss-title">Play. Practice. Master.</h1><div class="ss-sub">Choose a quiz mode, build your streak and turn practice into progress.</div><div class="ss-quote">“Every question makes you stronger!”</div></div><div class="ss-hero-art"><div class="ss-hero-circle"></div><div class="ss-hero-mascot">🎯</div></div></section><div class="ss-section"><b>Quiz Modes</b><span>'+quizzes.length+' published quizzes</span></div><div class="ss-play-modes">'+modes.map(function(x){return '<div class="ss-mode"><div class="i">'+x[0]+'</div><b>'+x[1]+'</b><small>'+x[2]+'</small><button class="ss-action" onclick="'+(daily?'startQuiz(\''+esc(daily.id)+'\')':'ssPlayAction(\''+x[1]+'\')')+'">Start →</button></div>'}).join('')+'</div><div class="ss-section"><b>Assigned Quizzes</b><span>View all →</span></div><div class="ss-assigned">'+assignedHtml+'</div><div class="ss-section"><b>Your Progress</b><span>'+Number(u.quizzes||0)+' completed</span></div><div class="ss-card"><b>Quiz goal</b><small>Complete published quizzes to earn XP, coins and skill progress.</small><div class="ss-bar"><i style="width:'+Math.min(100,Number(u.quizzes||0)*20)+'%"></i></div></div><div class="ss-final-note">🎮 Quiz content comes from Admin-published quizzes and Question Bank data.</div></div>','play');
}
function ssPlayAction(mode){if(mode==='Daily Quiz'&&typeof legacyPlay==='function'){try{return legacyPlay()}catch(e){}}if(typeof toast==='function')toast(mode+' is ready — quiz integration remains connected to the existing engine.');}
async function competeFinal(){
  var d=await ssData(),u=d.u||{},n=ssClassNumber(u),now=Date.now();
  var comps=d.competitions.filter(function(c){return ssPublished(c)&&(!c.classLevel||Number(c.classLevel)===n||String(c.classLevel).toLowerCase()==='all');});
  var mine=d.results.filter(function(r){return r.uid===u.uid;});
  var upcoming=comps.filter(function(c){var t=Date.parse(c.startAt||c.startDate||'');return !t||t>=now;});
  var joined=mine.length,points=mine.reduce(function(a,r){return a+Number(r.points||r.competitionPoints||r.score||0)},0),top3=mine.filter(function(r){return Number(r.rank||99)<=3}).length;
  var compHtml=comps.slice(0,8).map(function(c){var qs=Array.isArray(c.quizIds)?c.quizIds.length:Number(c.questionCount||0);return '<div class="ss-event"><div class="ss-date">'+esc(String(c.startAt||c.startDate||'').slice(0,10)||'—')+'</div><div class="ss-event-main"><b>'+esc(c.title||'Competition')+'</b><small>'+esc(c.subject||c.category||'General')+' • '+qs+' Questions • '+esc(c.durationMinutes||30)+' Minutes</small></div><button onclick="ssOpenCompetition(''+esc(c.id)+'')">Explore</button></div>'}).join('');
  if(!compHtml)compHtml='<div class="ss-card"><small>No published competitions for your class yet.</small></div>';
  var forumLink='<div class="ss-forum"><b>💬 Learn. Discuss. Grow.</b><p>Ask questions, share ideas and discuss subjects, skills and competitions with the Skill Saga community.</p><button onclick="window.ssForum()">Open Discussion Forum →</button></div>';
  base('<div class="ss-final"><section class="ss-hero blue"><div class="ss-hero-copy"><div class="ss-eyebrow">COMPETE</div><h1 class="ss-title">Challenge Yourself.<br>Show What You Know!</h1><div class="ss-sub">Take part in published competitions, track results and learn together.</div><div class="ss-quote">“Learn. Compete. Grow Together!”</div></div><div class="ss-hero-art"><div class="ss-hero-mascot">🏆</div></div></section><div class="ss-blue-stats"><div class="ss-stat"><div class="ss-stat-icon">🏆</div><b>'+joined+'</b><small>Competitions Joined</small></div><div class="ss-stat"><div class="ss-stat-icon">📊</div><b>'+top3+'</b><small>Top 3 Finishes</small></div><div class="ss-stat"><div class="ss-stat-icon">🥇</div><b>'+points+'</b><small>Competition Points</small></div></div><div class="ss-section"><b>Competition Types</b><span>'+comps.length+' available</span></div><div class="ss-competition-grid">'+(comps.slice(0,4).map(function(x){return '<div class="ss-comp"><div class="i">🏆</div><b>'+esc(x.title||'Competition')+'</b><small>'+esc(x.type||x.category||'Challenge')+' • Class '+esc(x.classLevel||n)+'</small><button class="ss-action" onclick="ssOpenCompetition(''+esc(x.id)+'')">Explore →</button></div>}).join('')||'<div class="ss-card"><small>No competitions published yet.</small></div>')+'</div><div class="ss-section"><b>Discussion Forum</b><span>View all →</span></div>'+forumLink+'<div class="ss-section"><b>Upcoming Competitions</b><span>'+upcoming.length+' available</span></div><div class="ss-upcoming">'+compHtml+'</div><div class="ss-section"><b>Leaderboard</b><span>Live XP ranking</span></div><div class="ss-board"><div class="ss-board-row"><div class="ss-board-rank">#</div><div class="ss-board-name">Learner</div><div class="ss-board-xp">XP</div></div><div class="ss-final-note">Your overall rank is shown on Home and the full leaderboard remains available through the existing leaderboard screen.</div></div></div>','compete');
}
function forum(){
  var u=U();
  if(!u||!(typeof cloudDb!=='undefined'&&cloudDb)||!window.firebase)return typeof toast==='function'&&toast('Please sign in to use the Discussion Forum.');
  try{
    var ss=await cloudDb.collection('appSettings').doc('general').get();
    var settings=ss.exists?ss.data():{};
    if(settings.forumEnabled===false){
      base('<div class="ss-final"><section class="ss-hero"><div class="ss-hero-copy"><div class="ss-eyebrow">COMMUNITY</div><h1 class="ss-title">Discussion Forum</h1><div class="ss-sub">The forum is temporarily disabled by Skill Saga Admin.</div></div><div class="ss-hero-art"><div class="ss-hero-mascot">💬</div></div></section><div class="ss-final-note">Please check again later.</div></div>','compete');
      return;
    }
    var pubSnap=await cloudDb.collection('forumGroups').where('status','==','published').get();
    var ownSnap=await cloudDb.collection('forumGroups').where('ownerUid','==',u.uid).get();
    var seen={};
    var groups=pubSnap.docs.concat(ownSnap.docs).filter(function(d){if(seen[d.id])return false;seen[d.id]=true;return true}).map(function(d){return Object.assign({id:d.id},d.data())});
    var mine=groups.filter(function(g){return g.ownerUid===u.uid});
    var visible=groups.filter(function(g){return g.status==='published'||g.ownerUid===u.uid});
    var approval=settings.forumGroupApproval!==false;
    var groupHtml=visible.slice(0,60).map(function(g){
      var mineFlag=g.ownerUid===u.uid;
      return '<div class="ss-card">'+
        '<div style="font-size:22px">💬</div><b>'+esc(g.title||'Discussion Group')+'</b>'+
        '<small>'+esc(g.subject||'General')+' • Class '+esc(g.classLevel||'All')+' • '+esc(g.memberCount||0)+' members</small>'+
        '<small>'+esc(g.description||'')+'</small>'+
        '<small style="margin-top:6px;font-weight:900">'+(g.status==='pending'?'⏳ Pending admin approval':(mineFlag?'👑 You own this group':'Open learning discussion'))+'</small>'+
        '<button class="ss-action" onclick="ssOpenForumGroup(\''+esc(g.id)+'\')">'+(g.status==='pending'?'View':'Open')+' →</button>'+
      '</div>';
    }).join('');
    base('<div class="ss-final"><section class="ss-hero"><div class="ss-hero-copy"><div class="ss-eyebrow">COMMUNITY</div><h1 class="ss-title">Learn. Discuss. Grow.</h1><div class="ss-sub">Create learning groups, ask questions, share ideas and learn together.</div></div><div class="ss-hero-art"><div class="ss-hero-mascot">💬</div></div></section>'+
      '<div class="ss-card ss-soft" style="margin-bottom:10px"><b>Create a Discussion Group</b><small>Choose a class and subject. '+(approval?'New groups are reviewed by Admin before publication.':'New groups are published immediately and remain under Admin moderation.')+'</small>'+
      '<input id="fgTitle" class="input" placeholder="Group title">'+
      '<textarea id="fgDesc" class="area" rows="3" placeholder="What will learners discuss?"></textarea>'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:7px"><input id="fgClass" class="input" type="number" min="1" max="12" placeholder="Class (1–12)"><input id="fgSubject" class="input" placeholder="Subject"></div>'+
      '<button class="ss-action" onclick="ssCreateForumGroup()">Create Group →</button></div>'+
      '<div class="ss-section"><b>My Groups ('+mine.length+')</b><span>Admin controlled</span></div>'+
      (mine.length?mine.slice(0,20).map(function(g){return '<div class="ss-card ss-purple"><b>👑 '+esc(g.title||'Discussion Group')+'</b><small>Class '+esc(g.classLevel||'All')+' • '+esc(g.subject||'General')+' • '+esc(g.status||'pending')+'</small><button class="ss-action" onclick="ssOpenForumGroup(\''+esc(g.id)+'\')">Open →</button></div>'}).join(''):'<div class="ss-card"><small>You have not created a group yet.</small></div>')+
      '<div class="ss-section"><b>Discover Groups</b><span>'+visible.length+' available</span></div>'+
      (groupHtml||'<div class="ss-card"><small>No published groups yet. Create the first learning discussion.</small></div>')+
      '<div class="ss-final-note">🛡️ Admin has final control over every group, post, reply and report.</div></div>','compete');
  }catch(e){if(typeof toast==='function')toast(e.message||'Could not load Discussion Forum.');}
}
window.ssCreateForumGroup=async function(){
  var u=U();if(!u||!(typeof cloudDb!=='undefined'&&cloudDb)||!window.firebase)return;
  var title=(document.getElementById('fgTitle')||{}).value||'',desc=(document.getElementById('fgDesc')||{}).value||'',cls=(document.getElementById('fgClass')||{}).value||'',sub=(document.getElementById('fgSubject')||{}).value||'';
  title=title.trim();desc=desc.trim();cls=cls.trim();sub=sub.trim();
  if(!title||!desc||!cls||!sub)return typeof toast==='function'&&toast('Enter group title, description, class and subject.');
  var n=Number(cls);if(n<1||n>12)return typeof toast==='function'&&toast('Class must be between 1 and 12.');
  try{
    var s=await cloudDb.collection('appSettings').doc('general').get(),cfg=s.exists?s.data():{};
    var status=cfg.forumGroupApproval===false?'published':'pending';
    var ref=await cloudDb.collection('forumGroups').add({title:title,description:desc,classLevel:n,subject:sub,ownerUid:u.uid,ownerName:u.name||u.displayName||'Learner',status:status,memberCount:1,createdAt:firebase.firestore.FieldValue.serverTimestamp(),updatedAt:firebase.firestore.FieldValue.serverTimestamp()});
    try{
      await cloudDb.collection('forumGroupMembers').doc(ref.id+'_'+u.uid).set({groupId:ref.id,memberUid:u.uid,memberName:u.name||u.displayName||'Learner',role:'owner',joinedAt:firebase.firestore.FieldValue.serverTimestamp()});
    }catch(memberErr){
      console.warn('Owner membership will be created when the group is opened after publication.',memberErr);
    }
    if(typeof toast==='function')toast(status==='published'?'Group created ✓':'Group submitted for Admin approval ✓');
    forum();
  }catch(e){if(typeof toast==='function')toast(e.message||'Could not create group.');}
};
window.ssOpenForumGroup=async function(id){
  var u=U();if(!u||!(typeof cloudDb!=='undefined'&&cloudDb))return;
  try{
    var gSnap=await cloudDb.collection('forumGroups').doc(id).get();if(!gSnap.exists)return toast('Group not found.');
    var g=Object.assign({id:id},gSnap.data());
    if(g.status!=='published'&&g.ownerUid!==u.uid)return toast('This group is not published yet.');
    var isOwner=g.ownerUid===u.uid;
    var mem=null;
    if(isOwner){
      if(g.status==='published'){
        try{
          mem=await cloudDb.collection('forumGroupMembers').doc(id+'_'+u.uid).get();
          if(!mem.exists){
            await cloudDb.collection('forumGroupMembers').doc(id+'_'+u.uid).set({
              groupId:id,
              memberUid:u.uid,
              memberName:u.name||u.displayName||'Learner',
              role:'owner',
              joinedAt:firebase.firestore.FieldValue.serverTimestamp()
            });
            mem={exists:true};
          }
        }catch(ownerMemberErr){
          console.warn('Owner membership sync failed',ownerMemberErr);
          mem={exists:true};
        }
      }else{
        mem={exists:true};
      }
    }else{
      mem=await cloudDb.collection('forumGroupMembers').doc(id+'_'+u.uid).get();
      if(!mem.exists)return ssJoinForumGroup(id,g);
    }
    var ps=await cloudDb.collection('forumPosts').where('groupId','==',id).where('status','==','published').get();
    var posts=ps.docs.map(function(d){return Object.assign({id:d.id},d.data())}).sort(function(a,b){return String(b.createdAt||'').localeCompare(String(a.createdAt||''))});
    var body=posts.slice(0,50).map(function(p){
      return '<div class="ss-card"><div class="row"><b>'+esc(p.title||'Discussion')+'</b><span class="badge">'+esc(p.authorName||'Learner')+'</span></div><small>'+esc(String(p.body||''))+'</small><div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:7px"><button class="ss-action" onclick="ssReplyForumPost(\''+esc(p.id)+'\')">Reply</button><button class="ss-action" style="background:#fff;color:#1769ff;border:1px solid #dfe6f2" onclick="ssReportForumPost(\''+esc(p.id)+'\')">Report</button></div><div id="reply_'+esc(p.id)+'"></div></div>';
    }).join('');
    base('<div class="ss-final"><section class="ss-hero"><div class="ss-hero-copy"><div class="ss-eyebrow">DISCUSSION GROUP</div><h1 class="ss-title">'+esc(g.title||'Discussion Group')+'</h1><div class="ss-sub">'+esc(g.description||'')+'</div></div><div class="ss-hero-art"><div class="ss-hero-mascot">👥</div></div></section>'+
      '<div class="ss-card ss-soft"><div class="row"><b>Class '+esc(g.classLevel||'All')+' • '+esc(g.subject||'General')+'</b><span class="badge">'+esc(g.memberCount||0)+' members</span></div><small>Owner: '+esc(g.ownerName||'Learner')+'</small></div>'+
      '<div class="ss-card"><b>Start a Discussion</b><input id="fpTitle" class="input" placeholder="Discussion title"><textarea id="fpBody" class="area" rows="4" placeholder="Ask a question or share an idea"></textarea><button class="ss-action" onclick="ssCreateForumPost(\''+esc(id)+'\')">Post →</button></div>'+
      '<div class="ss-section"><b>Published Discussions</b><span>'+posts.length+'</span></div>'+(body||'<div class="ss-card"><small>No published discussions yet.</small></div>')+
      (isOwner?'<div class="ss-final-note">👑 You are the Group Owner. Admin can override any group decision.</div>':'')+'</div>','compete');
  }catch(e){toast(e.message||'Could not open group.');}
};
window.ssJoinForumGroup=async function(id,g){
  var u=U();if(!u||!(typeof cloudDb!=='undefined'&&cloudDb))return;
  try{
    await cloudDb.collection('forumGroupMembers').doc(id+'_'+u.uid).set({groupId:id,memberUid:u.uid,memberName:u.name||u.displayName||'Learner',role:'member',joinedAt:firebase.firestore.FieldValue.serverTimestamp()});
    await cloudDb.collection('forumGroups').doc(id).update({memberCount:firebase.firestore.FieldValue.increment(1),updatedAt:firebase.firestore.FieldValue.serverTimestamp()});
    toast('Joined group ✓');ssOpenForumGroup(id);
  }catch(e){toast(e.message||'Could not join group.');}
};
window.ssCreateForumPost=async function(groupId){
  var u=U();if(!u||!(typeof cloudDb!=='undefined'&&cloudDb))return;
  var t=(document.getElementById('fpTitle')||{}).value||'',b=(document.getElementById('fpBody')||{}).value||'';t=t.trim();b=b.trim();
  if(!t||!b)return toast('Enter a discussion title and message.');
  try{
    await cloudDb.collection('forumPosts').add({groupId:groupId,title:t,body:b,authorUid:u.uid,authorName:u.name||u.displayName||'Learner',status:'published',type:'post',createdAt:firebase.firestore.FieldValue.serverTimestamp(),updatedAt:firebase.firestore.FieldValue.serverTimestamp()});
    toast('Discussion posted ✓');ssOpenForumGroup(groupId);
  }catch(e){toast(e.message||'Could not submit discussion.');}
};
window.ssReplyForumPost=function(postId){
  var box=document.getElementById('reply_'+postId);if(!box)return;
  box.innerHTML='<textarea id="replyText_'+esc(postId)+'" class="area" rows="2" placeholder="Write a helpful reply"></textarea><button class="ss-action" onclick="ssSubmitForumReply(\''+esc(postId)+'\')">Submit Reply →</button>';
};
window.ssSubmitForumReply=async function(postId){
  var u=U();if(!u||!(typeof cloudDb!=='undefined'&&cloudDb))return;
  var el=document.getElementById('replyText_'+postId),body=(el&&el.value||'').trim();if(!body)return toast('Write a reply first.');
  try{
    var p=await cloudDb.collection('forumPosts').doc(postId).get();if(!p.exists)return toast('Discussion not found.');
    var d=p.data();
    await cloudDb.collection('forumPosts').add({groupId:d.groupId,parentId:postId,title:'Reply',body:body,authorUid:u.uid,authorName:u.name||u.displayName||'Learner',status:'published',type:'reply',createdAt:firebase.firestore.FieldValue.serverTimestamp(),updatedAt:firebase.firestore.FieldValue.serverTimestamp()});
    toast('Reply posted ✓');ssOpenForumGroup(d.groupId);
  }catch(e){toast(e.message||'Could not submit reply.');}
};
window.ssReportForumPost=async function(postId){
  var u=U();if(!u||!(typeof cloudDb!=='undefined'&&cloudDb))return;
  var reason=prompt('Why are you reporting this discussion?','Inappropriate or unrelated content');if(!reason)return;
  try{await cloudDb.collection('forumReports').add({postId:postId,reporterUid:u.uid,reason:reason.trim(),status:'open',createdAt:firebase.firestore.FieldValue.serverTimestamp()});toast('Report submitted ✓');}catch(e){toast(e.message||'Could not submit report.');}
};
function bind(){css();if(!document.querySelector('.nav'))return;document.querySelectorAll('.nav button').forEach(function(b){if(b.dataset.s==='skills'){b.dataset.s='learn';b.innerHTML='▣<span>Learn</span>'}})}
window.shell=function(content){legacyShell(content);bind()};
window.go=function(n){window.screen=n;if(n==='home')return homeFinal();if(n==='learn'||n==='skills')return learnFinal();if(n==='play')return playFinal();if(n==='compete')return competeFinal();if(n==='profile')return legacyProfile();return legacyGo(n)};
window.home=homeFinal;window.play=playFinal;window.compete=competeFinal;window.skills=learnSkills;window.ssLearnSkills=learnSkills;window.ssClass=ssClass;window.ssPlayAction=ssPlayAction;window.ssForum=forum;
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
})();

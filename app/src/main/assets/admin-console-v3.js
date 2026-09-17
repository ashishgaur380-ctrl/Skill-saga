/* Skill Saga Admin Console v3
 * Centralizes admin access for every learner-facing product area.
 * Uses the same Firebase admin guard as the existing console.
 */
(function(){
'use strict';
if(window.__SS_ADMIN_V3)return;
window.__SS_ADMIN_V3=true;
function db(){return window.ssAdminDB?ssAdminDB():window.firebase&&firebase.firestore?firebase.firestore():null}
function auth(){return window.ssAdminAuth?ssAdminAuth():window.firebase&&firebase.auth?firebase.auth().currentUser:null}
function ok(){return window.ssAdminGuard?ssAdminGuard():!!(auth()&&auth().uid==='4Jme1MoSmHbjzwVjkvxeNSwPp0U2')}
function esc(v){return window.ssAdminEsc?ssAdminEsc(v):String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function stamp(){return window.ssAdminStamp?ssAdminStamp():(firebase.firestore.FieldValue.serverTimestamp())}
function toast(m){if(window.toast)window.toast(m)}
function page(t,s,b){if(window.ssAdminPage)return ssAdminPage(t,s,b);document.getElementById('root').innerHTML='<div class="app"><main class="main"><h1>'+esc(t)+'</h1><div class="muted">'+esc(s||'')+'</div>'+b+'</main></div>'}
function btn(t,f,k){return window.ssAdminButton?ssAdminButton(t,f,k):'<button class="btn '+(k||'light')+'" onclick="'+f+'">'+t+'</button>'}
async function docs(c,n){try{var q=db().collection(c);if(n)q=q.limit(n);var s=await q.get();return s.docs.map(function(d){return Object.assign({id:d.id},d.data())})}catch(e){console.warn(c,e);return[]}}
function card(t,s,icon,fn){return '<div class="tile" style="cursor:pointer" onclick="'+fn+'"><div style="font-size:25px">'+icon+'</div><b>'+esc(t)+'</b><small>'+esc(s)+'</small></div>'}
window.ssAdminV3=async function(){
 if(!ok())return;
 var cols=['quizzes','curriculum','learningMaterials','questionBank','competitions','assignments','forumPosts','forumReports','notifications','users','quizAttempts','competitionResults','rewards','badges'];
 var a=await Promise.all(cols.map(function(c){return docs(c)})),m={};cols.forEach(function(c,i){m[c]=a[i].length});
 page('Admin Console','Central control for Skill Saga learning content, learner experience and community.',''+
 '<div class="notice"><b>Admin-only control center.</b><br>Content, community, roles, notifications, rewards and operational settings use the same Firebase admin authorization.</div>'+ 
 '<div class="grid">'+
 '<div class="tile"><b>'+m.quizzes+'</b><small>Quizzes</small></div><div class="tile"><b>'+m.curriculum+'</b><small>Curriculum records</small></div><div class="tile"><b>'+m.learningMaterials+'</b><small>Learning materials</small></div><div class="tile"><b>'+m.questionBank+'</b><small>Question bank</small></div>'+ 
 '</div>'+ 
 '<div class="section"><b>Content & Curriculum</b></div><div class="grid">'+
 card('Quiz Manager','Create, edit, preview, import, publish and schedule','📝','ssAdminQuiz()')+
 card('Curriculum','Board → year → class → subject → book → chapter → topic','🗂️','ssAdminCurriculum()')+
 card('Learning Materials','Lessons, notes, examples and study content','📚','ssAdminMaterials()')+
 card('Question Bank','Production questions, review, difficulty and rewards','❓','ssAdminQuestions()')+
 card('Bulk Content Import','Import curriculum, lessons, questions, competitions and more','📥','ssAdminV3Imports()')+
 '</div>'+ 
 '<div class="section"><b>Play & Competition</b></div><div class="grid">'+
 card('Competitions','Create and schedule learner competitions','🏆','ssAdminCompetitions()')+
 card('Assignments','Teacher-to-learner assigned work audit','👩‍🏫','ssAdminAssignments()')+
 card('Leaderboards','Review published ranking data','🥇','ssAdminV3Leaderboards()')+
 card('Rewards & Badges','Manage reward catalogue and badge definitions','🎁','ssAdminV3Rewards()')+
 '</div>'+ 
 '<div class="section"><b>Community & Communication</b></div><div class="grid">'+
 card('Forum & Moderation','Posts, reports, approve/reject/delete','💬','ssAdminForum()')+
 card('Notifications','Announcements by audience','🔔','ssAdminNotifications()')+
 '</div>'+ 
 '<div class="section"><b>Learners, Parents & Teachers</b></div><div class="grid">'+
 card('Users & Roles','Learner, parent, teacher and admin roles','👥','ssAdminUsers()')+
 card('Relationships','Review parent/teacher/learner links','🔗','ssAdminV3Relationships()')+
 card('Learner Profiles','Review class, board, school and learning identity','🧑‍🎓','ssAdminV3Learners()')+
 '</div>'+ 
 '<div class="section"><b>Insights & Platform Controls</b></div><div class="grid">'+
 card('Analytics','Attempts, accuracy and content usage','📊','ssAdminAnalytics()')+
 card('Learning Records','Quiz history and learner progress records','📈','ssAdminV3Records()')+
 card('App Controls','Forum, ads, premium and feature switches','⚙️','ssAdminAppSettings()')+
 card('Security','Admin authorization and protected operations','🛡️','ssAdminSecurity()')+
 '</div>'+ 
 '<div class="card admin"><b>Production rule</b><p class="small muted">All learner-facing content should be created here or through the approved bulk-import templates. Draft content stays hidden until published.</p></div>');
};
function loadScript(src){return new Promise(function(resolve,reject){if(document.querySelector('script[data-ss-admin-dep="'+src+'"]'))return resolve();var el=document.createElement('script');el.src=src;el.setAttribute('data-ss-admin-dep',src);el.onload=resolve;el.onerror=reject;(document.head||document.documentElement).appendChild(el);});}
async function boot(){try{await loadScript('admin-console-core.js');await loadScript('admin-console-content.js');await loadScript('admin-console-community.js');window.admin=window.ssAdminV3;}catch(e){console.warn('Admin console dependency load failed',e);window.admin=window.ssAdminV3;}}
boot();

window.ssAdminV3Imports=function(){if(!ok())return;page('Bulk Content Import','Upload production records by module. CSV and Excel are supported.','<div class="card admin"><b>Choose what you are importing</b><p class="small muted">Use one row per record. Draft content remains hidden until published.</p>'+btn('📚 Curriculum','ssAdminV3ImportForm("curriculum")')+btn('📖 Learning Materials','ssAdminV3ImportForm("learningMaterials")')+btn('❓ Question Bank','ssAdminV3ImportForm("questionBank")')+btn('🏆 Competitions','ssAdminV3ImportForm("competitions")')+btn('🎁 Rewards','ssAdminV3ImportForm("rewards")')+btn('🔔 Notifications','ssAdminV3ImportForm("notifications")')+'</div>')}
function importRows(f){return f.name.toLowerCase().endsWith('.xlsx')||f.name.toLowerCase().endsWith('.xls')?f.arrayBuffer().then(function(buf){if(!window.XLSX)throw Error('Excel support unavailable.');var w=XLSX.read(buf,{type:'array'}),sh=w.Sheets[w.SheetNames[0]];return XLSX.utils.sheet_to_json(sh,{defval:''})}):f.text().then(function(txt){var lines=txt.split(/\r?\n/).filter(Boolean);function parse(x){var o=[],c='',q=false;for(var i=0;i<x.length;i++){var z=x[i];if(z==='"'){if(q&&x[i+1]==='"'){c+='"';i++}else q=!q}else if(z===','&&!q){o.push(c);c=''}else c+=z}o.push(c);return o}var h=parse(lines[0]);return lines.slice(1).map(function(x){var r=parse(x),o={};h.forEach(function(k,i){o[k]=r[i]||''});return o})})}
var IMPORT_FIELDS={curriculum:['board','academicYear','classNumber','stream','subject','book','chapter','topic','status'],learningMaterials:['classNumber','stream','subject','book','chapter','topic','title','content','examples','status'],questionBank:['classNumber','stream','subject','book','chapter','topic','questionType','difficulty','question','options','correctAnswer','explanation','xp','coins','accessType','status'],competitions:['title','type','category','classLevel','subject','startAt','endAt','questionCount','durationMinutes','entryCoins','status','published'],rewards:['title','description','coins','xp','status','published'],notifications:['title','body','audience','status']};
window.ssAdminV3ImportForm=function(kind){if(!ok())return;var fields=IMPORT_FIELDS[kind]||[];page('Import '+kind,'Required columns: '+fields.join(', '),'<div class="card"><input id="v3ImportFile" class="input" type="file" accept=".csv,.xlsx,.xls"><button class="btn gold block" onclick="ssAdminV3RunImport(\''+esc(kind)+'\')">📥 Import Records</button></div>')}
window.ssAdminV3RunImport=async function(kind){if(!ok())return;try{var f=document.getElementById('v3ImportFile').files[0];if(!f)throw Error('Choose a CSV or Excel file first.');var rows=await importRows(f),col=kind,now=stamp();for(var i=0;i<rows.length;i++){var d=Object.assign({},rows[i],{createdBy:auth().uid,updatedBy:auth().uid,updatedAt:now});if(kind==='questionBank')d.status=rows[i].status||'review';else if(kind!=='notifications'&&kind!=='competitions')d.status=rows[i].status||'draft';if(kind==='competitions')d.published=String(rows[i].published).toLowerCase()==='true';if(kind==='rewards')d.published=String(rows[i].published).toLowerCase()==='true';await db().collection(col).add(d)}toast(rows.length+' record(s) imported ✓');ssAdminV3()}catch(e){toast(e.message||'Import failed')}}
window.ssAdminV3Records=async function(){if(!ok())return;var a=await docs('quizAttempts');page('Learning Records','Admin view of quiz history and progress records.',a.length?a.slice(0,100).map(function(x){return '<div class="card"><div class="row"><b>'+esc(x.quizTitle||x.quizId||'Quiz attempt')+'</b><span class="badge">'+esc(x.percentage||0)+'%</span></div><div class="small muted">Learner: '+esc(x.uid||'')+' • Score: '+esc(x.score||0)+'/'+esc(x.total||0)+'</div></div>'}).join(''):'<div class="card">No quiz attempt records yet.</div>')}

window.ssAdminV3Relationships=async function(){if(!ok())return;var r=await docs('relationships');page('Relationships','Parent, teacher and learner links.',r.length?r.slice(0,100).map(function(x){return '<div class="card"><div class="row"><b>'+esc(x.status||'active')+'</b><span class="badge">'+esc(x.role||'relationship')+'</span></div><div class="small muted">Learner: '+esc(x.studentUid||'')+'<br>Parent: '+esc(x.parentUid||'—')+'<br>Teacher: '+esc(x.teacherUid||'—')+'</div></div>'}).join(''):'<div class="card">No relationships found.</div>')}
window.ssAdminV3Learners=async function(){if(!ok())return;var u=await docs('users');var l=u.filter(function(x){return !x.role||x.role==='learner'});page('Learner Profiles','Review learner identity and education fields used across Learn, Play and Compete.',l.slice(0,100).map(function(x){return '<div class="card"><div class="row"><b>'+esc(x.name||x.displayName||'Learner')+'</b><span class="badge">'+esc(x.role||'learner')+'</span></div><div class="small muted">Class: '+esc(x.studentClass||x.classNumber||'—')+' • Board: '+esc(x.board||'—')+'<br>Academic Year: '+esc(x.academicYear||'—')+'<br>State: '+esc(x.state||'—')+' • District: '+esc(x.district||'—')+'<br>School: '+esc(x.school||'—')+'<br>XP: '+esc(x.xp||0)+' • Coins: '+esc(x.coins||0)+' • Level: '+esc(x.level||1)+'</div></div>'}).join('')||'<div class="card">No learner profiles found.</div>')}
window.ssAdminV3Leaderboards=async function(){if(!ok())return;var r=await docs('leaderboards');page('Leaderboards','Review published leaderboard records used by the Compete area.',r.length?r.slice(0,100).map(function(x){return '<div class="card"><div class="row"><b>'+esc(x.title||x.name||'Leaderboard')+'</b><span class="badge">'+esc(x.status||'published')+'</span></div><div class="small muted">Scope: '+esc(x.scope||x.type||'Overall')+' • Class: '+esc(x.classLevel||'All')+'</div></div>'}).join(''):'<div class="card">No leaderboard records yet. Leaderboard data can be added after competition result publishing.</div>')}
window.ssAdminV3Rewards=async function(){if(!ok())return;var r=await docs('rewards'),bds=await docs('badges');page('Rewards & Badges','Manage reward catalogue and badge definitions shown to learners.','<div class="card admin">'+btn('＋ Add Reward','ssAdminV3RewardForm()','gold')+'</div><div class="section"><b>Rewards ('+r.length+')</b></div>'+(r.length?r.slice(0,100).map(function(x){return '<div class="card"><div class="row"><b>'+esc(x.title||x.name||'Reward')+'</b><span class="badge">'+esc(x.status||'draft')+'</span></div><div class="small muted">Coins: '+esc(x.coins||0)+' • XP: '+esc(x.xp||0)+'</div></div>'}).join(''):'<div class="card">No rewards yet.</div>')+'<div class="section"><b>Badges ('+bds.length+')</b></div>'+(bds.length?bds.slice(0,100).map(function(x){return '<div class="card"><b>'+esc(x.title||x.name||'Badge')+'</b><div class="small muted">'+esc(x.description||'')+'</div></div>'}).join(''):'<div class="card">No badges yet.</div>') )}
window.ssAdminV3RewardForm=function(){if(!ok())return;page('Add Reward','Create a learner reward entry.','<div class="card"><input id="rvTitle" class="input" placeholder="Reward title"><input id="rvCoins" class="input" type="number" placeholder="Coins cost"><input id="rvXp" class="input" type="number" placeholder="XP value"><textarea id="rvDesc" class="area" rows="3" placeholder="Description"></textarea>'+btn('Save Reward','ssAdminV3SaveReward()','gold')+'</div>')}
window.ssAdminV3SaveReward=async function(){if(!ok())return;var t=rvTitle.value.trim();if(!t)return toast('Enter a reward title.');try{await db().collection('rewards').add({title:t,coins:Number(rvCoins.value)||0,xp:Number(rvXp.value)||0,description:rvDesc.value.trim(),status:'draft',createdBy:auth().uid,createdAt:stamp(),updatedAt:stamp()});toast('Reward saved ✓');ssAdminV3Rewards()}catch(e){toast(e.message||'Could not save reward')}};
})();

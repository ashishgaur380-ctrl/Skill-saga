/* Skill Saga Admin Console — Play Control v1
 * Central admin control for Play activities, academic class progression, Skills and Other.
 * Uses Firestore collections: playActivities, playProgression, appSettings/play.
 */
(function(){'use strict';
if(window.__SS_ADMIN_PLAY_V1)return;window.__SS_ADMIN_PLAY_V1=true;
function ok(){return window.ssAdminGuard?ssAdminGuard():false}
function db(){return ssAdminDB()}
function auth(){return ssAdminAuth()}
function esc(v){return ssAdminEsc(v)}
function page(t,s,b){return ssAdminPage(t,s,b)}
function btn(t,f,k){return ssAdminButton(t,f,k)}
function toastx(x){if(window.toast)toast(x)}
function stamp(){return ssAdminStamp()}

var TYPES=[
 {id:'dailyQuiz',name:'Daily Quiz',desc:'Daily learner quiz activity'},
 {id:'quickPractice',name:'Quick Practice',desc:'Short practice sessions'},
 {id:'topicPractice',name:'Topic Practice',desc:'Practice by topic'},
 {id:'mixedQuiz',name:'Mixed Quiz',desc:'Mixed-topic quiz sessions'},
 {id:'assignedQuizzes',name:'Assigned Quizzes',desc:'Teacher/admin assigned work'},
 {id:'puzzles',name:'Puzzles',desc:'Logic, number, visual reasoning and word puzzles'}
];
var DEFAULTS=[
 {id:'currentClass',label:'Current class',xp:0,coins:0},
 {id:'plusMinus1',label:'±1 class',xp:500,coins:50},
 {id:'plusMinus2',label:'±2 classes',xp:1000,coins:100},
 {id:'plusMinus3',label:'±3 classes',xp:2000,coins:200}
];

function toggle(v){return v?'Enabled':'Disabled'}
function safeId(v){return String(v||'').replace(/[^a-zA-Z0-9_-]/g,'')}

window.ssAdminPlayControl=async function(){
 if(!ok())return;
 var [actsDoc,progDoc,set]=await Promise.all([
   db().collection('appSettings').doc('playActivities').get(),
   db().collection('appSettings').doc('playProgression').get(),
   db().collection('appSettings').doc('play').get().then(function(x){return x.exists?x.data():{playEnabled:true}})
 ]);
 var acts=actsDoc.exists?(actsDoc.data().activities||[]):[];
 var prog=progDoc.exists?(progDoc.data().items||[]):[];
 var by={};acts.forEach(function(x){by[x.type]=x});
 var rows=TYPES.map(function(t){
   var a=by[t.id];
   return '<div class="card"><div class="row"><div><b>'+esc(t.name)+'</b><div class="small muted">'+esc(t.desc)+'</div></div><span class="badge">'+toggle(!a||a.enabled!==false)+'</span></div><div class="small muted">Type: '+esc(t.id)+(a&&a.updatedAt?' • configured':'')+'</div>'+btn('Configure',"ssAdminPlayActivityForm('"+t.id+"')")+'</div>'
 }).join('');
 var p=prog.length?prog:DEFAULTS;
 var pr=p.map(function(x){return '<div class="card"><div class="row"><b>'+esc(x.label||x.id)+'</b><span class="badge">'+esc(x.xp||0)+' XP</span></div><div class="small muted">Coins: '+esc(x.coins||0)+'</div></div>'}).join('');
 page('Play Control','Control Play activities, progression and access rules.','<div class="notice"><b>Play scope:</b> quizzes, puzzles, XP, coins and progression. Competitions remain under Compete.</div>'+
 '<div class="card admin"><div class="row"><b>Play System</b><span class="badge">'+toggle(set.playEnabled!==false)+'</span></div>'+btn(set.playEnabled===false?'Enable Play':'Disable Play','ssAdminPlayToggle()','gold')+'</div>'+
 '<div class="section"><b>Play Activities</b></div>'+rows+
 '<div class="section"><b>Academic Class Progression</b></div>'+pr+
 '<div class="card admin">'+btn('⚙ Edit Progression','ssAdminPlayProgressionForm()','gold')+'</div>'+
 '<div class="section"><b>Play Categories</b></div><div class="card"><b>Academic</b><div class="small muted">Class → Subject → Chapter/Topic → Difficulty → Quiz</div></div><div class="card"><b>Skills</b><div class="small muted">Skill → Topic/Level → Quiz</div></div><div class="card"><b>Other</b><div class="small muted">Topic → Quiz</div></div>');
};

window.ssAdminPlayActivityForm=function(type){
 if(!ok())return;
 var t=TYPES.find(function(x){return x.id===type})||{id:type,name:type,desc:''};
 db().collection('appSettings').doc('playActivities').get().then(function(s){
   var all=s.exists?(s.data().activities||[]):[];var found=all.find(function(x){return x.type===type});
   var d=found||{enabled:true,accessType:'free',difficulty:'Foundation',questionCount:10,durationMinutes:10};
   page(t.name,'Configure this Play activity.','<div class="card"><input id="pcType" type="hidden" value="'+esc(type)+'">'+
   '<label>Enabled</label><select id="pcEnabled" class="input"><option value="true"'+(d.enabled!==false?' selected':'')+'>Enabled</option><option value="false"'+(d.enabled===false?' selected':'')+'>Disabled</option></select>'+
   '<label>Access</label><select id="pcAccess" class="input"><option value="free"'+(d.accessType==='free'?' selected':'')+'>Free</option><option value="premium"'+(d.accessType==='premium'?' selected':'')+'>Premium</option><option value="admin"'+(d.accessType==='admin'?' selected':'')+'>Admin/Assigned</option></select>'+
   '<label>Default difficulty</label><select id="pcDifficulty" class="input">'+['Foundation','Basic','Intermediate','Advanced'].map(function(x){return '<option'+(d.difficulty===x?' selected':'')+'>'+x+'</option>'}).join('')+'</select>'+
   '<input id="pcQuestions" class="input" type="number" min="1" max="100" value="'+esc(d.questionCount||10)+'" placeholder="Question count">'+
   '<input id="pcDuration" class="input" type="number" min="1" max="180" value="'+esc(d.durationMinutes||10)+'" placeholder="Duration minutes">'+
   btn('Save Activity','ssAdminPlaySaveActivity()','gold')+'</div>');
 });
};

window.ssAdminPlaySaveActivity=async function(){
 if(!ok())return;
 var type=document.getElementById('pcType').value;
 try{
  var ref=db().collection('appSettings').doc('playActivities');
  var snap=await ref.get();var all=snap.exists?(snap.data().activities||[]):[];var idx=all.findIndex(function(x){return x.type===type});
  var item={type:type,enabled:document.getElementById('pcEnabled').value==='true',
   accessType:document.getElementById('pcAccess').value,
   difficulty:document.getElementById('pcDifficulty').value,
   questionCount:Number(document.getElementById('pcQuestions').value)||10,
   durationMinutes:Number(document.getElementById('pcDuration').value)||10,
   updatedBy:auth().uid,updatedAt:stamp()};
  if(idx>=0)all[idx]=Object.assign({},all[idx],item);else all.push(item);
  await ref.set({activities:all,updatedBy:auth().uid,updatedAt:stamp()},{merge:true});
  toastx('Play activity saved ✓');ssAdminPlayControl();
 }catch(e){toastx(e.message||'Could not save Play activity')}
};

window.ssAdminPlayToggle=async function(){
 if(!ok())return;
 try{
  var ref=db().collection('appSettings').doc('play'),s=await ref.get(),old=s.exists?s.data():{};
  var next=old.playEnabled===false;
  await ref.set({playEnabled:next,updatedBy:auth().uid,updatedAt:stamp()},{merge:true});
  toastx('Play '+(next?'enabled':'disabled')+' ✓');ssAdminPlayControl();
 }catch(e){toastx(e.message||'Could not update Play setting')}
};

window.ssAdminPlayProgressionForm=async function(){
 if(!ok())return;
 var [s]=await Promise.all([db().collection('appSettings').doc('playProgression').get()]);
 var d=s.exists?s.data():{};
 page('Play Progression','XP is a threshold; coins are spendable when an unlock uses them.','<div class="card"><p class="small muted">Current class is free. Configure requirements for additional academic classes.</p>'+
 '<input id="pp1xp" class="input" type="number" min="0" value="'+esc(d.plusMinus1Xp!=null?d.plusMinus1Xp:500)+'" placeholder="±1 class XP">'+
 '<input id="pp1coins" class="input" type="number" min="0" value="'+esc(d.plusMinus1Coins!=null?d.plusMinus1Coins:50)+'" placeholder="±1 class Coins">'+
 '<input id="pp2xp" class="input" type="number" min="0" value="'+esc(d.plusMinus2Xp!=null?d.plusMinus2Xp:1000)+'" placeholder="±2 classes XP">'+
 '<input id="pp2coins" class="input" type="number" min="0" value="'+esc(d.plusMinus2Coins!=null?d.plusMinus2Coins:100)+'" placeholder="±2 classes Coins">'+
 '<input id="pp3xp" class="input" type="number" min="0" value="'+esc(d.plusMinus3Xp!=null?d.plusMinus3Xp:2000)+'" placeholder="±3 classes XP">'+
 '<input id="pp3coins" class="input" type="number" min="0" value="'+esc(d.plusMinus3Coins!=null?d.plusMinus3Coins:200)+'" placeholder="±3 classes Coins">'+
 btn('Save Progression','ssAdminPlaySaveProgression()','gold')+'</div>');
};

window.ssAdminPlaySaveProgression=async function(){
 if(!ok())return;
 try{
  await db().collection('appSettings').doc('playProgression').set({
   currentClassXp:0,currentClassCoins:0,
   plusMinus1Xp:Number(pp1xp.value)||0,plusMinus1Coins:Number(pp1coins.value)||0,
   plusMinus2Xp:Number(pp2xp.value)||0,plusMinus2Coins:Number(pp2coins.value)||0,
   plusMinus3Xp:Number(pp3xp.value)||0,plusMinus3Coins:Number(pp3coins.value)||0,
   updatedBy:auth().uid,updatedAt:stamp()
  },{merge:true});
  toastx('Progression saved ✓');ssAdminPlayControl();
 }catch(e){toastx(e.message||'Could not save progression')}
};
})();
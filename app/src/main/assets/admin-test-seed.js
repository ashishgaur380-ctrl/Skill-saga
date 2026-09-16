/* Skill Saga — Admin test-content seeder */
(function(){
'use strict';
var ADMIN_UID='4Jme1MoSmHbjzwVjkvxeNSwPp0U2';
function q(id,title,type,category,classLevel,skill,subject,topic,difficulty,date,xp,coins,published,status,accessMode,questions){return {id:id,title:title,type:type,category:category,classLevel:classLevel,skill:skill,subject:subject,topic:topic,difficulty:difficulty,date:date,publishDate:date,xp:xp,coins:coins,published:published,status:status,accessMode:accessMode,questions:questions.map(function(x){return {question:x[0],options:x[1],correctIndex:x[2],explanation:x[3]};})};}
var QUIZZES=[
 q('ss-test-draft-academic','TEST — Class 8 Science Draft','practice','Academic','8','Science','Science','Force and Pressure','Basic','2099-12-31',100,10,false,'draft','free',[
  ['A force can change the ____ of an object.',['shape','colour','name','age'],0,'Force can change an object’s shape, motion or direction.'],
  ['Which is a contact force?',['Gravity','Magnetic force','Friction','Electrostatic force'],2,'Friction acts through contact.']]),
 q('ss-test-daily-published','TEST — Daily Science Challenge','daily','Academic','8','Science','Science','Light','Basic','2026-09-17',120,15,true,'published','free',[
  ['Light travels in a ____ line in a uniform medium.',['curved','straight','zigzag','circular'],1,'In a uniform medium, light travels in a straight line.'],
  ['Which object is luminous?',['Moon','Book','Sun','Mirror'],2,'The Sun produces its own light.']]),
 q('ss-test-skills-published','TEST — Reasoning Quick Practice','practice','Thinking Skills','All','Reasoning','Reasoning','Number Series','Intermediate','2026-09-17',90,10,true,'published','free',[
  ['What comes next: 2, 4, 8, 16, ?',['18','24','32','36'],2,'Each term is multiplied by 2.'],
  ['What comes next: 5, 10, 20, 40, ?',['45','60','80','100'],2,'Each term is doubled.']]),
 q('ss-test-locked-coins','TEST — Class 9 Locked Quiz','practice','Academic','9','Mathematics','Mathematics','Linear Equations','Intermediate','2026-09-17',150,20,true,'published','coins',[
  ['Solve: x + 7 = 12.',['3','4','5','6'],2,'Subtract 7 from both sides.'],
  ['Solve: 2x = 10.',['2','5','10','20'],1,'Divide both sides by 2.']]),
 q('ss-test-other-published','TEST — General Knowledge','practice','Sports','All','General Knowledge','General Knowledge','India','Foundation','2026-09-17',80,8,true,'published','free',[
  ['What is the capital of India?',['Mumbai','New Delhi','Kolkata','Chennai'],1,'New Delhi is the capital of India.'],
  ['How many colours are commonly shown in the Indian national flag?',['2','3','4','5'],1,'The flag has saffron, white and green, with the blue Ashoka Chakra.']])
];
var COMPETITIONS=[
 {id:'ss-test-comp-weekly',title:'TEST — Weekly Championship',type:'WEEKLY_CHAMPIONSHIP',category:'Academic',classLevel:'8',subject:'Mathematics',status:'upcoming',startAt:'2026-09-18T10:00:00',endAt:'2026-09-18T10:30:00',questionCount:20,durationMinutes:30,entryCoins:0},
 {id:'ss-test-comp-subject',title:'TEST — Science Challenge',type:'SUBJECT_CHALLENGE',category:'Academic',classLevel:'6-8',subject:'Science',status:'upcoming',startAt:'2026-09-20T10:00:00',endAt:'2026-09-20T10:30:00',questionCount:25,durationMinutes:30,entryCoins:0}
];
function toast(m){if(typeof window.toast==='function')window.toast(m);}
function db(){return window.firebase&&firebase.firestore?firebase.firestore():null;}
function isAdmin(){try{var u=window.firebase&&firebase.auth?firebase.auth().currentUser:null;return !!(u&&u.uid===ADMIN_UID&&db());}catch(e){return false;}}
async function seed(){
 if(!isAdmin())return toast('Admin account required.');
 var database=db(),writes=0;
 try{
   var batch=database.batch();
   QUIZZES.forEach(function(item){var ref=database.collection('quizzes').doc(item.id);batch.set(ref,Object.assign({},item,{testData:true,updatedAt:firebase.firestore.FieldValue.serverTimestamp()}),{merge:true});writes++;});
   COMPETITIONS.forEach(function(item){var ref=database.collection('competitions').doc(item.id);batch.set(ref,Object.assign({},item,{testData:true,updatedAt:firebase.firestore.FieldValue.serverTimestamp()}),{merge:true});});
   await batch.commit();
   if(typeof window.loadCloudContent==='function')await window.loadCloudContent();
   toast('Test content loaded: '+writes+' quizzes + '+COMPETITIONS.length+' competitions.');
   if(typeof window.admin==='function')window.admin();
 }catch(e){console.error(e);toast('Test content failed: '+(e.message||e));}
}
function addButton(){
 if(!isAdmin()||document.getElementById('ss-seed-test-content'))return;
 var root=document.getElementById('root');if(!root)return;
 var headings=Array.from(root.querySelectorAll('h1')).filter(function(x){return /admin/i.test(x.textContent||'');});
 if(!headings.length)return;
 var box=document.createElement('div');box.id='ss-seed-test-content';box.className='card admin';box.style.marginTop='12px';
 box.innerHTML='<b>🧪 Integration Test Data</b><p class="muted" style="margin:6px 0 10px">Creates disposable Draft + Published quizzes and competition records so Play/Compete workflows can be tested end-to-end.</p><button class="btn" type="button">Load Test Content</button>';
 box.querySelector('button').onclick=seed;var main=root.querySelector('main');if(main)main.insertBefore(box,main.firstChild||null);
}
var obs=new MutationObserver(function(){setTimeout(addButton,0);});
if(document.body){obs.observe(document.body,{childList:true,subtree:true});setTimeout(addButton,300);}else document.addEventListener('DOMContentLoaded',addButton);
window.ssSeedTestContent=seed;
})();

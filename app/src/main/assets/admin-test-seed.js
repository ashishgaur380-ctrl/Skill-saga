/* Skill Saga — Admin test-content seeder
 * Admin-only. Creates disposable test quizzes/competitions for integration testing.
 */
(function(){
'use strict';
var ADMIN_UID='4Jme1MoSmHbjzwVjkvxeNSwPp0U2';
var QUIZZES=[
 {id:'ss-test-draft-academic',title:'TEST — Class 8 Science Draft',type:'practice',category:'Academic',classLevel:'8',skill:'Science',subject:'Science',topic:'Force and Pressure',difficulty:'Basic',date:'2099-12-31',publishDate:'2099-12-31',xp:100,coins:10,published:false,status:'draft',accessMode:'free',questions:[['A force can change the ____ of an object.',['shape','colour','name','age'],0,'Force can change an object’s shape, motion or direction.'],['Which is a contact force?',['Gravity','Magnetic force','Friction','Electrostatic force'],2,'Friction acts through contact.']]},
 {id:'ss-test-daily-published',title:'TEST — Daily Science Challenge',type:'daily',category:'Academic',classLevel:'8',skill:'Science',subject:'Science',topic:'Light',difficulty:'Basic',date:'2026-09-17',publishDate:'2026-09-17',xp:120,coins:15,published:true,status:'published',accessMode:'free',questions:[['Light travels in a ____ line in a uniform medium.',['curved','straight','zigzag','circular'],1,'In a uniform medium, light travels in a straight line.'],['Which object is luminous?',['Moon','Book','Sun','Mirror'],2,'The Sun produces its own light.']]},
 {id:'ss-test-skills-published',title:'TEST — Reasoning Quick Practice',type:'practice',category:'Thinking Skills',classLevel:'All',skill:'Reasoning',subject:'Reasoning',topic:'Number Series',difficulty:'Intermediate',date:'2026-09-17',publishDate:'2026-09-17',xp:90,coins:10,published:true,status:'published',accessMode:'free',questions:[['What comes next: 2, 4, 8, 16, ?',['18','24','32','36'],2,'Each term is multiplied by 2.'],['What comes next: 5, 10, 20, 40, ?',['45','60','80','100'],2,'Each term is doubled.']]},
 {id:'ss-test-locked-coins',title:'TEST — Class 9 Locked Quiz',type:'practice',category:'Academic',classLevel:'9',skill:'Mathematics',subject:'Mathematics',topic:'Linear Equations',difficulty:'Intermediate',date:'2026-09-17',publishDate:'2026-09-17',xp:150,coins:20,published:true,status:'published',accessMode:'coins',xpRequired:500,coinsRequired:50,questions:[['Solve: x + 7 = 12.',['3','4','5','6'],2,'Subtract 7 from both sides.'],['Solve: 2x = 10.',['2','5','10','20'],1,'Divide both sides by 2.']]},
 {id:'ss-test-other-published',title:'TEST — General Knowledge',type:'practice',category:'Sports',classLevel:'All',skill:'General Knowledge',subject:'General Knowledge',topic:'India',difficulty:'Foundation',date:'2026-09-17',publishDate:'2026-09-17',xp:80,coins:8,published:true,status:'published',accessMode:'free',questions:[['What is the capital of India?',['Mumbai','New Delhi','Kolkata','Chennai'],1,'New Delhi is the capital of India.'],['How many colours are commonly shown in the Indian national flag?',['2','3','4','5'],1,'The flag has saffron, white and green, with the blue Ashoka Chakra.']]}
];
var COMPETITIONS=[
 {id:'ss-test-comp-weekly',title:'TEST — Weekly Championship',type:'WEEKLY_CHAMPIONSHIP',category:'Academic',classLevel:'8',subject:'Mathematics',status:'upcoming',startAt:'2026-09-18T10:00:00',endAt:'2026-09-18T10:30:00',questions:20,durationMinutes:30,entryCoins:0},
 {id:'ss-test-comp-subject',title:'TEST — Science Challenge',type:'SUBJECT_CHALLENGE',category:'Academic',classLevel:'6-8',subject:'Science',status:'upcoming',startAt:'2026-09-20T10:00:00',endAt:'2026-09-20T10:30:00',questions:25,durationMinutes:30,entryCoins:0}
];
function toast(m){if(typeof window.toast==='function')window.toast(m);}
function isAdmin(){try{return window.cloudUser&&window.cloudUser.uid===ADMIN_UID&&window.cloudDb;}catch(e){return false;}}
async function seed(){
 if(!isAdmin())return toast('Admin account required.');
 var writes=0;
 try{
   var batch=window.cloudDb.batch();
   QUIZZES.forEach(function(q){var ref=window.cloudDb.collection('quizzes').doc(q.id);batch.set(ref,Object.assign({},q,{testData:true,updatedAt:firebase.firestore.FieldValue.serverTimestamp()}),{merge:true});writes++;});
   COMPETITIONS.forEach(function(c){var ref=window.cloudDb.collection('competitions').doc(c.id);batch.set(ref,Object.assign({},c,{testData:true,updatedAt:firebase.firestore.FieldValue.serverTimestamp()}),{merge:true});});
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
 box.querySelector('button').onclick=seed;root.querySelector('main').insertBefore(box,root.querySelector('main').firstChild||null);
}
var obs=new MutationObserver(function(){setTimeout(addButton,0);});
if(document.body){obs.observe(document.body,{childList:true,subtree:true});setTimeout(addButton,300);}else document.addEventListener('DOMContentLoaded',addButton);
window.ssSeedTestContent=seed;
})();

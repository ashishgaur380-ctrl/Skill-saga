/* Skill Saga — Teacher Performance Sync v1
 * Builds teacher-side learner summaries from quizAttempts instead of trusting cached learner metrics.
 * Additive: existing dashboard UI remains untouched.
 */
(function(){
'use strict';
if(window.__SS_TEACHER_PERFORMANCE_SYNC_V1)return;
window.__SS_TEACHER_PERFORMANCE_SYNC_V1=true;
function db(){return window.firebase&&firebase.firestore?firebase.firestore():null;}
function me(){try{return typeof window.user==='function'?window.user():null;}catch(e){return null;}}
function esc(v){return String(v==null?'':v).replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c];});}
async function attempts(uid){
 var d=db();if(!d||!uid)return [];
 try{var s=await d.collection('quizAttempts').where('uid','==',String(uid)).get();return s.docs.map(function(x){return Object.assign({id:x.id},x.data());});}catch(e){console.warn('Teacher performance attempts query failed',e);return [];}
}
function summary(rows){
 rows=Array.isArray(rows)?rows:[];var completed=rows.filter(function(x){return x&&x.completed!==false;});
 var scores=completed.filter(function(x){return typeof x.percentage==='number';});
 var xp=completed.reduce(function(n,x){return n+Number(x.xpEarned||x.xp||0);},0);
 var coins=completed.reduce(function(n,x){return n+Number(x.coinsEarned||x.coins||0);},0);
 var avg=scores.length?scores.reduce(function(n,x){return n+Number(x.percentage||0);},0)/scores.length:0;
 var dates=completed.map(function(x){return new Date(x.completedAt||x.createdAt||x.timestamp||0);}).filter(function(d){return !isNaN(d.getTime());}).sort(function(a,b){return b-a;});
 var streak=0;if(dates.length){var days={};dates.forEach(function(d){days[d.toISOString().slice(0,10)]=1;});var cur=new Date();while(days[cur.toISOString().slice(0,10)]){streak++;cur.setDate(cur.getDate()-1);}}
 return {studentXp:xp,studentCoins:coins,studentAccuracy:Math.round(avg*10)/10,studentQuizzes:completed.length,studentStreak:streak};
}
async function syncStudent(uid){
 var u=me(),d=db();if(!u||!d||!uid)return null;
 var rows=await attempts(uid),s=summary(rows);
 try{await d.collection('users').doc(String(uid)).set({performanceSummary:Object.assign({},s,{updatedAt:new Date().toISOString()})},{merge:true});}catch(e){console.warn('Teacher performance summary write skipped',e);}
 return s;
}
window.SkillSagaTeacherPerformance={attempts:attempts,summary:summary,syncStudent:syncStudent};
})();

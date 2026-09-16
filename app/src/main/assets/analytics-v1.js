/* Skill Saga — Analytics v1
 * Additive analytics layer. Reads existing quizAttempts/learner data when available.
 */
(function(){
'use strict';
function db(){return window.firebase&&firebase.firestore?firebase.firestore():null;}
function current(){return typeof window.user==='function'?window.user():null;}
function num(v){var n=Number(v);return isFinite(n)?n:0;}
function summarize(rows){
 var total=rows.length,score=0,xp=0,coins=0,completed=0,bySubject={},byTopic={};
 rows.forEach(function(a){
  var pct=a.percentage!=null?num(a.percentage):(a.score!=null&&a.total?num(a.score)/num(a.total)*100:0);
  score+=pct; xp+=num(a.xpEarned||a.xp); coins+=num(a.coinsEarned||a.coins);
  if(a.completed!==false)completed++;
  var s=String(a.subject||'Unspecified');bySubject[s]=(bySubject[s]||0)+1;
  var t=String(a.topic||'Unspecified');byTopic[t]=(byTopic[t]||0)+1;
 });
 return {totalAttempts:total,completedAttempts:completed,averagePercentage:total?Math.round(score/total*10)/10:0,xpEarned:xp,coinsEarned:coins,bySubject:bySubject,byTopic:byTopic};
}
async function learner(){
 var u=current(),d=db();if(!u||!d)return null;
 try{
  var snap=await d.collection('quizAttempts').where('studentUid','==',u.uid).get();
  return summarize(snap.docs.map(function(x){return Object.assign({id:x.id},x.data());}));
 }catch(e){console.warn('Learner analytics unavailable',e);return null;}
}
async function admin(){
 var d=db();if(!d)return null;
 try{
  var snap=await d.collection('quizAttempts').get();
  return summarize(snap.docs.map(function(x){return Object.assign({id:x.id},x.data());}));
 }catch(e){console.warn('Admin analytics unavailable',e);return null;}
}
window.SkillSagaAnalytics={summarize:summarize,learner:learner,admin:admin};
})();

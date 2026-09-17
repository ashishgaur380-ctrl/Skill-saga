/* Skill Saga — Teacher Performance Dashboard v2
 * Wires the performance source-of-truth helper into teacher refresh flows.
 * No UI redesign and no client write of another student's users document.
 */
(function(){
'use strict';
if(window.__SS_TEACHER_PERFORMANCE_DASHBOARD_V2)return;
window.__SS_TEACHER_PERFORMANCE_DASHBOARD_V2=true;
function perf(){return window.SkillSagaTeacherPerformance||null;}
function isTeacher(){try{var u=typeof window.user==='function'?window.user():null;return !!u&&String(u.role||'').toLowerCase()==='teacher';}catch(e){return false;}}
async function hydrate(){
 if(!isTeacher())return;
 var p=perf(); if(!p)return;
 var list=window.linkedStudents;
 if(!Array.isArray(list)||!list.length)return;
 for(var i=0;i<list.length;i++){
  var s=list[i],uid=s&& (s.studentUid||s.uid||s.id); if(!uid)continue;
  try{
   var rows=await p.attempts(uid),x=p.summary(rows);
   s.studentXp=x.studentXp;
   s.studentCoins=x.studentCoins;
   s.studentAccuracy=x.studentAccuracy;
   s.studentQuizzes=x.studentQuizzes;
   s.studentStreak=x.studentStreak;
   s.performanceSummary=x;
  }catch(e){console.warn('Teacher dashboard hydration skipped',e);}
 }
 try{window.SkillSagaTeacherPerformanceHydratedAt=Date.now();}catch(e){}
}
function install(){
 var tries=0, timer=setInterval(function(){
  tries++;
  if(typeof window.refreshLinkedStudents==='function' && !window.__SS_REFRESH_LINKED_WRAPPED){
   var original=window.refreshLinkedStudents;
   window.refreshLinkedStudents=async function(){
    var r=await original.apply(this,arguments);
    try{await hydrate();}catch(e){}
    return r;
   };
   window.__SS_REFRESH_LINKED_WRAPPED=true;
   clearInterval(timer);
   try{hydrate();}catch(e){}
  }
  if(tries>120)clearInterval(timer);
 },500);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
window.SkillSagaTeacherDashboard={hydrate:hydrate};
})();

/* Skill Saga — Quiz Attempt Integrity v1
 * Client-side integrity layer only. Prevents malformed attempt payloads and
 * derives completion metrics from the actual quiz state before persistence.
 * Server-authoritative scoring still requires trusted backend code.
 */
(function(){
'use strict';
if(window.__SS_QUIZ_ATTEMPT_INTEGRITY_V1)return;
window.__SS_QUIZ_ATTEMPT_INTEGRITY_V1=true;
function toast(m){if(typeof window.toast==='function')window.toast(m);}
function validQuestion(q){return Array.isArray(q)&&q.length>=2&&String(q[0]||'').trim()&&Array.isArray(q[1])&&q[1].length>=2&&Number.isInteger(Number(q[2]))&&Number(q[2])>=0&&Number(q[2])<q[1].length;}
function sanitizeState(s){
 if(!s||!s.c||!Array.isArray(s.c.questions))return null;
 var qs=s.c.questions.filter(validQuestion);
 if(!qs.length)return null;
 var rs=Array.isArray(s.responses)?s.responses:[];
 var correct=0;
 qs.forEach(function(q,i){if(Number(rs[i])===Number(q[2]))correct++;});
 return {total:qs.length,answered:Math.min(rs.length,qs.length),correct:correct,percentage:Math.round(correct/qs.length*1000)/10};
}
window.ssQuizAttemptIntegrity=function(){return sanitizeState(window.quizState);};
function patchFinish(){
 if(typeof window.finishQuiz!=='function'||window.__SS_INTEGRITY_FINISH_PATCHED)return;
 window.__SS_INTEGRITY_FINISH_PATCHED=true;
 var original=window.finishQuiz;
 window.finishQuiz=async function(){
   var m=sanitizeState(window.quizState);
   if(!m){toast('Quiz data is incomplete. This attempt cannot be submitted.');return;}
   return original.apply(this,arguments);
 };
}
function install(){patchFinish();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();

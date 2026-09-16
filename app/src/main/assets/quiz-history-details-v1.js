/* Skill Saga — Quiz History / Attempt Details v1 */
(function(){
'use strict';
function toast(m){if(typeof window.toast==='function')window.toast(m);}
function getHistory(){
 var a=[];try{if(window.local&&Array.isArray(window.local.quizHistory))a=window.local.quizHistory;else if(window.local&&Array.isArray(window.local.history))a=window.local.history;}catch(e){}
 return a;
}
function detail(x){
 if(!x)return;
 var title=x.title||x.quizTitle||x.name||'Quiz Attempt';
 var score=x.score==null?'—':x.score;
 var total=x.total||x.totalQuestions||x.questionsCount||'—';
 var pct=x.percentage!=null?x.percentage:(total!=='—'&&Number(total)?Math.round(Number(score)/Number(total)*100):'—');
 var app=document.querySelector('.app'),main=app&&app.querySelector('.main');if(!main)return;
 var qs=Array.isArray(x.questions)?x.questions:[],rs=Array.isArray(x.responses)?x.responses:[];
 var html='<div class="ss-final"><button class="back" onclick="window.go(\'profile\')">‹</button><section class="ss-hero"><div class="ss-eyebrow">QUIZ HISTORY</div><h1 class="ss-title">'+esc(title)+'</h1><div class="ss-sub">Score '+esc(score)+' / '+esc(total)+' • '+esc(pct)+'%</div></section><div class="ss-popular"><div class="ss-topic"><b>Score</b><small>'+esc(score)+' / '+esc(total)+'</small></div><div class="ss-topic"><b>Accuracy</b><small>'+esc(pct)+'%</small></div><div class="ss-topic"><b>XP</b><small>'+esc(x.xp||0)+'</small></div></div>';
 if(qs.length){html+='<div class="ss-section"><b>Question Review</b><span>'+qs.length+' questions</span></div>';qs.forEach(function(q,i){var row=Array.isArray(q)?q:(q||{});var qtext=Array.isArray(row)?row[0]:(row.question||'Question '+(i+1));var opts=Array.isArray(row)?row[1]:(row.options||[]);var correct=Array.isArray(row)?Number(row[2]||0):Number(row.correctIndex||0);var ans=rs[i];if(ans&&typeof ans==='object')ans=ans.selectedIndex!=null?ans.selectedIndex:ans.answer;html+='<div class="ss-assignment"><b>Q'+(i+1)+'. '+esc(qtext)+'</b><small>Your answer: '+esc(ans==null?'Not answered':(opts[ans]||ans))+'<br>Correct answer: '+esc(opts[correct]||correct)+'</small></div>';});}
 else html+='<div class="ss-final-note">Question-by-question responses were not stored for this attempt. Summary results are available above.</div>';
 html+='</div>';main.innerHTML=html;
}
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]});}
function install(){
 if(window.__SS_HISTORY_DETAILS_V1)return;window.__SS_HISTORY_DETAILS_V1=true;
 document.addEventListener('click',function(e){var el=e.target.closest&&e.target.closest('.ss-history,.history-card,.attempt-card,.quiz-history-item');if(!el)return;e.preventDefault();e.stopPropagation();var i=Number(el.getAttribute('data-history-index'));var h=getHistory();detail(h[Number.isFinite(i)?i:0]);},true);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
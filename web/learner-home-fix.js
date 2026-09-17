/* Skill Saga — Learner Home functional layer
 * Keeps the approved visual Home UI but replaces placeholder values/actions
 * with the existing learner data and quiz engine.
 */
(function(){
'use strict';
var originalGo=window.go;
var originalHome=window.home;
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function getUser(){try{return typeof user==='function'?user():null}catch(e){return null}}
function getDaily(){try{return typeof daily==='function'?daily():null}catch(e){return null}}
function render(){
 var u=getUser(); if(!u)return;
 var d=getDaily();
 var root=document.querySelector('.ss-final'); if(!root)return;
 var stats=root.querySelectorAll('.ss-stat');
 if(stats[0]){var b=stats[0].querySelector('b');if(b)b.textContent=Number(u.xp||0).toLocaleString();}
 if(stats[1]){var b2=stats[1].querySelector('b');if(b2)b2.textContent=Number(u.streak||0);}
 if(stats[2]){var b3=stats[2].querySelector('b');if(b3)b3.textContent='…';}
 var mission=root.querySelector('.ss-card.ss-blue-stats');
 if(mission&&d){
   var title=mission.querySelector('div[style*="font-size:19px"]');
   var meta=mission.querySelector('div[style*="font-size:10px"]');
   var btn=mission.querySelector('button');
   if(title)title.textContent=d.title||'Daily Challenge';
   if(meta)meta.textContent=(Array.isArray(d.questions)?d.questions.length:0)+' Questions • '+(d.difficulty||'Mixed');
   if(btn){btn.textContent='Start Challenge →';btn.onclick=function(){if(typeof startQuiz==='function')startQuiz(d.id);else if(typeof play==='function')play();};}
 }
 var cards=root.querySelectorAll('.ss-cards .ss-card');
 var names=['Numerical','Scientific Thinking','Vocabulary','Reasoning'];
 cards.forEach(function(card,i){
   if(i>3)return;
   var val=u.skillScores&&typeof u.skillScores[names[i]]==='number'?u.skillScores[names[i]]:0;
   var small=card.querySelector('small');
   if(small)small.textContent=val>0?Math.round(val)+'%':'Not assessed';
   card.style.cursor='pointer';
   card.onclick=function(){if(typeof originalGo==='function')originalGo('learn');};
 });
 var sections=root.querySelectorAll('.ss-section');
 sections.forEach(function(sec){
   var span=sec.querySelector('span');
   var label=sec.querySelector('b');
   if(!span||!label)return;
   var t=(label.textContent||'').trim();
   if(t==='Your Skills'){span.textContent='View all →';span.onclick=function(){originalGo('learn');};}
   if(t==='Next Milestone')span.textContent=(Number(u.xp||0)%500)+'/500 XP';
 });
 var level=root.querySelector('.ss-progress-card');
 if(level){var bs=level.querySelectorAll('b');if(bs[0])bs[0].textContent='Level '+(u.level||1);if(bs[1])bs[1].textContent=(Number(u.xp||0)%500)+'/500 XP';var bar=level.querySelector('.ss-bar i');if(bar)bar.style.width=Math.min(100,(Number(u.xp||0)%500)/5)+'%';}
 if(typeof rank==='function')Promise.resolve(rank()).then(function(r){if(stats[2]){var br=stats[2].querySelector('b');if(br)br.textContent='#'+r;}}).catch(function(){});
}
window.home=function(){var r=originalHome?originalHome():null;Promise.resolve(r).then(function(){setTimeout(render,30);});return r;};
window.go=function(page){if(page==='home')return window.home();return originalGo(page);};
if(document.readyState!=='loading')setTimeout(function(){if(getUser())render();},50);else document.addEventListener('DOMContentLoaded',function(){setTimeout(render,50)});
})();

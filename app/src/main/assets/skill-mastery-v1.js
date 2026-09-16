/* Skill Saga — Skill Mastery v1 */
(function(){
'use strict';
var seen={};
function toast(m){if(typeof window.toast==='function')window.toast(m);}
function cleanName(v){return String(v||'').replace(/\s+/g,' ').trim();}
function masteryData(){
 var src=[];try{if(window.local&&Array.isArray(window.local.content))src=window.local.content;}catch(e){}
 var map={};
 src.forEach(function(q){if(!q)return;var n=cleanName(q.skill||q.category||q.topic||'');if(!n)return;var key=n.toLowerCase();if(!map[key])map[key]={name:n,total:0,correct:0,xp:0};map[key].total++;map[key].correct+=Number(q.correct||0);map[key].xp+=Number(q.xp||0);});
 return Object.keys(map).map(function(k){var x=map[k];return {name:x.name,total:x.total,correct:x.correct,xp:x.xp,accuracy:x.total?Math.round(x.correct/x.total*100):0};});
}
function detail(name){
 window.SKILL_SAGA_SELECTED_SKILL=name;
 var d=masteryData().filter(function(x){return x.name.toLowerCase()===name.toLowerCase();})[0]||{name:name,total:0,correct:0,accuracy:0,xp:0};
 var app=document.querySelector('.app'),main=app&&app.querySelector('.main');if(!main)return;
 main.innerHTML='<div class="ss-final"><button class="back" onclick="window.go(\'profile\')">‹</button><section class="ss-hero"><div class="ss-eyebrow">SKILL MASTERY</div><h1 class="ss-title">'+name+'</h1><div class="ss-sub">Review your progress and identify areas to practise.</div></section><div class="ss-popular"><div class="ss-topic"><div class="i">🎯</div><b>Accuracy</b><small>'+d.accuracy+'%</small></div><div class="ss-topic"><div class="i">📝</div><b>Attempts</b><small>'+d.total+'</small></div><div class="ss-topic"><div class="i">⚡</div><b>XP Earned</b><small>'+d.xp+'</small></div></div><div class="ss-final-note">Keep practising this skill to improve mastery.</div></div>';
}
function normalizeRows(){
 var rows=document.querySelectorAll('.ss-board-row,.ss-topic');seen={};rows.forEach(function(r){var n=cleanName(r.textContent).toLowerCase();if(!n)return;if(seen[n]){r.style.display='none';}else{seen[n]=true;r.style.cursor='pointer';r.setAttribute('role','button');}});
}
function install(){
 if(window.__SS_SKILL_MASTERY_V1)return;window.__SS_SKILL_MASTERY_V1=true;
 document.addEventListener('click',function(e){var r=e.target.closest&&e.target.closest('.ss-board-row,.ss-topic');if(!r)return;var n=cleanName(r.textContent);if(!n)return;if(/accuracy|attempts|xp earned|learn|practice|review/i.test(n)&&r.querySelector('small'))return;e.preventDefault();e.stopPropagation();detail(n);},true);
 setTimeout(normalizeRows,250);setInterval(normalizeRows,1500);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
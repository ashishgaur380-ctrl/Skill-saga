/* Skill Saga — Skills & Other navigation v1 */
(function(){
'use strict';
var SKILLS=['General Knowledge','Digital & Computer Skills','Logical Reasoning','Vocabulary','Mental Maths','World & India','Competitive Exam Basics','Life Skills'];
function esc(v){return String(v||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]});}
function toast(m){if(typeof window.toast==='function')window.toast(m);}
function render(kind){
 var app=document.querySelector('.app'),main=app&&app.querySelector('.main');if(!main)return;
 var title=kind==='skills'?'Skills':'Other Learning',sub=kind==='skills'?'Build reasoning, vocabulary and practical learning skills.':'Explore additional learning categories.';
 main.innerHTML='<div class="ss-final"><button class="back" onclick="window.go(\'learn\')">‹</button><section class="ss-hero"><div class="ss-eyebrow">LEARN</div><h1 class="ss-title">'+title+'</h1><div class="ss-sub">'+sub+'</div></section><div class="ss-popular">'+SKILLS.map(function(x){return '<div class="ss-topic ss-skill-item" data-ss-skill="'+esc(x)+'"><div class="i">✨</div><b>'+esc(x)+'</b><small>Learn • Practice • Progress</small></div>';}).join('')+'</div><div class="ss-final-note">Content can be added through the Admin Quiz Manager and learning-content workflow.</div></div>';
}
function install(){if(window.__SS_SKILLS_OTHER_V1)return;window.__SS_SKILLS_OTHER_V1=true;document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('.ss-tab');if(t){var n=(t.textContent||'').replace(/\s+/g,' ').trim().toLowerCase();if(n.indexOf('skills')===0||n.indexOf('other')===0){e.preventDefault();e.stopPropagation();render(n.indexOf('skills')===0?'skills':'other');return;}}var s=e.target.closest&&e.target.closest('[data-ss-skill]');if(s){e.preventDefault();var n=s.getAttribute('data-ss-skill');window.SKILL_SAGA_SELECTED_SKILL=n;try{localStorage.setItem('SKILL_SAGA_SELECTED_SKILL',n);}catch(x){}toast(n+' selected. Choose a practice quiz when available.');}} ,true);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
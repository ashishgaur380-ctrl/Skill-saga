/* Skill Saga — Learn hierarchy navigation v1
 * Class -> Subject -> Chapter -> Topic -> Learning Material
 * Additive layer; preserves existing quiz/admin engine.
 */
(function(){
'use strict';
var KEY='SKILL_SAGA_SELECTED_CLASS';
var DATA={
  Academic:{
    '1':['English','Hindi','Mathematics','EVS','General Knowledge'],
    '2':['English','Hindi','Mathematics','EVS','General Knowledge'],
    '3':['English','Hindi','Mathematics','EVS','Science','Social Studies','GK'],
    '4':['English','Hindi','Mathematics','EVS','Science','Social Studies','GK'],
    '5':['English','Hindi','Mathematics','EVS','Science','Social Studies','GK'],
    '6':['English','Hindi','Mathematics','Science','Social Science','Computer','GK'],
    '7':['English','Hindi','Mathematics','Science','Social Science','Computer','GK'],
    '8':['English','Hindi','Mathematics','Science','Social Science','Computer','GK'],
    '9':['English','Hindi','Mathematics','Science','Social Science','Computer/IT','GK'],
    '10':['English','Hindi','Mathematics','Science','Social Science','Computer/IT','GK'],
    '11':['English','Physics','Chemistry','Mathematics','Biology/Computer Science','Accountancy','Business Studies','Economics','History','Political Science','Geography','Sociology/Psychology','GK'],
    '12':['English','Physics','Chemistry','Mathematics','Biology/Computer Science','Accountancy','Business Studies','Economics','History','Political Science','Geography','Sociology/Psychology','GK']
  }
};
var SKILLS=['General Knowledge','Digital & Computer Skills','Logical Reasoning','Vocabulary','Mental Maths','World & India','Competitive Exam Basics','Life Skills'];
function toast(m){if(typeof window.toast==='function')window.toast(m);}
function esc(v){return String(v||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]});}
function cls(){var n=Number(window.SKILL_SAGA_SELECTED_CLASS||localStorage.getItem(KEY)||0);return n>=1&&n<=12?n:8;}
function openMaterial(subject,topic){
  window.SKILL_SAGA_LEARN_CONTEXT={classLevel:cls(),subject:subject,topic:topic};
  var q={topic:topic,subject:subject,classLevel:String(cls())};
  if(typeof window.ssPlayAction==='function')window.ssPlayAction('topic');
  else toast(topic+' selected. Practice is ready.');
}
function renderTopics(subject){
  var c=document.querySelector('.app');if(!c)return;
  var topics=['Introduction','Key Concepts','Worked Examples','Practice'];
  var html='<div class="ss-final"><button class="back" onclick="window.go(\'learn\')">‹</button><section class="ss-hero"><div class="ss-eyebrow">LEARN • CLASS '+cls()+'</div><h1 class="ss-title">'+esc(subject)+'</h1><div class="ss-sub">Choose a topic to learn, review and practise.</div></section><div class="ss-section"><b>Topics</b><span>Class '+cls()+'</span></div><div class="ss-popular">'+topics.map(function(t){return '<div class="ss-topic" data-ss-learn-topic="'+esc(t)+'"><div class="i">📘</div><b>'+esc(t)+'</b><small>Learn • Practice • Review</small></div>';}).join('')+'</div><div class="ss-final-note">Each topic can grow into learning material, practice questions and review.</div></div>';
  var main=c.querySelector('.main');if(main)main.innerHTML=html;
}
function install(){
 if(window.__SS_LEARN_HIERARCHY_V1)return;window.__SS_LEARN_HIERARCHY_V1=true;
 document.addEventListener('click',function(e){
  var el=e.target.closest&&e.target.closest('[data-ss-learn-topic]');
  if(el){e.preventDefault();openMaterial(window.SKILL_SAGA_LEARN_CONTEXT&&window.SKILL_SAGA_LEARN_CONTEXT.subject||'Learning',el.getAttribute('data-ss-learn-topic'));return;}
  var sub=e.target.closest&&e.target.closest('.ss-subject');
  if(sub){e.preventDefault();var name=(sub.textContent||'').replace(/\s+/g,' ').trim();window.SKILL_SAGA_LEARN_CONTEXT={classLevel:cls(),subject:name};renderTopics(name);return;}
 });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
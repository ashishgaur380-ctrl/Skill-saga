/* Skill Saga — final UI tap-target bridge */
(function(){
'use strict';
function install(){
  var root=document;
  root.addEventListener('click',function(e){
    var el=e.target.closest('.ss-section span, .ss-tab, .ss-subject, .ss-topic, .ss-comp, .ss-event, .ss-board-row, .ss-card');
    if(!el)return;
    if(el.closest('.nav')||el.querySelector('button')&&e.target.closest('button'))return;
    var text=(el.textContent||'').trim().toLowerCase();
    if(el.classList.contains('ss-tab')){
      var name=(el.querySelector('b')||{}).textContent||'';
      if(name==='Skills'&&typeof window.ssLearnSkills==='function'){window.ssLearnSkills();return;}
      if(name==='Academic'&&typeof window.go==='function'){window.go('learn');return;}
      if(name==='Other'&&typeof window.toast==='function'){window.toast('Other learning content is coming next.');return;}
    }
    if(el.classList.contains('ss-section'))return;
    if(el.classList.contains('ss-section')===false && text.indexOf('view all')>=0){return;}
    if(el.classList.contains('ss-subject')||el.classList.contains('ss-topic')){
      if(typeof window.toast==='function')window.toast('This learning section is ready for content integration.');
      return;
    }
    if(el.classList.contains('ss-comp')){
      if(typeof window.go==='function')window.go('compete');return;
    }
    if(el.classList.contains('ss-event')){
      if(typeof window.toast==='function')window.toast('Competition registration will be connected in the competition integration step.');return;
    }
    if(el.classList.contains('ss-board-row')){
      if(typeof window.toast==='function')window.toast('Leaderboard details will open here.');return;
    }
    if(el.classList.contains('ss-card')){
      if(typeof window.go==='function'&&text.indexOf('skills')>=0){window.go('learn');return;}
      if(typeof window.toast==='function')window.toast('This section is ready for the next integration step.');
    }
  },true);
  root.querySelectorAll('.ss-section span').forEach(function(span){
    span.style.cursor='pointer';
    span.style.pointerEvents='auto';
    if(!span.getAttribute('role'))span.setAttribute('role','button');
  });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();

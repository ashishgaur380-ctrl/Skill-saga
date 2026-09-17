/* Skill Saga — final UI tap-target bridge
 * Non-blocking: only supplies fallbacks when a real action is not already attached.
 */
(function(){
'use strict';
function toast(m){if(typeof window.toast==='function')window.toast(m)}
function install(){
  document.addEventListener('click',function(e){
    var target=e.target;
    var span=target.closest&&target.closest('.ss-section span');
    if(span){
      if(span.closest('button,a,[onclick]'))return;
      var t=(span.textContent||'').trim().toLowerCase();
      if(t.indexOf('view all')>=0){
        var section=span.closest('.ss-section');
        var action=section&&section.parentElement&&section.parentElement.querySelector('button[onclick],a[href]');
        if(action){action.click();return;}
        toast('More content will open here.');
        return;
      }
      if(t.indexOf('change class')>=0||t.indexOf('choose')>=0||t.indexOf('select')>=0){toast('Choose an option below to continue.');return;}
    }
    var tab=target.closest&&target.closest('.ss-tab');
    if(tab){
      if(tab.querySelector('button,a,[onclick]'))return;
      var name=((tab.querySelector('b')||{}).textContent||'').trim();
      if(name==='Skills'&&typeof window.ssLearnSkills==='function'){window.ssLearnSkills();return;}
      if(name==='Academic'&&typeof window.go==='function'){window.go('learn');return;}
      if(name==='Other'){toast('Other learning content will be available here.');return;}
    }
    var subject=target.closest&&target.closest('.ss-subject,.ss-topic');
    if(subject&&subject.querySelector&&subject.querySelector('button,a,[onclick]'))return;
    var comp=target.closest&&target.closest('.ss-comp');
    if(comp&&comp.querySelector&&comp.querySelector('button,a,[onclick]'))return;
    if(comp&&typeof window.go==='function'){window.go('compete');return;}
    var event=target.closest&&target.closest('.ss-event');
    if(event&&event.querySelector&&event.querySelector('button,a,[onclick]'))return;
    var board=target.closest&&target.closest('.ss-board-row');
    if(board&&board.querySelector&&board.querySelector('button,a,[onclick]'))return;
  },false);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();

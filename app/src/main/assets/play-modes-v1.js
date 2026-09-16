/* Skill Saga — Play modes v1 */
(function(){
'use strict';
function toast(m){if(typeof window.toast==='function')window.toast(m);}
function launch(mode){
 window.SKILL_SAGA_PLAY_MODE=mode;
 if(typeof window.ssPlayAction==='function'){window.ssPlayAction(mode);return;}
 var fn={daily:'startDailyChallenge',quick:'startQuickPractice',topic:'topicPractice',mixed:'startMixedQuiz'}[mode];
 if(fn&&typeof window[fn]==='function'){try{window[fn]();return;}catch(e){console.warn(e);}}
 toast('No published quiz is available for this mode yet.');
}
function install(){
 if(window.__SS_PLAY_MODES_V1)return;window.__SS_PLAY_MODES_V1=true;
 document.addEventListener('click',function(e){
  var el=e.target.closest&&e.target.closest('.ss-mode,.ss-action');if(!el)return;
  var t=(el.textContent||'').replace(/\s+/g,' ').trim().toLowerCase();
  var mode=t.indexOf('daily quiz')>=0||t.indexOf('start challenge')>=0?'daily':t.indexOf('quick practice')>=0?'quick':t.indexOf('topic practice')>=0?'topic':t.indexOf('mixed quiz')>=0?'mixed':'';
  if(!mode)return;
  e.preventDefault();e.stopPropagation();launch(mode);
 },true);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
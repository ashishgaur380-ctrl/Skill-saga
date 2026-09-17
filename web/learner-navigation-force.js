/* Skill Saga — stable learner navigation router
 * Prevents the legacy Final UI renderer from flashing/replacing the approved
 * learner screens after navigation. Loaded last, after all learner flows.
 */
(function(){
'use strict';
var previousGo=window.go;
function mount(){
  if(typeof window.shell==='function') window.shell('<div class="ss-final"></div>');
  else {
    var host=document.querySelector('.ss-final');
    if(host) host.innerHTML='';
  }
}
function route(screen){
  var n=String(screen||'').toLowerCase();
  if(n==='home'){
    mount();
    if(window.ssHomeForce&&typeof window.ssHomeForce.render==='function') return window.ssHomeForce.render();
    if(typeof window.home==='function') return window.home();
  }
  if(n==='learn'||n==='skills'){
    mount();
    if(typeof window.ssLearnClasses==='function') return window.ssLearnClasses();
    if(window.ssLearnForce&&typeof window.ssLearnForce.start==='function') return window.ssLearnForce.start();
  }
  if(n==='play'){
    mount();
    if(window.ssLearnerPlay&&typeof window.ssLearnerPlay.render==='function') return window.ssLearnerPlay.render();
  }
  if(n==='compete'){
    mount();
    if(window.ssCompeteUI&&typeof window.ssCompeteUI.render==='function') return window.ssCompeteUI.render();
    if(window.ssLearnerCompete&&typeof window.ssLearnerCompete.render==='function') return window.ssLearnerCompete.render();
  }
  if(n==='profile'){
    mount();
    if(window.ssLearnerProfile&&typeof window.ssLearnerProfile.render==='function') return window.ssLearnerProfile.render();
  }
  if(n==='progress'){
    mount();
    if(window.ssLearnerProgress&&typeof window.ssLearnerProgress.render==='function') return window.ssLearnerProgress.render();
  }
  if(n==='rewards'){
    mount();
    if(window.ssLearnerRewards&&typeof window.ssLearnerRewards.render==='function') return window.ssLearnerRewards.render();
  }
  if(n==='history'||n==='quizhistory'||n==='quiz-history'){
    mount();
    if(window.ssLearnerQuizHistory&&typeof window.ssLearnerQuizHistory.render==='function') return window.ssLearnerQuizHistory.render();
  }
  if(n==='notifications'||n==='notification'){
    mount();
    if(window.ssLearnerNotifications&&typeof window.ssLearnerNotifications.render==='function') return window.ssLearnerNotifications.render();
  }
  if(typeof previousGo==='function') return previousGo.apply(this,arguments);
}
window.go=function(screen){
  window.screen=screen;
  return route(screen);
};
window.ssStableLearnerNav={route:route,mount:mount};
})();

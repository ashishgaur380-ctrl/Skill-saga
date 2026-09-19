/* Skill Saga — single learner navigation controller
 * Routes learner screens directly to the current renderers so legacy final-ui
 * routing cannot recreate the bottom navigation or flash an older screen.
 */
(function(){
'use strict';
var previousGo=window.go;
var screens={home:1,learn:1,skills:1,play:1,compete:1,profile:1,progress:1,rewards:1,history:1,notifications:1};
function mount(){
  if(typeof window.shell==='function') window.shell('<div class="ss-final"></div>');
  var host=document.querySelector('.ss-final');
  if(!host) return false;
  return true;
}
function home(){
  if(window.ssHomeForce&&typeof window.ssHomeForce.render==='function') return window.ssHomeForce.render();
  if(window.ssHomeUI&&typeof window.ssHomeUI.render==='function') return window.ssHomeUI.render();
  if(typeof previousGo==='function') return previousGo('home');
}
function learn(){
  if(typeof window.ssLearnClasses==='function') return window.ssLearnClasses();
  if(window.ssLearn&&typeof window.ssLearn.render==='function') return window.ssLearn.render();
  if(typeof previousGo==='function') return previousGo('learn');
}
function play(){
  if(window.ssLearnerPlay&&typeof window.ssLearnerPlay.render==='function') return window.ssLearnerPlay.render();
  if(typeof previousGo==='function') return previousGo('play');
}
function compete(){
  if(window.ssCompeteUI&&typeof window.ssCompeteUI.render==='function') return window.ssCompeteUI.render();
  if(typeof previousGo==='function') return previousGo('compete');
}
function profile(){
  if(window.ssLearnerProfile&&typeof window.ssLearnerProfile.render==='function'){
    if(mount()) return window.ssLearnerProfile.render();
  }
  if(typeof previousGo==='function') return previousGo('profile');
}
function renderNamed(name){
  if(name==='home') return home();
  if(name==='learn'||name==='skills') return learn();
  if(name==='play') return play();
  if(name==='compete') return compete();
  if(name==='profile') return profile();
  if(name==='progress'&&window.ssLearnerProgress&&typeof window.ssLearnerProgress.render==='function') return mount()&&window.ssLearnerProgress.render();
  if(name==='rewards'&&window.ssLearnerRewards&&typeof window.ssLearnerRewards.render==='function') return mount()&&window.ssLearnerRewards.render();
  if(name==='history'&&window.ssLearnerQuizHistory&&typeof window.ssLearnerQuizHistory.render==='function') return mount()&&window.ssLearnerQuizHistory.render();
  if(name==='notifications'&&window.ssLearnerNotifications&&typeof window.ssLearnerNotifications.render==='function') return mount()&&window.ssLearnerNotifications.render();
  if(typeof previousGo==='function') return previousGo(name);
}
window.go=function(name){
  name=String(name||'').toLowerCase();
  if(screens[name]) return renderNamed(name);
  return typeof previousGo==='function'?previousGo.apply(this,arguments):undefined;
};
window.ssStableLearnerNav={render:renderNamed};
})();

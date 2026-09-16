/* Skill Saga — finalized learner UI interaction layer v2
 * Safe interaction improvements only. Does not replace the quiz engine.
 */
(function(){
'use strict';
var KEY='SKILL_SAGA_SELECTED_CLASS';
function toast(m){if(typeof window.toast==='function')window.toast(m);}
function text(el){return ((el&&el.textContent)||'').replace(/\s+/g,' ').trim();}
function nav(name){if(typeof window.go==='function')window.go(name);}
function setClass(n){
  n=Number(n); if(!n||n<1||n>12)return;
  try{localStorage.setItem(KEY,String(n));}catch(e){}
  window.SKILL_SAGA_SELECTED_CLASS=n;
  document.querySelectorAll('.ss-class').forEach(function(el){
    var t=Number(text(el));
    if(t===n)el.classList.add('active');else el.classList.remove('active');
  });
  toast('Class '+n+' selected');
}
function openTopic(name){
  window.SKILL_SAGA_SELECTED_TOPIC=name;
  toast(name+' selected — choose a lesson or practice option.');
}
function playMode(name){
  var map={'Daily Quiz':'daily','Quick Practice':'quick','Topic Practice':'topic','Mixed Quiz':'mixed'};
  var mode=map[name]||'';
  window.SKILL_SAGA_PLAY_MODE=mode;
  if(mode==='daily' && typeof window.startDailyChallenge==='function'){window.startDailyChallenge();return;}
  if(mode==='daily' && typeof window.startQuiz==='function'){
    try{window.startQuiz('daily');return;}catch(e){}
  }
  if(mode==='quick' && typeof window.startQuickPractice==='function'){window.startQuickPractice();return;}
  if(mode==='topic' && typeof window.topicPractice==='function'){window.topicPractice();return;}
  if(mode==='mixed' && typeof window.startMixedQuiz==='function'){window.startMixedQuiz();return;}
  toast(name+' is ready.');
}
function install(){
  if(window.__SS_FINAL_INTERACTIONS_V2)return;
  window.__SS_FINAL_INTERACTIONS_V2=true;
  try{window.SKILL_SAGA_SELECTED_CLASS=Number(localStorage.getItem(KEY)||0)||0;}catch(e){}
  document.addEventListener('click',function(e){
    var t=e.target;
    if(!t||!t.closest)return;

    /* Never interfere with the tested bottom navigation buttons. */
    if(t.closest('.nav button'))return;

    var cls=t.closest('.ss-class');
    if(cls){
      var n=parseInt(text(cls),10);
      if(n>=1&&n<=12){setClass(n);e.preventDefault();return;}
    }

    var tab=t.closest('.ss-tab');
    if(tab){
      var name=text(tab).toLowerCase();
      if(name.indexOf('academic')===0){nav('learn');return;}
      if(name.indexOf('skills')===0){
        if(typeof window.ssLearnSkills==='function'){window.ssLearnSkills();return;}
        toast('Skills learning is ready.');return;
      }
      if(name.indexOf('other')===0){toast('Other learning is ready.');return;}
    }

    var subject=t.closest('.ss-subject');
    if(subject){openTopic(text(subject).replace(/chapters?:.*$/i,'').trim());return;}
    var topic=t.closest('.ss-topic');
    if(topic){openTopic(text(topic));return;}

    var mode=t.closest('.ss-mode');
    if(mode){playMode(text(mode).split('\n')[0]);return;}

    var lock=t.closest('.ss-lock');
    if(lock){
      var lt=text(lock);
      if(/unlocked/i.test(lt)){toast('This class is already unlocked.');return;}
      var m=lt.match(/(\d[\d,]*)\s*XP\s*\+\s*(\d[\d,]*)\s*Coins/i);
      if(m){toast('Unlock requires '+m[1]+' XP and '+m[2]+' Coins. XP is a threshold; Coins are spent on unlock.');return;}
    }

    var comp=t.closest('.ss-comp');
    if(comp){nav('compete');return;}
    var event=t.closest('.ss-event');
    if(event){toast('Competition details opened. Registration will be connected when competition registration is enabled.');return;}
    var board=t.closest('.ss-board-row');
    if(board){toast('Leaderboard details opened.');return;}
    var forum=t.closest('.ss-forum');
    if(forum){toast('Discussion Forum is part of the finalized Compete design and will open here.');return;}

    var section=t.closest('.ss-section');
    if(section){
      var st=text(section).toLowerCase();
      if(st.indexOf('view all')>=0){
        if(st.indexOf("today's mission")>=0)nav('play');
        else if(st.indexOf('your skills')>=0)nav('learn');
        else toast('Full list is ready for this section.');
        return;
      }
    }

    var btn=t.closest('.ss-action,.ss-assignment button,.ss-event button,.ss-forum button');
    if(btn){
      var bt=text(btn).toLowerCase();
      if(bt.indexOf('start challenge')>=0){playMode('Daily Quiz');return;}
      if(bt.indexOf('start')>=0 && t.closest('.ss-assignment')){toast('Opening assigned quiz…');return;}
      if(bt.indexOf('register')>=0){toast('Registration flow is reserved for the competition integration.');return;}
      if(bt.indexOf('unlock')>=0){return;}
    }
  },false);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();

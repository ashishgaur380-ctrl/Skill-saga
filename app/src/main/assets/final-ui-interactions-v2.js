/* Skill Saga — finalized learner UI interaction layer v2
 * Safe interaction improvements only. Does not replace the quiz engine.
 * Makes the finalized learner screens actionable without replacing tested flows.
 */
(function(){
'use strict';
var KEY='SKILL_SAGA_SELECTED_CLASS';
function toast(m){if(typeof window.toast==='function')window.toast(m);}
function text(el){return ((el&&el.textContent)||'').replace(/\s+/g,' ').trim();}
function nav(name){if(typeof window.go==='function')window.go(name);}
function setClass(n){
  n=Number(n);if(!n||n<1||n>12)return;
  try{localStorage.setItem(KEY,String(n));}catch(e){}
  window.SKILL_SAGA_SELECTED_CLASS=n;
  document.querySelectorAll('.ss-class').forEach(function(el){
    var t=Number((text(el).match(/\b(\d{1,2})\b/)||[])[1]||0);
    el.classList.toggle('active',t===n);
  });
  toast('Class '+n+' selected');
}
function selectedClass(){
  var n=Number(window.SKILL_SAGA_SELECTED_CLASS||0);
  if(n>=1&&n<=12)return n;
  try{n=Number(localStorage.getItem(KEY)||0);}catch(e){}
  return n>=1&&n<=12?n:0;
}
function openTopic(name){
  window.SKILL_SAGA_SELECTED_TOPIC=name;
  try{localStorage.setItem('SKILL_SAGA_SELECTED_TOPIC',name);}catch(e){}
  if(typeof window.ssPlayAction==='function'){
    toast(name+' selected. Opening related practice…');
    window.ssPlayAction('topic');
  }else toast(name+' selected — choose a lesson or practice option.');
}
function playMode(raw){
  var s=String(raw||'').replace(/\s+/g,' ').trim(),low=s.toLowerCase();
  var mode=low.indexOf('daily quiz')>=0?'daily':low.indexOf('quick practice')>=0?'quick':low.indexOf('topic practice')>=0?'topic':low.indexOf('mixed quiz')>=0?'mixed':'';
  window.SKILL_SAGA_PLAY_MODE=mode;
  if(mode&&typeof window.ssPlayAction==='function'){window.ssPlayAction(mode);return;}
  if(mode==='daily'&&typeof window.startDailyChallenge==='function'){window.startDailyChallenge();return;}
  if(mode==='daily'&&typeof window.startQuiz==='function'){try{window.startQuiz('daily');return;}catch(e){}}
  if(mode==='quick'&&typeof window.startQuickPractice==='function'){window.startQuickPractice();return;}
  if(mode==='topic'&&typeof window.topicPractice==='function'){window.topicPractice();return;}
  if(mode==='mixed'&&typeof window.startMixedQuiz==='function'){window.startMixedQuiz();return;}
  toast((mode==='daily'?'Daily Quiz':mode==='quick'?'Quick Practice':mode==='topic'?'Topic Practice':mode==='mixed'?'Mixed Quiz':s)+' is ready.');
}
async function registerCompetition(event){
  var title=text(event&&event.querySelector('.ss-event-main b'))||text(event).replace(/register/ig,'').trim();
  var u=null;try{u=typeof window.user==='function'?window.user():null;}catch(e){}
  if(!u||!u.uid){toast('Please log in to register for a competition.');return;}
  if(!(window.firebase&&firebase.firestore)){toast('Competition service is not available.');return;}
  try{
    var q=await firebase.firestore().collection('competitions').where('title','==',title).limit(1).get();
    if(q.empty){toast('Competition details are not available yet.');return;}
    var ref=q.docs[0].ref,d=q.docs[0].data()||{},participants=Array.isArray(d.participants)?d.participants.slice():[];
    if(participants.indexOf(u.uid)<0)participants.push(u.uid);
    var update={participants:participants,participantCount:participants.length};
    await ref.set(update,{merge:true});
    toast(participants.indexOf(u.uid)>=0?'Registration confirmed.':'Already registered.');
  }catch(e){console.warn('Competition registration failed',e);toast('Registration could not be completed yet.');}
}
function normalizeNav(){
  var navEl=document.querySelector('.nav');if(!navEl)return false;
  var wanted=[['home','⌂','Home'],['learn','▣','Learn'],['play','▶','Play'],['compete','🏆','Compete'],['profile','●','Profile']];
  var current=Array.prototype.slice.call(navEl.querySelectorAll(':scope > button')),same=current.length===wanted.length;
  if(same)wanted.forEach(function(item,i){var b=current[i];if(!b||b.getAttribute('data-s')!==item[0]||text(b.querySelector('span'))!==item[2])same=false;});
  if(same)return false;
  var map={};current.forEach(function(b){var key=b.getAttribute('data-s');if(key)map[key]=b;});
  var frag=document.createDocumentFragment();
  wanted.forEach(function(item){var b=map[item[0]]||document.createElement('button');b.setAttribute('data-s',item[0]);b.innerHTML=item[1]+'<span>'+item[2]+'</span>';b.onclick=function(){nav(item[0]);};frag.appendChild(b);});
  navEl.innerHTML='';navEl.appendChild(frag);return true;
}
function install(){
  if(window.__SS_FINAL_INTERACTIONS_V2)return;window.__SS_FINAL_INTERACTIONS_V2=true;
  try{window.SKILL_SAGA_SELECTED_CLASS=Number(localStorage.getItem(KEY)||0)||0;}catch(e){}
  normalizeNav();
  var app=document.querySelector('.app')||document.body;
  if(window.MutationObserver){new MutationObserver(function(){normalizeNav();}).observe(app,{childList:true,subtree:true});}
  document.addEventListener('click',function(e){
    var t=e.target;if(!t||!t.closest)return;
    if(t.closest('.nav button'))return;
    var cls=t.closest('.ss-class');
    if(cls){var n=parseInt((text(cls).match(/\b(\d{1,2})\b/)||[])[1]||0,10);if(n>=1&&n<=12){e.preventDefault();e.stopPropagation();setClass(n);return;}}
    var tab=t.closest('.ss-tab');
    if(tab){var name=text(tab).toLowerCase();if(name.indexOf('academic')===0){e.preventDefault();nav('learn');return;}if(name.indexOf('skills')===0){e.preventDefault();if(typeof window.ssLearnSkills==='function'){window.ssLearnSkills();return;}toast('Skills learning is ready.');return;}if(name.indexOf('other')===0){e.preventDefault();toast('Other learning is ready.');return;}}
    var subject=t.closest('.ss-subject');
    if(subject){e.preventDefault();openTopic(text(subject).replace(/chapters?:.*$/i,'').trim());return;}
    var topic=t.closest('.ss-topic');
    if(topic){e.preventDefault();openTopic(text(topic));return;}
    var mode=t.closest('.ss-mode');
    if(mode){e.preventDefault();e.stopPropagation();playMode(text(mode));return;}
    var lock=t.closest('.ss-lock');
    if(lock){e.preventDefault();e.stopPropagation();var lt=text(lock);if(/unlocked/i.test(lt)){toast('This class is already unlocked.');return;}var cardText=text(lock.closest('.ss-class')||lock),cm=cardText.match(/\b(\d{1,2})\b/),targetClass=cm?Number(cm[1]):0,currentClass=selectedClass(),diff=(targetClass&&currentClass)?Math.abs(targetClass-currentClass):0,req=diff===1?[500,50]:diff===2?[1000,100]:diff===3?[2000,200]:null;if(req){toast('Unlock requires '+req[0]+' XP and '+req[1]+' Coins. XP is a threshold; Coins are spent on unlock.');return;}var m=lt.match(/(\d[\d,]*)\s*XP\s*\+\s*(\d[\d,]*)\s*Coins/i);if(m){toast('Unlock requires '+m[1]+' XP and '+m[2]+' Coins. XP is a threshold; Coins are spent on unlock.');return;}toast('This class is locked. Unlock it to continue.');return;}
    var comp=t.closest('.ss-comp');if(comp){e.preventDefault();nav('compete');return;}
    var event=t.closest('.ss-event');if(event){e.preventDefault();var b=t.closest('button');if(b&&/register/i.test(text(b))){registerCompetition(event);return;}toast('Competition details opened.');return;}
    var board=t.closest('.ss-board-row');if(board){e.preventDefault();toast('Leaderboard details opened.');return;}
    var forum=t.closest('.ss-forum');if(forum){e.preventDefault();toast('Discussion Forum is currently disabled until moderation and child-safety controls are enabled.');return;}
    var section=t.closest('.ss-section');if(section){var st=text(section).toLowerCase();if(st.indexOf('view all')>=0){e.preventDefault();if(st.indexOf("today's mission")>=0)nav('play');else if(st.indexOf('your skills')>=0)nav('learn');else toast('Full list is ready for this section.');return;}}
    var btn=t.closest('.ss-action,.ss-assignment button,.ss-event button,.ss-forum button');
    if(btn){var bt=text(btn).toLowerCase();if(bt.indexOf('start challenge')>=0){e.preventDefault();e.stopPropagation();playMode('Daily Quiz');return;}if(bt.indexOf('start')>=0&&t.closest('.ss-assignment')){e.preventDefault();e.stopPropagation();var a=t.closest('.ss-assignment'),id=a&&a.getAttribute('data-assignment-id');if(id&&typeof window.ssOpenAssignedQuiz==='function')window.ssOpenAssignedQuiz(id);else toast('Assigned quiz is not available yet.');return;}if(bt.indexOf('register')>=0){e.preventDefault();e.stopPropagation();registerCompetition(t.closest('.ss-event'));return;}}
  },true);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();

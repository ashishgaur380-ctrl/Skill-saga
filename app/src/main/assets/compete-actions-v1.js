/* Skill Saga — Compete actions v1 */
(function(){
'use strict';
function toast(m){if(typeof window.toast==='function')window.toast(m);}
async function register(el){
 var event=el&&el.closest('.ss-event');if(!event)return;
 var title=((event.querySelector('.ss-event-main b')||event).textContent||'').replace(/\s+/g,' ').trim();
 var u=null;try{u=typeof window.user==='function'?window.user():null;}catch(e){}
 if(!u||!u.uid){toast('Please log in to register.');return;}
 if(!(window.firebase&&firebase.firestore)){toast('Competition service is not available yet.');return;}
 try{var q=await firebase.firestore().collection('competitions').where('title','==',title).limit(1).get();if(q.empty){toast('Competition details are not available yet.');return;}var d=q.docs[0].data()||{},p=Array.isArray(d.participants)?d.participants.slice():[];if(p.indexOf(u.uid)<0)p.push(u.uid);await q.docs[0].ref.set({participants:p,participantCount:p.length},{merge:true});toast('Registration confirmed.');}catch(e){console.warn(e);toast('Registration could not be completed yet.');}
}
function install(){
 if(window.__SS_COMPETE_ACTIONS_V1)return;window.__SS_COMPETE_ACTIONS_V1=true;
 document.addEventListener('click',function(e){
  var b=e.target.closest&&e.target.closest('.ss-event button');if(b&&/register/i.test(b.textContent||'')){e.preventDefault();e.stopPropagation();register(b);return;}
  var row=e.target.closest&&e.target.closest('.ss-board-row');if(row){e.preventDefault();e.stopPropagation();var rank=row.querySelector('b');toast('Leaderboard entry '+((rank&&rank.textContent)||'')+' selected.');}
  var comp=e.target.closest&&e.target.closest('.ss-comp');if(comp){e.preventDefault();e.stopPropagation();if(typeof window.go==='function')window.go('compete');}
 },true);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
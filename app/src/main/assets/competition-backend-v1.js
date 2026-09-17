/* Skill Saga — Competition backend integration v1
 * Persists learner registration and reads published competition results.
 * Scoring/results remain admin/server controlled; this layer never writes scores.
 */
(function(){
'use strict';
function toast(m){if(typeof window.toast==='function')window.toast(m)}
function db(){return window.firebase&&firebase.firestore?firebase.firestore():null}
function currentUser(){try{return typeof window.user==='function'?window.user():null}catch(e){return null}}
function userData(u){u=u||{};return {uid:u.uid||'',studentClass:u.studentClass||u.classNumber||'',stream:u.stream||'',displayName:u.displayName||u.firstName||'Learner'}}
async function findCompetition(card){
 var title=((card&&card.querySelector('b,h3,h4,.title'))||card);title=((title&&title.textContent)||'').replace(/\s+/g,' ').trim();
 var d=db();if(!d||!title)return null;
 var q=await d.collection('competitions').where('title','==',title).limit(1).get();
 return q.empty?null:{id:q.docs[0].id,data:q.docs[0].data()||{},ref:q.docs[0].ref};
}
async function register(card){
 var u=currentUser();if(!u||!u.uid){toast('Please log in to register.');return}
 var d=db();if(!d){toast('Competition service is not available yet.');return}
 try{
  var found=await findCompetition(card);if(!found){toast('Competition details are not available yet.');return}
  var c=found.data||{}, rule=window.SkillSagaCompetition&&window.SkillSagaCompetition.registration?window.SkillSagaCompetition.registration(c,u):{allowed:true};
  if(!rule.allowed){var msg={login_required:'Please log in to register.',class_not_eligible:'This competition is not open for your class.',stream_not_eligible:'This competition is not open for your stream.',scheduled:'Registration opens when the competition starts.',ended:'This competition has ended.',draft:'This competition is not published yet.',registration_closed:'Registration is closed.'}[rule.reason]||'You are not eligible to register.';toast(msg);return}
  var data=userData(u), ref=d.collection('competitionRegistrations').doc(found.id+'_'+u.uid);
  await ref.set({competitionId:found.id,competitionTitle:String(c.title||''),uid:u.uid,studentClass:String(data.studentClass||''),stream:String(data.stream||''),displayName:String(data.displayName||'Learner').slice(0,30),status:'registered',registeredAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});
  var btn=card&&card.querySelector('button');if(btn){btn.textContent='Registered ✓';btn.disabled=true}
  toast('Registration confirmed.');
 }catch(e){console.warn('Competition registration',e);toast('Registration could not be completed yet.');}
}
async function loadResults(competitionId){
 var d=db();if(!d||!competitionId)return [];
 var snap=await d.collection('competitionResults').where('competitionId','==',competitionId).get();
 return snap.docs.map(function(x){return Object.assign({id:x.id},x.data()||{})});
}
window.SkillSagaCompetitionBackend={register:register,findCompetition:findCompetition,loadResults:loadResults};
function install(){if(window.__SS_COMPETITION_BACKEND_V1)return;window.__SS_COMPETITION_BACKEND_V1=true;document.addEventListener('click',function(e){var b=e.target&&e.target.closest?e.target.closest('.ss-event button'):null;if(b&&/register/i.test(b.textContent||'')){e.preventDefault();e.stopImmediatePropagation();register(b.closest('.ss-event'));}},true)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();

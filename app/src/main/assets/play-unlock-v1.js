/* Skill Saga — Play class unlock v1
 * Final rules: current class free; +/-1 = 500 XP + 50 Coins;
 * +/-2 = 1000 XP + 100 Coins; +/-3 = 2000 XP + 200 Coins.
 * XP is a threshold. Coins are spent only when an unlock is actually granted.
 */
(function(){
'use strict';
var RULES=Object.freeze({1:{xp:500,coins:50},2:{xp:1000,coins:100},3:{xp:2000,coins:200}});
function toast(m){if(typeof window.toast==='function')window.toast(m);}
function num(v){var n=Number(v);return isFinite(n)?n:0;}
function classFromUser(){
  var u=typeof window.user==='function'?window.user():null;
  var n=u&&(u.studentClass||u.gradeLevel||u.classLevel);
  if(!n){try{n=localStorage.getItem('SKILL_SAGA_SELECTED_CLASS');}catch(e){}}
  var m=String(n||'').match(/\d{1,2}/);
  return m?Math.min(12,Math.max(1,Number(m[0]))):0;
}
function stats(){
  var u=typeof window.user==='function'?window.user():null;
  return {xp:num(u&&(u.xp!=null?u.xp:u.totalXp)),coins:num(u&&(u.coins!=null?u.coins:u.coinBalance))};
}
function rule(current,target){
  if(!current||!target||target===current)return {xp:0,coins:0,free:true};
  var d=Math.abs(target-current),r=RULES[d];
  return r?{xp:r.xp,coins:r.coins,free:false}:{xp:null,coins:null,free:false,unsupported:true};
}
window.SKILL_SAGA_PLAY_UNLOCK={rules:RULES,rule:rule,canUnlock:function(target){
  target=num(target);var current=classFromUser(),r=rule(current,target),s=stats();
  if(r.free)return {ok:true,free:true,currentClass:current,targetClass:target};
  if(r.unsupported)return {ok:false,reason:'unsupported',currentClass:current,targetClass:target};
  if(s.xp<r.xp)return {ok:false,reason:'xp',requiredXp:r.xp,currentXp:s.xp,requiredCoins:r.coins,currentCoins:s.coins};
  if(s.coins<r.coins)return {ok:false,reason:'coins',requiredXp:r.xp,currentXp:s.xp,requiredCoins:r.coins,currentCoins:s.coins};
  return {ok:true,currentClass:current,targetClass:target,requiredXp:r.xp,requiredCoins:r.coins};
}};
function cardTarget(el){var m=text(el).match(/\b(\d{1,2})\b/);return m?Number(m[1]):0;}
function text(el){return((el&&el.textContent)||'').replace(/\s+/g,' ').trim();}
function install(){
 if(window.__SS_PLAY_UNLOCK_V1)return;window.__SS_PLAY_UNLOCK_V1=true;
 document.addEventListener('click',function(e){
   var el=e.target&&e.target.closest?e.target.closest('.ss-class'):null;if(!el)return;
   var target=cardTarget(el),current=classFromUser();
   if(!target||!current||target===current)return;
   var r=window.SKILL_SAGA_PLAY_UNLOCK.canUnlock(target);
   if(r.ok)return;
   e.preventDefault();e.stopImmediatePropagation();
   if(r.reason==='xp')toast('You need '+r.requiredXp+' XP to unlock Class '+target+'. Your XP: '+r.currentXp+'.');
   else if(r.reason==='coins')toast('You need '+r.requiredCoins+' Coins to unlock Class '+target+'. Your Coins: '+r.currentCoins+'.');
   else if(r.reason==='unsupported')toast('Only classes within 3 levels of your current class can be unlocked.');
 },true);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
/* Skill Saga — Class unlock v1
 * Final progression: current class is open; adjacent classes require 500 XP/50 Coins,
 * two away 1000/100, three away 2000/200. XP is a threshold; Coins are spendable.
 * Never unlocks core curriculum by purchase alone.
 */
(function(){
'use strict';
var KEY='SKILL_SAGA_SELECTED_CLASS';
var RULES={1:{xp:0,coins:0},2:{xp:500,coins:50},3:{xp:1000,coins:100},4:{xp:2000,coins:200}};
function toast(m){if(typeof window.toast==='function')window.toast(m);}
function userData(){try{return typeof window.user==='function'?window.user():null;}catch(e){return null;}}
function currentClass(){var u=userData(),n=Number(u&&u.studentClass||window.SKILL_SAGA_SELECTED_CLASS||localStorage.getItem(KEY)||0);return n>=1&&n<=12?n:1;}
function rule(target){var d=Math.abs(Number(target)-currentClass());return RULES[d]||null;}
function canUnlock(target){var r=rule(target);if(!r)return {ok:false,reason:'Only classes within 3 levels can be unlocked from the current class.'};var u=userData()||{};var xp=Number(u.xp||0),coins=Number(u.coins||0);if(xp<r.xp)return {ok:false,reason:'You need '+r.xp+' XP to unlock this class.'};if(coins<r.coins)return {ok:false,reason:'You need '+r.coins+' Coins to unlock this class.'};return {ok:true,rule:r};}
function unlock(target){var n=Number(target),r=rule(n);if(!r){toast('This class is outside the current unlock range.');return;}if(r.xp===0){toast('This class is already available.');return;}var u=userData()||{};var xp=Number(u.xp||0),coins=Number(u.coins||0);if(xp<r.xp||coins<r.coins){toast('Unlock requires '+r.xp+' XP and '+r.coins+' Coins. XP is a threshold; Coins are spent on unlock.');return;}window.SKILL_SAGA_UNLOCKED_CLASSES=window.SKILL_SAGA_UNLOCKED_CLASSES||{};window.SKILL_SAGA_UNLOCKED_CLASSES[n]=true;try{localStorage.setItem('SKILL_SAGA_UNLOCKED_'+n,'1');}catch(e){}toast('Class '+n+' unlocked.');if(typeof window.ssSelectClass==='function')window.ssSelectClass(n);}
window.ssClassUnlock={rule:rule,canUnlock:canUnlock,unlock:unlock};
document.addEventListener('click',function(e){var el=e.target.closest&&e.target.closest('.ss-lock');if(!el)return;e.preventDefault();e.stopPropagation();var card=el.closest('.ss-class'),m=((card&&card.textContent)||'').match(/\b(\d{1,2})\b/);if(m)unlock(Number(m[1]));},true);
})();
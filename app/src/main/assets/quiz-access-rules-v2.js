/* Skill Saga — Quiz Access Rules v2
 * FREE / XP / COIN / ASSIGNED access. Premium remains disabled.
 */
(function(){
'use strict';
var C=window.SKILL_SAGA_ACCESS_CONFIG||{};
var M=(C.MODES||{});
function mode(q){var m=String(q&&q.accessType||q&&q.accessMode||C.DEFAULT_MODE||'free').toLowerCase();if(m==='coin')m='coins';if(m==='xp_unlock')m='xp';return m;}
function check(q,u){
 q=q||{};u=u||{};var m=mode(q),xp=Number(u.xp||0),coins=Number(u.coins||0),uid=String(u.uid||'');
 if(m===M.FREE||m==='free')return {allowed:true,mode:'free',reason:'free'};
 if(m===M.XP_UNLOCK||m==='xp') {var need=Number(q.xpRequired||q.requiredXp||C.DEFAULT_XP_REQUIRED||500);return {allowed:xp>=need,mode:'xp',requiredXp:need,currentXp:xp,reason:xp>=need?'xp_threshold_met':'xp_threshold_not_met'};}
 if(m===M.COIN_UNLOCK||m==='coins') {var needc=Number(q.coinsRequired||q.requiredCoins||C.DEFAULT_COINS_REQUIRED||100);return {allowed:coins>=needc,mode:'coins',requiredCoins:needc,currentCoins:coins,reason:coins>=needc?'coins_available':'insufficient_coins'};}
 if(m===M.ASSIGNED_ONLY||m==='assigned') {var assigned=!!(q.assigned||q.assignedTo===uid||q.studentUid===uid);return {allowed:assigned,mode:'assigned',reason:assigned?'assignment_verified':'assignment_required'};}
 if(m==='premium')return {allowed:false,mode:'premium',reason:'premium_disabled'};
 return {allowed:false,mode:m,reason:'unknown_access_mode'};
}
function spendCoins(q,u){var r=check(q,u);if(!r.allowed||r.mode!=='coins')return r;var cost=r.requiredCoins;return {allowed:true,mode:'coins',cost:cost,remainingCoins:r.currentCoins-cost};}
window.SkillSagaQuizAccess={mode:mode,check:check,spendCoins:spendCoins};
})();

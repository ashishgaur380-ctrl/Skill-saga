/* Skill Saga — Moderation v1
 * Forum safety model. Discussion Forum remains disabled until product controls are enabled.
 */
(function(){
'use strict';
var CATEGORIES=['Mathematics Help','Science Help','English Help','Exam Preparation','GK','Study Tips','Doubt Corner'];
var BLOCKED=['phone number','mobile number','whatsapp','telegram','address','betting','gambling','sexual','porn','violence','advertising','spam','impersonat'];
var ACTIONS=['Approve','Hide','Remove','Warn','Restrict','Ban'];
function check(text){var t=String(text||'').toLowerCase(),hits=BLOCKED.filter(function(x){return t.indexOf(x)>=0;});return {allowed:hits.length===0,flags:hits};}
function report(post,reason,reporterUid){return {postId:post&&post.id||null,reason:String(reason||'other'),reporterUid:reporterUid||null,status:'open',createdAt:new Date().toISOString()};}
function audit(action,moderatorUid,targetId){return {action:action,targetId:targetId||null,moderatorUid:moderatorUid||null,createdAt:new Date().toISOString()};}
function can(action){return ACTIONS.indexOf(String(action||''))>=0;}
window.SkillSagaModeration={CATEGORIES:CATEGORIES,ACTIONS:ACTIONS,check:check,report:report,audit:audit,can:can,forumEnabled:false};
})();

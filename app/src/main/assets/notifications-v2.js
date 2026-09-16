/* Skill Saga — Notifications v2
 * Unified notification model and routing helpers. Existing actionable assignment flow remains intact.
 */
(function(){
'use strict';
var TYPES={assignment:'Assignment',quiz:'Quiz',competition:'Competition',achievement:'Achievement',system:'System'};
function make(type,title,message,target){return {type:type||'system',typeLabel:TYPES[type]||'Notification',title:String(title||'Skill Saga'),message:String(message||''),target:target||null,read:false,createdAt:new Date().toISOString()};}
function sort(rows){return (Array.isArray(rows)?rows:[]).slice().sort(function(a,b){return new Date(b.createdAt||0)-new Date(a.createdAt||0);});}
function route(n){n=n||{};if(n.target&&typeof window.go==='function'){try{window.go(n.target);return true;}catch(e){}}return false;}
function unread(rows){return (rows||[]).filter(function(n){return !n.read;}).length;}
window.SkillSagaNotifications={TYPES:TYPES,make:make,sort:sort,route:route,unread:unread};
})();

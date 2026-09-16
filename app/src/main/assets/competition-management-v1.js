/* Skill Saga — Competition Management v1
 * Production data model + scheduling/eligibility helpers. Additive only.
 */
(function(){
'use strict';
var TYPES={daily:'Skill Sprint',weekly:'Skill Saga Weekly Challenge',subject:'Subject Masters',monthly:'Skill Saga Championship',quarterly:'Skill Saga Scholar Challenge'};
function typeName(t){return TYPES[String(t||'').toLowerCase()]||String(t||'Custom Competition');}
function date(v){var d=v instanceof Date?v:new Date(v);return isNaN(d.getTime())?null:d;}
function status(c,now){
 now=now||new Date();var s=date(c&&c.startAt),e=date(c&&c.endAt);
 if(!s)return 'draft';if(now<s)return 'scheduled';if(e&&now>e)return 'ended';return c&&c.published===false?'draft':'live';
}
function eligible(c,u){
 c=c||{};u=u||{};if(!u.uid)return {allowed:false,reason:'login_required'};
 if(c.classNumber!=null&&String(c.classNumber)!==String(u.studentClass||''))return {allowed:false,reason:'class_not_eligible'};
 if(Array.isArray(c.classes)&&c.classes.length&&c.classes.map(String).indexOf(String(u.studentClass||''))<0)return {allowed:false,reason:'class_not_eligible'};
 if(c.stream&&String(c.stream).toLowerCase()!=='all'&&String(c.stream).toLowerCase()!==String(u.stream||'').toLowerCase())return {allowed:false,reason:'stream_not_eligible'};
 return {allowed:true,reason:'eligible'};
}
function registration(c,u){var r=eligible(c,u),st=status(c);if(!r.allowed)return r;if(st!=='live')return {allowed:false,reason:st};if(c.registrationOpen===false)return {allowed:false,reason:'registration_closed'};return {allowed:true,reason:'registration_open'};}
window.SkillSagaCompetition={TYPES:typeName,status:status,eligible:eligible,registration:registration};
})();

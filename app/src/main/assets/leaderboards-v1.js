/* Skill Saga — Leaderboards v1
 * Class, subject, competition and privacy-safe display helpers.
 */
(function(){
'use strict';
function cleanName(u){u=u||{};return String(u.displayName||u.firstName||u.name||'Learner').trim().slice(0,30)||'Learner';}
function compare(a,b){return Number(b.score||b.points||b.xp||0)-Number(a.score||a.points||a.xp||0);}
function rank(rows){return (Array.isArray(rows)?rows:[]).slice().sort(compare).map(function(r,i){return Object.assign({},r,{rank:i+1,displayName:cleanName(r)});});}
function scope(type,u){u=u||{};var t=String(type||'class').toLowerCase();if(t==='class')return {type:t,classNumber:u.studentClass||null};if(t==='subject')return {type:t,classNumber:u.studentClass||null,subject:u.subject||null};if(t==='competition')return {type:t};return {type:'class',classNumber:u.studentClass||null};}
function privacyRow(r){r=r||{};return {rank:r.rank,displayName:cleanName(r),score:Number(r.score||r.points||r.xp||0),badge:r.badge||null};}
window.SkillSagaLeaderboards={rank:rank,scope:scope,privacyRow:privacyRow};
})();

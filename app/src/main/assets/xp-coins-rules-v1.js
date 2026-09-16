/* Skill Saga — XP & Coins Rules v1
 * Additive reward policy. Server-side enforcement remains a later security step.
 */
(function(){
'use strict';
var XP=Object.freeze({LESSON:5,EASY_QUESTION:2,MEDIUM_QUESTION:3,HARD_QUESTION:5,QUIZ_COMPLETE:10,PERFECT_QUIZ:10,DAILY_GOAL:10,WEEKLY_GOAL:50,FIRST_QUIZ_DAY:5});
var COINS=Object.freeze({DAILY_QUIZ:5,LESSON:2,PERFECT_QUIZ:5,STREAK_7_DAYS:25,WEEKLY_CHALLENGE:20,BADGE:10,COMPETITION_PARTICIPATION:5});
var EVENTS=Object.freeze({LESSON:'lesson',QUESTION:'question',QUIZ_COMPLETE:'quiz_complete',PERFECT_QUIZ:'perfect_quiz',DAILY_GOAL:'daily_goal',WEEKLY_GOAL:'weekly_goal',FIRST_QUIZ_DAY:'first_quiz_day',DAILY_QUIZ:'daily_quiz',STREAK_7_DAYS:'streak_7_days',WEEKLY_CHALLENGE:'weekly_challenge',BADGE:'badge',COMPETITION_PARTICIPATION:'competition_participation'});
function questionXP(d){d=Number(d);return d===1?XP.EASY_QUESTION:d===3?XP.HARD_QUESTION:XP.MEDIUM_QUESTION;}
function award(event,meta){meta=meta||{};if(event===EVENTS.QUESTION)return {xp:questionXP(meta.difficulty),coins:0};
var map={lesson:[XP.LESSON,COINS.LESSON],quiz_complete:[XP.QUIZ_COMPLETE,0],perfect_quiz:[XP.PERFECT_QUIZ,COINS.PERFECT_QUIZ],daily_goal:[XP.DAILY_GOAL,0],weekly_goal:[XP.WEEKLY_GOAL,0],first_quiz_day:[XP.FIRST_QUIZ_DAY,0],daily_quiz:[0,COINS.DAILY_QUIZ],streak_7_days:[0,COINS.STREAK_7_DAYS],weekly_challenge:[0,COINS.WEEKLY_CHALLENGE],badge:[0,COINS.BADGE],competition_participation:[0,COINS.COMPETITION_PARTICIPATION]};
var x=map[event]||[0,0];return {xp:x[0],coins:x[1]};}
function key(uid,event,day){return 'SS_REWARD_V1_'+String(uid||'guest')+'_'+event+'_'+String(day||new Date().toISOString().slice(0,10));}
function once(uid,event,day){var k=key(uid,event,day);if(localStorage.getItem(k))return false;localStorage.setItem(k,'1');return true;}
function grant(uid,event,meta){if(!event)return {granted:false,xp:0,coins:0,reason:'invalid_event'};var oneTime=['lesson','quiz_complete','perfect_quiz','daily_goal','weekly_goal','first_quiz_day','daily_quiz','streak_7_days','weekly_challenge','badge','competition_participation'];if(oneTime.indexOf(event)>=0&&!once(uid,event,meta&&meta.day))return {granted:false,xp:0,coins:0,reason:'already_awarded'};var a=award(event,meta);return {granted:true,xp:a.xp,coins:a.coins,event:event};}
window.SKILL_SAGA_REWARDS={xp:XP,coins:COINS,events:EVENTS,questionXP:questionXP,award:award,grant:grant};
})();

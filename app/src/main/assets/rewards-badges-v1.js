/* Skill Saga — Rewards & Badges v1
 * XP, Coins, streaks, achievements and badge definitions.
 * Additive foundation; does not alter existing quiz scoring.
 */
(function(){
'use strict';
var REWARDS={lesson:{xp:5},easy:{xp:2},medium:{xp:3},hard:{xp:5},quizComplete:{xp:10},perfectQuiz:{xp:10},dailyGoal:{xp:10},weeklyGoal:{xp:50},firstQuizDay:{xp:5},dailyQuiz:{coins:5},lessonCoins:{coins:2},perfectCoins:{coins:5},streak7:{coins:25},weeklyChallenge:{coins:20},badge:{coins:10},competition:{coins:5}};
var BADGES=[
 {id:'first_quiz',name:'First Step',description:'Complete your first quiz'},
 {id:'perfect_quiz',name:'Perfect Score',description:'Complete a perfect quiz'},
 {id:'streak_7',name:'7-Day Streak',description:'Maintain a 7-day learning streak'},
 {id:'quiz_master',name:'Quiz Master',description:'Complete 25 quizzes'},
 {id:'subject_star',name:'Subject Star',description:'Build strong performance in a subject'},
 {id:'competition',name:'Competition Participant',description:'Participate in a competition'}
];
function reward(kind){return Object.assign({xp:0,coins:0},REWARDS[kind]||{});}
function badges(){return BADGES.slice();}
function progress(profile){profile=profile||{};var q=Number(profile.quizzesCompleted||profile.quizzes||0),st=Number(profile.streak||0);return {firstQuiz:q>=1,perfectQuiz:!!profile.perfectQuiz,streak7:st>=7,quizMaster:q>=25};}
function hasBadge(id,earned){return Array.isArray(earned)&&earned.indexOf(id)>=0;}
window.SkillSagaRewards={REWARDS:REWARDS,badges:badges,reward:reward,progress:progress,hasBadge:hasBadge};
})();

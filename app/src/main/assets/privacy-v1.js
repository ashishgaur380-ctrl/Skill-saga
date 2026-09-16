/* Skill Saga — Privacy v1 */
(function(){
'use strict';
function openPrivacy(){
 var html='<div class="card"><h2>Privacy</h2><p class="muted">Skill Saga is designed for learning and student participation. This screen provides a simple overview of the information used by the app.</p><div class="notice"><b>Account information</b><br>Information such as your name, email and learner profile details may be used to provide your account and learning experience.</div><div class="notice"><b>Learning activity</b><br>Quiz attempts, scores, progress, XP, Coins, badges and related learning activity may be used to show your progress and improve the learning experience.</div><div class="notice"><b>Assignments and competitions</b><br>Information needed to deliver assigned quizzes, competition participation, results and leaderboards may be processed within the app.</div><div class="notice"><b>Community safety</b><br>If community features are enabled later, moderation and reporting information may be processed to help keep students safe.</div><div class="notice"><b>Choices and control</b><br>Privacy controls and account/data deletion options will be expanded in the production privacy implementation. Core learning should remain accessible without purchasing virtual currency.</div><div class="notice"><b>Questions</b><br>For privacy questions or requests, use Help & Support.</div></div>';
 if(typeof window.shell==='function')window.shell(html);
}
window.ssOpenPrivacy=openPrivacy;
function install(){document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-privacy],.privacy,.privacy-link,.ss-privacy');if(t){e.preventDefault();e.stopPropagation();openPrivacy();}},true);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
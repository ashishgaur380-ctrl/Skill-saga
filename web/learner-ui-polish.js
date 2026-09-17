/* Skill Saga — final learner UI polish
 * Presentation-only layer: brighter, more energetic cards and consistent spacing.
 */
(function(){
'use strict';
var cssId='ss-final-ui-polish-css';
function install(){
 if(document.getElementById(cssId))return;
 var s=document.createElement('style');s.id=cssId;s.textContent=`
/* Brighter Skill Saga palette */
.ss-card,.section{border-color:#d5e3f7!important}
.ss-play-modes{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important;align-items:stretch!important}
.ss-play-modes .ss-mode{width:100%!important;min-width:0!important;box-sizing:border-box!important;border:1px solid rgba(23,105,255,.10)!important;box-shadow:0 7px 18px rgba(34,74,140,.10)!important;transition:transform .15s ease,box-shadow .15s ease!important}
.ss-play-modes .ss-mode:active{transform:scale(.98)!important}
.ss-play-modes .ss-mode:nth-child(1){background:linear-gradient(145deg,#dff2ff,#edf7ff)!important;border-color:#b9ddff!important}
.ss-play-modes .ss-mode:nth-child(2){background:linear-gradient(145deg,#fff0b8,#fff8df)!important;border-color:#f7dc77!important}
.ss-play-modes .ss-mode:nth-child(3){background:linear-gradient(145deg,#d8f8e7,#effff6)!important;border-color:#a9e8c6!important}
.ss-play-modes .ss-mode:nth-child(4){background:linear-gradient(145deg,#eadfff,#f7f1ff)!important;border-color:#d1bcff!important}
.ss-play-modes .ss-mode:nth-child(5){background:linear-gradient(145deg,#ffdce8,#fff0f5)!important;border-color:#f5b8cd!important}
.ss-play-modes .ss-mode:nth-child(6){background:linear-gradient(145deg,#d8edff,#eef7ff)!important;border-color:#b5d9ff!important}
.ss-play-modes .ss-mode .i{font-size:30px!important}
.ss-play-modes .ss-mode b{font-size:12px!important;color:#102653!important}
.ss-play-modes .ss-mode small{font-size:8.5px!important;color:#536887!important}
#ss-play-list{border-color:#cfe0f7!important;box-shadow:0 8px 20px rgba(34,74,140,.08)!important}
#ss-play-list .ss-action{background:linear-gradient(135deg,#1769ff,#4c4af2)!important;box-shadow:0 4px 10px rgba(23,105,255,.22)!important}
/* Brighter Learn subject cards */
.ss-learn-subject-card{box-shadow:0 7px 18px rgba(34,74,140,.08)!important}
/* Brighter generic cards used across learner screens */
.ss-event,.ss-board-row{border-color:#d8e5f5!important}
.ss-event button,.ss-board-xp{color:#1769ff!important}
`;
 document.head.appendChild(s);
}
function start(){install();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
window.addEventListener('pageshow',start);
window.ssLearnerUIPolish={start:start};
})();

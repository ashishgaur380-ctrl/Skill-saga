/* Skill Saga — visible learner UI polish v2 */
(function(){
'use strict';
var cssId='ss-final-ui-polish-css-v2';
function install(){
 if(document.getElementById(cssId))return;
 var s=document.createElement('style');s.id=cssId;s.textContent=`
body{background:#f4f8ff!important}
.ss-final .ss-card{border:1px solid #c9dbf5!important;box-shadow:0 7px 18px rgba(28,70,145,.10)!important}
.ss-final .ss-soft{background:linear-gradient(145deg,#cceeff,#e6f7ff)!important;border-color:#9edcff!important}
.ss-final .ss-green{background:linear-gradient(145deg,#c9f7df,#e7fff1)!important;border-color:#8fe2b7!important}
.ss-final .ss-pink{background:linear-gradient(145deg,#ffd0e2,#ffe9f2)!important;border-color:#f2a8c6!important}
.ss-final .ss-purple{background:linear-gradient(145deg,#dfd2ff,#f0e9ff)!important;border-color:#c3afff!important}
.ss-final .ss-yellow{background:linear-gradient(145deg,#ffe89b,#fff5cc)!important;border-color:#f3cf58!important}
.ss-final .ss-tabs .ss-tab:nth-child(1){background:linear-gradient(145deg,#1769ff,#3f55f4)!important;color:#fff!important;border-color:#1769ff!important;box-shadow:0 6px 14px rgba(23,105,255,.22)!important}
.ss-final .ss-tabs .ss-tab:not(:first-child){background:#fff!important;border-color:#bcd2f1!important}
.ss-final .ss-class{background:#fff!important;border-color:#c7d8ef!important}
.ss-final .ss-class.active{background:linear-gradient(135deg,#1769ff,#3e57f2)!important;color:#fff!important;border-color:#1769ff!important;box-shadow:0 5px 12px rgba(23,105,255,.25)!important}
.ss-final .ss-subject:nth-child(4n+1),.ss-final .ss-comp:nth-child(4n+1){background:linear-gradient(145deg,#cceeff,#e8f8ff)!important;border-color:#9fdcff!important}
.ss-final .ss-subject:nth-child(4n+2),.ss-final .ss-comp:nth-child(4n+2){background:linear-gradient(145deg,#ffd6e6,#ffedf4)!important;border-color:#f0b0c9!important}
.ss-final .ss-subject:nth-child(4n+3),.ss-final .ss-comp:nth-child(4n+3){background:linear-gradient(145deg,#fff0b4,#fff8dc)!important;border-color:#f2d56c!important}
.ss-final .ss-subject:nth-child(4n),.ss-final .ss-comp:nth-child(4n){background:linear-gradient(145deg,#d7f7e4,#ecfff3)!important;border-color:#a2e4bd!important}
.ss-play-modes{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important}
.ss-play-modes .ss-mode{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;min-height:112px!important;width:100%!important;box-sizing:border-box!important;border-radius:18px!important;border-width:2px!important;box-shadow:0 7px 18px rgba(28,70,145,.12)!important}
.ss-play-modes .ss-mode:nth-child(1){background:linear-gradient(145deg,#bfe7ff,#dff4ff)!important;border-color:#72c5ff!important}
.ss-play-modes .ss-mode:nth-child(2){background:linear-gradient(145deg,#ffe58a,#fff3bf)!important;border-color:#f0c62e!important}
.ss-play-modes .ss-mode:nth-child(3){background:linear-gradient(145deg,#bff2d6,#e0faeb)!important;border-color:#66d29a!important}
.ss-play-modes .ss-mode:nth-child(4){background:linear-gradient(145deg,#d9c9ff,#eee7ff)!important;border-color:#a88cff!important}
.ss-play-modes .ss-mode:nth-child(5){background:linear-gradient(145deg,#ffc4dc,#ffe2ed)!important;border-color:#ed83ad!important}
.ss-play-modes .ss-mode:nth-child(6){background:linear-gradient(145deg,#bfe1ff,#dff0ff)!important;border-color:#70b9ff!important}
.ss-play-modes .ss-mode .i{font-size:31px!important;line-height:1!important}
.ss-play-modes .ss-mode b{font-size:12px!important;color:#102653!important;margin-top:7px!important}
.ss-play-modes .ss-mode small{font-size:8.5px!important;color:#405878!important;margin-top:3px!important}
#ss-play-list{border:1px solid #bfd5f2!important;background:#fff!important;box-shadow:0 8px 20px rgba(28,70,145,.10)!important}
#ss-play-list .ss-action{background:linear-gradient(135deg,#1769ff,#5144ef)!important;box-shadow:0 4px 12px rgba(23,105,255,.24)!important}
.ss-final .ss-progress-card{background:linear-gradient(145deg,#eef7ff,#fff)!important;border-color:#bfd7f4!important}
.ss-final .ss-bar{height:8px!important;background:#dbe7f6!important}.ss-final .ss-bar i{background:linear-gradient(90deg,#22b86a,#43d487)!important}
.ss-final .ss-event{background:linear-gradient(145deg,#fff,#f4f9ff)!important;border-color:#bfd5f0!important;box-shadow:0 5px 14px rgba(28,70,145,.07)!important}
.ss-final .ss-event button{background:linear-gradient(135deg,#1769ff,#4d4aed)!important;color:#fff!important}
.nav{background:#fff!important;border-top:1px solid #d6e2f3!important;box-shadow:0 -7px 20px rgba(28,70,145,.08)!important}
.nav button{color:#7485a3!important;font-weight:900!important}.nav button.active,.nav button.active span{color:#1769ff!important}
.ss-final .ss-eyebrow{color:#1769ff!important}.ss-final .ss-title{color:#0b2555!important}
`;
 document.head.appendChild(s);
}
function start(){install();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
window.addEventListener('pageshow',start);
window.ssLearnerUIPolishV2={start:start};
})();
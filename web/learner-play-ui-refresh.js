/* Skill Saga — Play screen major visual redesign */
(function(){
'use strict';
var timer=null;
function css(){
 if(document.getElementById('ss-play-major-css'))return;
 var s=document.createElement('style');s.id='ss-play-major-css';s.textContent=`
/* ---------- PLAY PAGE ---------- */
#ss-play-live{background:transparent!important;border:0!important;box-shadow:none!important;padding:0!important;margin:0!important}
#ss-play-live .ss-play-hero{position:relative;overflow:hidden;min-height:178px;padding:20px 20px 18px;border-radius:26px;background:linear-gradient(135deg,#dceeff 0%,#eef3ff 48%,#f4e9ff 100%);border:1px solid #d5e2f4;margin:0 0 16px;box-shadow:0 10px 28px rgba(24,58,115,.10)}
#ss-play-live .ss-play-hero:before{content:'';position:absolute;width:150px;height:150px;border-radius:50%;right:-38px;top:-52px;background:rgba(255,255,255,.58);box-shadow:-35px 65px 0 8px rgba(255,255,255,.28)}
#ss-play-live .ss-play-hero:after{content:'';position:absolute;width:85px;height:85px;border-radius:22px;right:104px;bottom:-42px;background:rgba(255,255,255,.30);transform:rotate(25deg)}
#ss-play-live .ss-play-copy{position:relative;z-index:3;width:70%;max-width:255px}
#ss-play-live .ss-play-eyebrow{font-size:9px;font-weight:1000;letter-spacing:1.7px;color:#1769ff;text-transform:uppercase}
#ss-play-live .ss-play-hero h1{font-size:29px;line-height:1.03;color:#0b2555;margin:9px 0 8px;font-weight:1000;letter-spacing:-.6px}
#ss-play-live .ss-play-hero p{font-size:10.5px;color:#5d6e89;line-height:1.45;margin:0;max-width:220px}
#ss-play-live .ss-play-art{position:absolute;z-index:3;right:17px;bottom:17px;font-size:68px;filter:drop-shadow(0 10px 9px rgba(20,50,110,.15));transform:rotate(-4deg)}
#ss-play-live .ss-play-bubble{position:absolute;z-index:4;right:12px;top:14px;background:#fff;padding:7px 10px;border-radius:12px;color:#1769ff;font-size:8px;font-weight:1000;box-shadow:0 5px 12px rgba(28,70,145,.10);transform:rotate(-5deg)}
#ss-play-live .ss-play-live-title{font-size:16px!important;font-weight:1000!important;color:#102653!important;margin:0 2px 10px!important;display:flex;align-items:center;gap:7px}
#ss-play-live .ss-play-live-title:before{content:'✨';font-size:15px}
/* ---------- MODE GRID ---------- */
#ss-play-live .ss-play-modes{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;grid-auto-flow:row!important;gap:11px!important;width:100%!important;margin:0!important}
#ss-play-live .ss-play-modes .ss-mode{position:relative;overflow:hidden;display:flex!important;width:100%!important;min-width:0!important;max-width:none!important;min-height:126px!important;height:auto!important;box-sizing:border-box!important;flex-direction:column!important;justify-content:flex-start!important;align-items:flex-start!important;text-align:left!important;padding:16px 13px 13px!important;border-radius:21px!important;border:1.5px solid transparent!important;box-shadow:0 8px 20px rgba(28,70,145,.09)!important;cursor:pointer!important;transition:transform .16s ease,box-shadow .16s ease!important}
#ss-play-live .ss-play-modes .ss-mode:after{content:'';position:absolute;width:66px;height:66px;border-radius:50%;right:-22px;bottom:-23px;background:rgba(255,255,255,.42);pointer-events:none}
#ss-play-live .ss-play-modes .ss-mode:active{transform:scale(.975)!important;box-shadow:0 4px 10px rgba(28,70,145,.10)!important}
#ss-play-live .ss-play-modes .ss-mode .i{display:flex!important;align-items:center!important;justify-content:center!important;width:42px;height:42px;border-radius:14px;background:rgba(255,255,255,.72);font-size:24px!important;line-height:1!important;box-shadow:0 4px 9px rgba(28,70,145,.07)}
#ss-play-live .ss-play-modes .ss-mode b{font-size:12px!important;line-height:1.15!important;color:#102653!important;margin:10px 0 0!important;font-weight:1000!important}
#ss-play-live .ss-play-modes .ss-mode small{font-size:8.5px!important;line-height:1.35!important;color:#526987!important;text-align:left!important;margin:5px 0 0!important;max-width:125px}
#ss-play-live .ss-play-modes .ss-mode:before{position:absolute;right:10px;top:10px;font-size:8px;font-weight:1000;letter-spacing:.2px;padding:4px 6px;border-radius:7px;background:rgba(255,255,255,.70);color:#38506f}
#ss-play-live .ss-play-modes .ss-mode:nth-child(1){background:linear-gradient(145deg,#bfe7ff,#e5f7ff)!important;border-color:#75c9ff!important}
#ss-play-live .ss-play-modes .ss-mode:nth-child(1):before{content:'DAILY'}
#ss-play-live .ss-play-modes .ss-mode:nth-child(2){background:linear-gradient(145deg,#ffe38a,#fff4c8)!important;border-color:#efc733!important}
#ss-play-live .ss-play-modes .ss-mode:nth-child(2):before{content:'UNLOCK'}
#ss-play-live .ss-play-modes .ss-mode:nth-child(3){background:linear-gradient(145deg,#bdf1d4,#e7fbef)!important;border-color:#66d39a!important}
#ss-play-live .ss-play-modes .ss-mode:nth-child(3):before{content:'FAST'}
#ss-play-live .ss-play-modes .ss-mode:nth-child(4){background:linear-gradient(145deg,#d9c9ff,#f0eaff)!important;border-color:#a98cff!important}
#ss-play-live .ss-play-modes .ss-mode:nth-child(4):before{content:'FOCUS'}
#ss-play-live .ss-play-modes .ss-mode:nth-child(5){background:linear-gradient(145deg,#ffc7dc,#ffe7ef)!important;border-color:#eb86ae!important}
#ss-play-live .ss-play-modes .ss-mode:nth-child(5):before{content:'MIX IT'}
#ss-play-live .ss-play-modes .ss-mode:nth-child(6){background:linear-gradient(145deg,#c3e4ff,#e5f3ff)!important;border-color:#73baff!important}
#ss-play-live .ss-play-modes .ss-mode:nth-child(6):before{content:'TEACHER'}
#ss-play-live .ss-play-modes .ss-mode:nth-child(7){background:linear-gradient(145deg,#d7d2ff,#eeeaff)!important;border-color:#a99ff5!important;grid-column:1 / -1!important;min-height:104px!important;flex-direction:row!important;align-items:center!important;padding:13px 16px!important}
#ss-play-live .ss-play-modes .ss-mode:nth-child(7) .i{margin-right:11px}
#ss-play-live .ss-play-modes .ss-mode:nth-child(7) b{margin:0!important}
#ss-play-live .ss-play-modes .ss-mode:nth-child(7) small{margin:4px 0 0!important}
#ss-play-live .ss-play-modes .ss-mode:nth-child(7):before{content:'THINK'}
/* ---------- QUIZ LIST ---------- */
#ss-play-live #ss-play-list{background:#fff!important;border:1px solid #d8e4f4!important;border-radius:21px!important;padding:15px!important;margin-top:16px!important;box-shadow:0 8px 22px rgba(28,70,145,.07)!important}
#ss-play-live #ss-play-list:before{content:'Available Quizzes';display:block;font-size:14px;font-weight:1000;color:#102653;margin:0 0 9px}
#ss-play-live #ss-play-list>div:not(.ss-final-note){padding:11px 2px!important;border-bottom:1px solid #edf1f7!important}
#ss-play-live #ss-play-list .ss-action{border:0!important;border-radius:10px!important;background:linear-gradient(135deg,#1769ff,#5144ef)!important;color:#fff!important;padding:9px 12px!important;font-size:8px!important;font-weight:1000!important;box-shadow:0 4px 10px rgba(23,105,255,.20)!important}
#ss-play-live .ss-final-note{padding:17px 8px!important;text-align:center!important;color:#71819a!important;font-size:9px!important;background:#f7faff!important;border-radius:13px!important}
/* keep the rest of the learner shell untouched */
`;
 document.head.appendChild(s)
}
function render(){
 var box=document.getElementById('ss-play-live');if(!box)return false;css();
 var oldHero=box.querySelector('.ss-play-hero');
 if(!oldHero){
  var h=document.createElement('section');h.className='ss-play-hero';
  h.innerHTML='<div class="ss-play-copy"><div class="ss-play-eyebrow">PLAY • PRACTICE • MASTER</div><h1>Learn by Playing</h1><p>Choose a challenge, practise your skills and earn XP as you improve.</p></div><div class="ss-play-bubble">Play • Learn • Grow</div><div class="ss-play-art">🎮</div>';
  box.insertBefore(h,box.firstChild)
 }
 var title=box.querySelector('div[style*="font-weight:1000"]');
 if(title&&!title.classList.contains('ss-play-live-title')){title.classList.add('ss-play-live-title');title.textContent='Choose your challenge'}
 return true
}
function start(){var n=0;if(timer)return;timer=setInterval(function(){n++;if(render()||n>100){clearInterval(timer);timer=null}},250);render()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
window.addEventListener('pageshow',start);window.ssPlayUIRefresh={start:start,render:render};
})();

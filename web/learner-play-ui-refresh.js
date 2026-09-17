/* Skill Saga — Play screen visual refresh
 * Presentation layer only. Existing quiz loading, access checks and launch logic remain in learner-play-flow.js.
 */
(function(){
'use strict';
var timer=null;
function css(){if(document.getElementById('ss-play-refresh-css'))return;var s=document.createElement('style');s.id='ss-play-refresh-css';s.textContent=`
#ss-play-live{background:transparent!important;border:0!important;box-shadow:none!important;padding:0!important;margin-top:0!important}
.ss-play-hero{position:relative;overflow:hidden;min-height:155px;padding:18px;border-radius:23px;background:linear-gradient(135deg,#dff1ff,#eef3ff 55%,#f2e9ff);border:1px solid #dbe6f6;margin-bottom:13px}
.ss-play-copy{position:relative;z-index:2;width:67%}.ss-play-eyebrow{font-size:9px;font-weight:1000;letter-spacing:1.5px;color:#1769ff}.ss-play-hero h1{font-size:26px;line-height:1.05;color:#102653;margin:8px 0 7px}.ss-play-hero p{font-size:10px;color:#62728e;line-height:1.4;margin:0}.ss-play-art{position:absolute;right:5%;bottom:5px;font-size:68px;filter:drop-shadow(0 7px 8px rgba(20,50,110,.14))}.ss-play-bubble{position:absolute;right:10px;top:12px;background:#fff;padding:7px 9px;border-radius:10px;color:#1769ff;font-size:8px;font-weight:1000;transform:rotate(-5deg)}
.ss-play-live-title{font-size:15px;font-weight:1000;color:#102653;margin:0 2px 9px}.ss-play-modes{display:grid!important;grid-template-columns:repeat(2,1fr);gap:9px!important}.ss-play-modes .ss-mode{background:#fff;border:1px solid #e1e8f3;border-radius:18px;padding:14px 10px;min-height:105px;box-shadow:0 6px 16px rgba(28,53,98,.06);cursor:pointer}.ss-play-modes .ss-mode:nth-child(1){background:#eef5ff}.ss-play-modes .ss-mode:nth-child(2){background:#fff7df}.ss-play-modes .ss-mode:nth-child(3){background:#eaf8f0}.ss-play-modes .ss-mode:nth-child(4){background:#f2edff}.ss-play-modes .ss-mode:nth-child(5){background:#fff0f4}.ss-play-modes .ss-mode:nth-child(6){background:#e9f4ff}.ss-play-modes .ss-mode .i{font-size:27px}.ss-play-modes .ss-mode b{font-size:11px;color:#172542;margin-top:5px}.ss-play-modes .ss-mode small{font-size:8px;line-height:1.3;color:#71809a}
#ss-play-list{background:#fff;border:1px solid #e5eaf3;border-radius:19px;padding:13px;box-shadow:0 6px 18px rgba(28,53,98,.05)}
#ss-play-list:before{content:'Available Quizzes';display:block;font-size:13px;font-weight:1000;color:#102653;margin-bottom:3px}
#ss-play-list .ss-action{border:0;border-radius:9px;background:#1769ff;color:#fff;padding:8px 10px;font-size:8px;font-weight:1000}
`;document.head.appendChild(s)}
function render(){var box=document.getElementById('ss-play-live');if(!box)return false;css();if(!box.querySelector('.ss-play-hero')){var h=document.createElement('section');h.className='ss-play-hero';h.innerHTML='<div class="ss-play-copy"><div class="ss-play-eyebrow">PLAY • PRACTICE • MASTER</div><h1>Learn by Playing</h1><p>Choose a challenge, practise your skills and earn XP as you improve.</p></div><div class="ss-play-bubble">Play • Learn • Grow</div><div class="ss-play-art">🎮</div>';box.insertBefore(h,box.firstChild)}var title=box.querySelector('div[style*="font-weight:1000"]');if(title&&!title.classList.contains('ss-play-live-title')){title.classList.add('ss-play-live-title');title.textContent='Choose how you want to play'}return true}
function start(){var n=0;if(timer)return;timer=setInterval(function(){n++;if(render()||n>80){clearInterval(timer);timer=null}},250);render()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();window.addEventListener('pageshow',start);window.ssPlayUIRefresh={start:start,render:render};
})();

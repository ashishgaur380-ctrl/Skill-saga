/* Skill Saga — Compete interaction layer v1 */
(function(){'use strict';
function toast(m){if(typeof window.toast==='function')window.toast(m)}
function txt(e){return((e&&e.textContent)||'').replace(/\s+/g,' ').trim()}
function key(s){return'SS_REGISTERED_COMPETITIONS_'+String(s||'').replace(/[^a-z0-9_-]/gi,'_')}
function register(card){var title=txt(card.querySelector('b,h3,h4,.title')||card).slice(0,100);try{localStorage.setItem(key(title),'1')}catch(e){};var btn=card.querySelector('button');if(btn){btn.textContent='Registered ✓';btn.disabled=true}toast('Registered for '+title+'.')}
function install(){if(window.__SS_COMPETE_ACTIONS_V1)return;window.__SS_COMPETE_ACTIONS_V1=true;document.addEventListener('click',function(e){var t=e.target;if(!t||!t.closest)return;if(t.closest('.nav'))return;var event=t.closest('.ss-event');if(event){var b=t.closest('button');if(b&&/register/i.test(txt(b))){e.preventDefault();e.stopImmediatePropagation();register(event);return}if(!b){e.preventDefault();toast(txt(event.querySelector('b,h3,h4')||event)+' — competition details');return}}
var board=t.closest('.ss-board-row');if(board){e.preventDefault();toast('Leaderboard entry selected.');return}
var forum=t.closest('.ss-forum');if(forum){e.preventDefault();toast('Discussion Forum is currently disabled until moderation and privacy controls are enabled.');return}
},true)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
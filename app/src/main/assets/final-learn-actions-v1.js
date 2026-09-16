/* Skill Saga — Learn interaction layer v1 */
(function(){'use strict';
function toast(m){if(typeof window.toast==='function')window.toast(m)}
function txt(e){return((e&&e.textContent)||'').replace(/\s+/g,' ').trim()}
function cls(){var n=Number(window.SKILL_SAGA_SELECTED_CLASS||0);if(n)return n;try{return Number(localStorage.getItem('SKILL_SAGA_SELECTED_CLASS')||0)}catch(e){return 0}}
function learnClass(n){window.SKILL_SAGA_SELECTED_CLASS=n;try{localStorage.setItem('SKILL_SAGA_SELECTED_CLASS',String(n))}catch(e){};document.querySelectorAll('.ss-class').forEach(function(x){var m=txt(x).match(/\b(\d{1,2})\b/);x.classList.toggle('active',!!m&&Number(m[1])===n)});toast('Class '+n+' selected. Choose a subject to continue.')}
function openSubject(name){window.SKILL_SAGA_SELECTED_SUBJECT=name;toast(name+' selected. Choose a topic to continue.')}
function openTopic(name){window.SKILL_SAGA_SELECTED_TOPIC=name;toast(name+' selected. You can continue to Play for practice.')}
function install(){if(window.__SS_LEARN_ACTIONS_V1)return;window.__SS_LEARN_ACTIONS_V1=true;document.addEventListener('click',function(e){var t=e.target;if(!t||!t.closest)return;if(t.closest('.nav'))return;var c=t.closest('.ss-class');if(c){var m=txt(c).match(/\b(\d{1,2})\b/);if(m){e.preventDefault();e.stopImmediatePropagation();learnClass(Number(m[1]));return}}
var s=t.closest('.ss-subject');if(s){e.preventDefault();e.stopImmediatePropagation();openSubject(txt(s).replace(/\b\d+\s*chapters?\b/i,'').trim());return}
var topic=t.closest('.ss-topic');if(topic){e.preventDefault();e.stopImmediatePropagation();openTopic(txt(topic));return}
},true)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
/* Skill Saga — settings account actions v2 */
(function(){'use strict';
function text(e){return((e&&e.textContent)||'').replace(/\s+/g,' ').trim().toLowerCase()}
function install(){if(window.__SS_ACCOUNT_ACTIONS_V2)return;window.__SS_ACCOUNT_ACTIONS_V2=true;document.body.addEventListener('click',function(e){var b=e.target&&e.target.closest?e.target.closest('button'):null;if(!b)return;var s=text(b);if(s.indexOf('change / reset password')>=0&&typeof window.ssOpenPasswordReset==='function'){e.preventDefault();e.stopImmediatePropagation();window.ssOpenPasswordReset()}},true)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
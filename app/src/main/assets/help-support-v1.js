/* Skill Saga — Help & Support v2 */
(function(){
'use strict';
function openSupport(){
 var email='';try{var u=typeof window.user==='function'?window.user():null;email=u&&u.email?u.email:'';}catch(e){}
 var html='<div class="card"><h2>Help & Support</h2><p class="muted">Need help with Skill Saga? Choose an option below.</p><button class="btn block" id="ssHelpEmail">Email Support</button><button class="btn light block" id="ssHelpWhatsApp" style="margin-top:9px">WhatsApp Support</button><div class="notice" style="margin-top:12px">For account, quiz, assignment or technical issues, include your registered email and a short description.</div><div class="notice" style="margin-top:8px">Support contact details will be enabled after the final support email and WhatsApp number are configured.</div></div>';
 if(typeof window.shell==='function')window.shell(html);else return;
 var e=document.getElementById('ssHelpEmail'),w=document.getElementById('ssHelpWhatsApp');
 if(e)e.onclick=function(){if(typeof window.toast==='function')window.toast('Email support is not configured yet.');};
 if(w)w.onclick=function(){if(typeof window.toast==='function')window.toast('WhatsApp support is not configured yet.');};
}
window.ssOpenHelpSupport=openSupport;
function install(){document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-support],.help-support,.ss-help-support');if(t){e.preventDefault();e.stopPropagation();openSupport();}},true);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();

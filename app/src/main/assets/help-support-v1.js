/* Skill Saga — Help & Support v1 */
(function(){
'use strict';
function toast(m){if(typeof window.toast==='function')window.toast(m);}
function openSupport(){
 var email='';try{var u=typeof window.user==='function'?window.user():null;email=u&&u.email?u.email:'';}catch(e){}
 var html='<div class="card"><h2>Help & Support</h2><p class="muted">Need help with Skill Saga? Choose an option below.</p><button class="btn block" id="ssHelpEmail">Email Support</button><button class="btn light block" id="ssHelpWhatsApp" style="margin-top:9px">WhatsApp Support</button><div class="notice" style="margin-top:12px">For account, quiz, assignment or technical issues, include your registered email and a short description.</div></div>';
 if(typeof window.shell==='function')window.shell(html);else return;
 var e=document.getElementById('ssHelpEmail'),w=document.getElementById('ssHelpWhatsApp');
 if(e)e.onclick=function(){var body='Hello Skill Saga Support,%0A%0AMy registered email: '+encodeURIComponent(email)+'%0A%0AI need help with:%0A';window.location.href='mailto:support@skillsaga.app?subject=Skill Saga Support&body='+body;};
 if(w)w.onclick=function(){window.location.href='https://wa.me/?text='+encodeURIComponent('Hello Skill Saga Support, I need help with my Skill Saga account.');};
}
window.ssOpenHelpSupport=openSupport;
function install(){document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-support],.help-support,.ss-help-support');if(t){e.preventDefault();e.stopPropagation();openSupport();}},true);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
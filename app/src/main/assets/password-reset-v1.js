/* Skill Saga — password reset/change password v1 */
(function(){
'use strict';
function toast(m){if(typeof window.toast==='function')window.toast(m);else alert(m);}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function currentEmail(){try{var u=typeof window.user==='function'?window.user():null;return (u&&u.email)||(window.firebase&&firebase.auth&&firebase.auth().currentUser&&firebase.auth().currentUser.email)||'';}catch(e){return '';}}
function openPassword(){
  var email=currentEmail();
  if(typeof window.shell!=='function')return toast('Password settings are unavailable right now.');
  shell('<div class="row"><button class="back" onclick="if(typeof window.go===\'function\')window.go(\'profile\')">‹</button><div><h1 style="margin:0">Password</h1><div class="muted">Manage your Skill Saga account password.</div></div></div>'+
    '<div class="card" style="margin-top:15px">'+
    '<b>Change Password</b><div class="muted" style="margin:7px 0 12px">Use your current password to set a new one.</div>'+
    '<input id="ss-old-password" class="input" type="password" autocomplete="current-password" placeholder="Current password">'+
    '<input id="ss-new-password" class="input" type="password" autocomplete="new-password" placeholder="New password (6+ characters)">'+
    '<input id="ss-confirm-password" class="input" type="password" autocomplete="new-password" placeholder="Confirm new password">'+
    '<button class="btn block" id="ss-change-password-btn">Change Password</button></div>'+
    '<div class="card" style="margin-top:12px"><b>Forgot Password?</b><div class="muted" style="margin:7px 0 12px">Send a password-reset email to the signed-in email address.</div>'+
    '<div class="notice">'+esc(email||'No email address found')+'</div>'+
    '<button class="btn light block" id="ss-reset-password-btn">Send Reset Email</button></div>');
  var change=document.getElementById('ss-change-password-btn');
  if(change)change.onclick=async function(){
    var auth=window.firebase&&firebase.auth?firebase.auth():null, cu=auth&&auth.currentUser;
    var oldp=(document.getElementById('ss-old-password')||{}).value||'';
    var np=(document.getElementById('ss-new-password')||{}).value||'';
    var cp=(document.getElementById('ss-confirm-password')||{}).value||'';
    if(!cu||!cu.email)return toast('Please sign in again before changing your password.');
    if(!oldp||!np||!cp)return toast('Please fill all password fields.');
    if(np.length<6)return toast('New password must be at least 6 characters.');
    if(np!==cp)return toast('New passwords do not match.');
    try{
      change.disabled=true;
      var cred=firebase.auth.EmailAuthProvider.credential(cu.email,oldp);
      await cu.reauthenticateWithCredential(cred);
      await cu.updatePassword(np);
      toast('Password changed successfully.');
      document.getElementById('ss-old-password').value='';document.getElementById('ss-new-password').value='';document.getElementById('ss-confirm-password').value='';
    }catch(e){
      var code=String(e&&e.code||'');
      if(code.indexOf('wrong-password')>=0||code.indexOf('invalid-credential')>=0)toast('Current password is incorrect.');
      else if(code.indexOf('weak-password')>=0)toast('Choose a stronger password.');
      else if(code.indexOf('requires-recent-login')>=0)toast('Please sign in again, then change the password.');
      else toast('Unable to change password right now.');
    }finally{change.disabled=false;}
  };
  var reset=document.getElementById('ss-reset-password-btn');
  if(reset)reset.onclick=async function(){
    var auth=window.firebase&&firebase.auth?firebase.auth():null, cu=auth&&auth.currentUser, em=email||(cu&&cu.email)||'';
    if(!auth||!em)return toast('No email address is available for password reset.');
    try{reset.disabled=true;await auth.sendPasswordResetEmail(em);toast('Password reset email sent. Check your inbox.');}
    catch(e){toast('Unable to send the reset email right now.');}
    finally{reset.disabled=false;}
  };
}
window.ssOpenPasswordSettings=openPassword;
function install(){
 document.addEventListener('click',function(e){
   var t=e.target;
   if(t.closest('.nav button'))return;
   var text=((t.closest('.card,.tile,.link,.btn,.section')||t).textContent||'').trim().toLowerCase();
   if(text.indexOf('change/reset password')>=0||text.indexOf('change password')>=0||text.indexOf('reset password')>=0){e.preventDefault();e.stopPropagation();openPassword();}
 },true);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
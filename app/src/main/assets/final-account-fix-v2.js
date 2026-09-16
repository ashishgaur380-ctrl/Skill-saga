/* Skill Saga — account action patch v2 */
(function(){
'use strict';
function toast(m){if(typeof window.toast==='function')window.toast(m);}
window.resetPasswordFromSettings=function(){
  if(!window.firebase||!firebase.auth)return toast('Firebase is not connected');
  var cu=firebase.auth().currentUser;
  var email=cu&&cu.email?cu.email:'';
  if(!email){email=window.prompt('Enter your Skill Saga account email:','')||'';email=String(email).trim().toLowerCase();}
  if(!email)return;
  firebase.auth().sendPasswordResetEmail(email).then(function(){toast('Password reset email sent to '+email);}).catch(function(e){toast(e&&e.message?e.message:'Could not send password reset email');});
};
})();

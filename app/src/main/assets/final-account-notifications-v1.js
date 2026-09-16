/* Skill Saga — account/notification completion layer v1 */
(function(){'use strict';
function toast(m){if(typeof window.toast==='function')window.toast(m)}
function current(){try{return typeof window.user==='function'?window.user():null}catch(e){return null}}
function db(){return window.firebase&&firebase.firestore?firebase.firestore():null}
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
async function assignmentNotices(){
 var u=current();var d=db();if(!u||!d)return;
 try{
   var snap=await d.collection('assignments').where('studentUid','==',u.uid).where('status','==','assigned').get();
   if(snap.empty)return;
   var root=document.querySelector('main')||document.querySelector('.main')||document.body;
   if(!root||document.getElementById('ss-actionable-assignments'))return;
   var box=document.createElement('div');box.id='ss-actionable-assignments';box.className='card';
   box.innerHTML='<div class="section" style="margin-top:0"><b>🔔 Action Required</b><span class="badge">'+snap.size+' pending</span></div>';
   snap.docs.forEach(function(doc){var a=doc.data()||{};var row=document.createElement('div');row.className='notice';row.innerHTML='<b>'+esc(a.title||'Teacher-assigned quiz')+'</b><div class="muted" style="margin-top:4px">Your teacher assigned this quiz.</div><button class="btn" style="margin-top:8px">Start Quiz →</button>';row.querySelector('button').onclick=async function(){try{if(a.quizId&&typeof window.startQuiz==='function'){await window.startQuiz(a.quizId)}else toast('Assigned quiz is not available yet.')}catch(e){toast('Unable to open assigned quiz.')}};box.appendChild(row)});
   root.insertBefore(box,root.firstChild);
 }catch(e){console.warn('Actionable assignment notification failed',e)}
}
window.ssOpenPasswordReset=function(){
 var u=current();var email=(u&&u.email)||((window.firebase&&firebase.auth&&firebase.auth().currentUser||{}).email)||'';
 var entered=prompt('Enter the email address for your Skill Saga password reset:',email);
 if(!entered)return;entered=entered.trim().toLowerCase();if(!entered)return;
 if(window.firebase&&firebase.auth){firebase.auth().sendPasswordResetEmail(entered).then(function(){toast('Password reset email sent to '+entered)}).catch(function(e){toast(e.message||'Could not send password reset email')})}
};
function install(){if(window.__SS_ACCOUNT_NOTIFY_V1)return;window.__SS_ACCOUNT_NOTIFY_V1=true;setTimeout(assignmentNotices,900);var mo=new MutationObserver(function(){if(typeof window.screen==='string'&&/notification/i.test(window.screen))setTimeout(assignmentNotices,150)});mo.observe(document.body,{childList:true,subtree:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
/* Skill Saga — actionable assignment notifications v1 */
(function(){
'use strict';
function toast(m){if(typeof window.toast==='function')window.toast(m);}
async function pending(){
 try{if(window.firebase&&firebase.firestore&&typeof window.user==='function'){var u=window.user();if(!u||!u.uid)return [];var s=await firebase.firestore().collection('assignments').where('studentId','==',u.uid).where('status','==','assigned').get();return s.docs.map(function(d){return Object.assign({id:d.id},d.data());});}}catch(e){console.warn('assignment notifications',e);}return [];
}
function openAssignment(id){if(id&&typeof window.ssOpenAssignedQuiz==='function'){window.ssOpenAssignedQuiz(id);return;}if(typeof window.go==='function')window.go('play');else toast('Assigned quiz is ready.');}
function install(){
 if(window.__SS_ASSIGNMENT_NOTIFICATIONS_V1)return;window.__SS_ASSIGNMENT_NOTIFICATIONS_V1=true;
 document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-assignment-id],.notification-assignment,.ss-notification');if(!b)return;var id=b.getAttribute('data-assignment-id');if(id){e.preventDefault();openAssignment(id);}},true);
 window.ssLoadPendingAssignments=pending;
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
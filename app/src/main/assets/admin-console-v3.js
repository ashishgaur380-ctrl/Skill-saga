/* Skill Saga Admin Console v3 */
(function(){'use strict';if(window.__SS_ADMIN_V3)return;window.__SS_ADMIN_V3=true;
function db(){return window.ssAdminDB?ssAdminDB():window.firebase&&firebase.firestore?firebase.firestore():null}
function auth(){return window.ssAdminAuth?ssAdminAuth():window.firebase&&firebase.auth?firebase.auth().currentUser:null}
function ok(){return window.ssAdminGuard?ssAdminGuard():!!(auth()&&auth().uid==='4Jme1MoSmH...
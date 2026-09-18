/* Skill Saga Admin Console core */
(function(){'use strict';
var BOOT='4Jme1MoSmHbjzwVjkvxeNSwPp0U2';
window.ssAdminDB=function(){return firebase&&firebase.firestore?firebase.firestore():null};
window.ssAdminAuth=function(){return firebase&&firebase.auth?firebase.auth().currentUser:null};
window.ssAdminOK=function(){var a=ssAdminAuth(),u=window.user&&window.user();return !!(a&&ssAdminDB()&&(a.uid===BOOT||(u&&u.role==='admin')))};
window.ssAdminGuard=function(){if(!ssAdminOK()){if(window.toast)toast('Admin access required');return false}return true};
window.ssAdminStamp=function(){return firebase.firestore.FieldValue.serverTimestamp()};
window.ssAdminEsc=function(v){return String(v==null?'':v).replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]})};
window.ssAdminDocs=async function(c,n){try{var q=ssAdminDB().collection(c);if(n)q=q.limit(n);var s=await q.get();return s.docs.map(function(d){return Object.assign({id:d.id},d.data())})}catch(e){console.warn(c,e);return[]}};
function stat(v,t){return '<div class="tile"><b>'+ssAdminEsc(v)+'</b><small>'+ssAdminEsc(t)+'</small></div>'}
window.ssAdminPage=function(t,s,b){document.getElementById('root').innerHTML='<div class="app"><header class="top"><div class="brand"><img src="logo.png"><b>Skill <span>Saga</span></b></div><button class="iconbtn" onclick="admin()">Back</button></header><main class="main"><div class="row"><div><h1 style="margin:0">'+ssAdminEsc(t)+'</h1><div class="muted">'+ssAdminEsc(s||'')+'</div></div><span>🛠️</span></div>'+b+'</main></div>'};
window.ssAdminButton=function(t,f,k){return '<button class="btn '+(k||'light')+'" onclick="'+String(f).replace(/\"/g,'&quot;')+'">'+t+'</button>'};
window.ssAdminSettings=async function(){try{var s=await ssAdminDB().collection('appSettings').doc('general').get();return s.exists?s.data():{forumEnabled:false,adsEnabled:false,premiumEnabled:false}}catch(e){return{forumEnabled:false,adsEnabled:false,premiumEnabled:false}}};
var __ssAdminModulePromises={};
function loadAdminModule(src){if(__ssAdminModulePromises[src])return __ssAdminModulePromises[src];__ssAdminModulePromises[src]=new Promise(function(resolve,reject){var existing=document.querySelector('script[data-ss-admin-module="'+src+'"]')||document.querySelector('script[src="'+src+'"]');if(existing){if(existing.getAttribute('data-loaded')==='1')return resolve();existing.addEventListener('load',function(){resolve()},{once:true});existing.addEventListener('error',function(){reject(Error('Admin module failed to load: '+src))},{once:true});return}var s=document.createElement('script');s.src=src;s.async=false;s.setAttribute('data-ss-admin-module',src);s.onload=function(){s.setAttribute('data-loaded','1');resolve()};s.onerror=function(){reject(Error('Admin module failed to load: '+src))};(document.head||document.documentElement).appendChild(s)});return __ssAdminModulePromises[src]}
function bridgeAdminHandler(name,src){var already=window[name];if(already&&already.__ssAdminBridge)return;var bridge=function(){if(!ssAdminGuard())return;if(already)return already.apply(window,arguments);var args=arguments;loadAdminModule(src).then(function(){var fn=window[name];if(typeof fn==='function'&&fn!==bridge)return fn.apply(window,args);if(window.toast)toast('Admin module is unavailable. Please refresh once.')}).catch(function(e){console.warn(e);if(window.toast)toast('Admin module could not be loaded.')})};bridge.__ssAdminBridge=true;window[name]=bridge}
bridgeAdminHandler('ssAdminQuiz','admin-console-quiz.js');
bridgeAdminHandler('ssAdminCurriculum','admin-console-content.js');
bridgeAdminHandler('ssAdminMaterials','admin-console-content.js');
bridgeAdminHandler('ssAdminQuestions','admin-console-content.js');
bridgeAdminHandler('ssAdminLearnControl','admin-console-learn-control.js');
bridgeAdminHandler('ssAdminPlayControl','admin-console-play-control.js');
bridgeAdminHandler('ssAdminCompetitionControl','admin-console-competition-control.js');
})();
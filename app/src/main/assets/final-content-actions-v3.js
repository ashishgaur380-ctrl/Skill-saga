/* Skill Saga — content-driven Play actions v3 */
(function(){
'use strict';
function toast(m){if(typeof window.toast==='function')window.toast(m);}
function launch(q){if(q&&typeof window.startQuiz==='function'){window.startQuiz(q.id);return true;}return false;}
async function loadPublished(){
 try{
   if(window.firebase&&firebase.firestore){
     var snap=await firebase.firestore().collection('quizzes').where('published','==',true).get();
     return snap.docs.map(function(d){return Object.assign({id:d.id},d.data());});
   }
 }catch(e){console.warn('Play content load failed',e);}
 return [];
}
window.ssPlayAction=function(mode){
 var name=String(mode||'');
 loadPublished().then(function(list){
   var me=typeof window.user==='function'?window.user():null, cls=me&&me.studentClass?String(me.studentClass):'';
   var candidates=list.slice();
   if(/daily/i.test(name))candidates=candidates.filter(function(q){return q.type==='daily';});
   else if(/quick/i.test(name))candidates=candidates.filter(function(q){return q.type==='practice';});
   else if(/topic/i.test(name))candidates=candidates.filter(function(q){return q.topic||q.skill||q.subject;});
   else if(/mixed/i.test(name))candidates=candidates.filter(function(q){return q.category;});
   if(cls)candidates=candidates.filter(function(q){return String(q.classLevel||'All')==='All'||String(q.classLevel||'')===cls;});
   if(!candidates.length)candidates=list.slice();
   if(candidates.length&&launch(candidates[0]))return;
   toast('No published quiz is available for this mode yet.');
 }).catch(function(){toast('Unable to load published quizzes.');});
};
window.ssClass=function(n){
 try{localStorage.setItem('SKILL_SAGA_SELECTED_CLASS',String(n));}catch(e){}
 toast('Class '+n+' selected');
};
})();

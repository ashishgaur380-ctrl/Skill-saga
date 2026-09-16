/* Skill Saga — content-driven Play actions v3 */
(function(){
'use strict';
function toast(m){if(typeof window.toast==='function')window.toast(m);}
function getContent(){
 var list=Array.isArray(window.local&&window.local.content)?window.local.content:[];
 return list.filter(function(q){return q&&q.published!==false;});
}
function launch(q){
 if(!q)return false;
 if(typeof window.startQuiz==='function'){window.startQuiz(q.id);return true;}
 return false;
}
window.ssPlayAction=function(mode){
 var name=String(mode||'');
 if(typeof window.loadCloudContent==='function'){
   window.loadCloudContent().then(function(){
     var list=getContent(), me=typeof window.user==='function'?window.user():null, cls=me&&me.studentClass?String(me.studentClass):'';
     var candidates=list.slice();
     if(/daily/i.test(name))candidates=candidates.filter(function(q){return q.type==='daily';});
     else if(/quick/i.test(name))candidates=candidates.filter(function(q){return q.type==='practice';});
     else if(/topic/i.test(name))candidates=candidates.filter(function(q){return q.topic||q.skill||q.subject;});
     else if(/mixed/i.test(name))candidates=candidates.filter(function(q){return q.category;});
     if(cls)candidates=candidates.filter(function(q){return String(q.classLevel||'All')==='All'||String(q.classLevel||'')===cls;});
     if(!candidates.length)candidates=list.slice();
     if(candidates.length){launch(candidates[0]);return;}
     toast('No published quiz is available for this mode yet.');
   }).catch(function(){toast('Unable to load published quizzes.');});
   return;
 }
 toast(name+' is ready.');
};
window.ssClass=function(n){
 try{localStorage.setItem('SKILL_SAGA_SELECTED_CLASS',String(n));}catch(e){}
 toast('Class '+n+' selected');
};
})();

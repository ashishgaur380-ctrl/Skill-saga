/* Skill Saga — Quiz Launch Hardening v2
 * Normalizes cloud quiz payloads before launch and rejects malformed quiz content.
 * Additive: does not replace the existing quiz engine.
 */
(function(){
'use strict';
if(window.__SS_QUIZ_LAUNCH_HARDENING_V2)return;
window.__SS_QUIZ_LAUNCH_HARDENING_V2=true;
function toast(m){if(typeof window.toast==='function')window.toast(m);}
function db(){return window.firebase&&firebase.firestore?firebase.firestore():null;}
function normalize(q){
 if(!q)return null;
 var raw=q.questionsJson;
 if(raw!=null){try{raw=typeof raw==='string'?JSON.parse(raw):raw;}catch(e){raw=null;}}
 var src=Array.isArray(raw)?raw:(Array.isArray(q.questions)?q.questions:[]);
 var out=src.map(function(x){
   if(Array.isArray(x))return [String(x[0]||''),Array.isArray(x[1])?x[1]:[],Number(x[2]||0),String(x[3]||'')];
   return [String(x.question||x.text||''),Array.isArray(x.options)?x.options:[],Number(x.correctIndex||0),String(x.explanation||'')];
 }).filter(function(x){return x[0]&&x[1].length>=2&&x[2]>=0&&x[2]<x[1].length;});
 if(!out.length)return null;
 q.questions=out;
 return q;
}
async function launch(id){
 var d=db();
 if(!d||!id)return toast('Quiz is unavailable right now.');
 try{
   var snap=await d.collection('quizzes').doc(String(id)).get();
   if(!snap.exists)return toast('This quiz is no longer available.');
   var q=normalize(Object.assign({id:snap.id},snap.data()));
   if(!q)return toast('This quiz has incomplete question data.');
   if(window.local&&Array.isArray(window.local.content)){
     var i=window.local.content.findIndex(function(x){return x&&String(x.id)===String(id);});
     if(i>=0)window.local.content[i]=q;else window.local.content.push(q);
   }
   if(typeof window.startQuiz==='function')return window.startQuiz(String(id));
   toast('Quiz engine is not ready.');
 }catch(e){console.warn('Quiz launch hardening failed',e);toast('Unable to open this quiz.');}
}
window.ssLaunchCloudQuiz=launch;
})();

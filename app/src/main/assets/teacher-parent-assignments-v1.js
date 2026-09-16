/* Skill Saga — Teacher/Parent Assignments v1
 * Assignment model and permission/validation helpers. Existing assignment flow preserved.
 */
(function(){
'use strict';
function clean(v){return String(v==null?'':v).trim();}
function validate(a){
 a=a||{};var errors=[];
 if(!clean(a.studentUid||a.studentId))errors.push('student required');
 if(!clean(a.quizId))errors.push('quiz required');
 if(!clean(a.title))errors.push('title required');
 if(a.dueAt&&isNaN(new Date(a.dueAt).getTime()))errors.push('invalid due date');
 return {valid:!errors.length,errors:errors};
}
function canCreate(role){return ['teacher','parent','admin'].indexOf(String(role||'').toLowerCase())>=0;}
function status(a,now){a=a||{};now=now||new Date();if(String(a.status||'').toLowerCase()==='completed')return 'completed';if(a.dueAt&&!isNaN(new Date(a.dueAt).getTime())&&now>new Date(a.dueAt))return 'overdue';return String(a.status||'assigned').toLowerCase();}
function normalize(a){a=a||{};return {id:a.id||null,studentUid:a.studentUid||a.studentId||null,teacherUid:a.teacherUid||null,parentUid:a.parentUid||null,quizId:a.quizId||null,title:a.title||'Assigned Quiz',dueAt:a.dueAt||null,status:a.status||'assigned',createdAt:a.createdAt||null};}
window.SkillSagaAssignments={validate:validate,canCreate:canCreate,status:status,normalize:normalize};
})();

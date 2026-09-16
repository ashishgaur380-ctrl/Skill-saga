/* Skill Saga — Quiz Scheduling v1
 * Additive scheduling gate for published quizzes.
 * Supports startAt/endAt, optional scheduledAt, and recurring daily/weekly windows.
 */
(function(){
'use strict';
function date(v){if(!v)return null; if(v&&typeof v.toDate==='function'){try{return v.toDate();}catch(e){}} if(v instanceof Date)return v; var d=new Date(v); return isNaN(d.getTime())?null:d;}
function inWindow(q, now){
 q=q||{}; now=date(now)||new Date();
 var start=date(q.startAt||q.scheduleStart||q.scheduledAt);
 var end=date(q.endAt||q.scheduleEnd);
 if(start && now<start)return false;
 if(end && now>end)return false;
 var rec=String(q.recurrence||q.scheduleRecurrence||'none').toLowerCase();
 if(rec==='none'||rec==='once'||!start)return true;
 if(end && now>end)return false;
 var dow=start.getDay(), nowDow=now.getDay();
 if(rec==='daily')return true;
 if(rec==='weekly')return dow===nowDow;
 return true;
}
function isAvailable(q,now){
 q=q||{};
 if(q.published!==true)return false;
 if(q.scheduled===false)return true;
 return inWindow(q,now);
}
function status(q,now){
 q=q||{};now=date(now)||new Date();
 if(q.published!==true)return 'draft';
 var start=date(q.startAt||q.scheduleStart||q.scheduledAt), end=date(q.endAt||q.scheduleEnd);
 if(start&&now<start)return 'scheduled';
 if(end&&now>end)return 'expired';
 return isAvailable(q,now)?'published':'scheduled';
}
window.SkillSagaQuizScheduling={isAvailable:isAvailable,status:status,inWindow:inWindow};
})();

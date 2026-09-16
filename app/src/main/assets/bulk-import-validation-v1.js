/* Skill Saga — Bulk Import Validation v1
 * Validates CSV/XLS/XLSX question records before they enter the question bank.
 */
(function(){
'use strict';
var required=['classNumber','subject','chapter','topic','question','explanation','difficulty'];
function s(v){return String(v==null?'':v).trim();}
function row(r,i){
 r=r||{};var e=[],q={};
 required.forEach(function(k){if(!s(r[k]))e.push(k+' is required');q[k]=r[k];});
 var c=Number(r.classNumber);if(!Number.isInteger(c)||c<1||c>12)e.push('classNumber must be 1–12');
 var d=Number(r.difficulty);if(![1,2,3].includes(d)){var dl=s(r.difficulty).toLowerCase();d=dl==='easy'?1:dl==='medium'?2:dl==='hard'?3:0;}if(!d)e.push('difficulty must be Easy/Medium/Hard or 1/2/3');
 var type=s(r.questionType||'mcq').toLowerCase();if(type==='mcq'){var opts=Array.isArray(r.options)?r.options.filter(function(x){return s(x)}):s(r.options).split('|').map(s).filter(Boolean);if(opts.length<2)e.push('MCQ needs at least 2 options');var ci=Number(r.correctIndex);if(!Number.isInteger(ci)||ci<0||ci>=opts.length)e.push('correctIndex is invalid');q.options=opts;q.correctIndex=ci;}
 if(Number(r.xp||0)<0||Number(r.coins||0)<0)e.push('XP/Coins cannot be negative');
 q.classNumber=c;q.difficulty=d;q.questionType=type;q.status=s(r.status||'draft').toLowerCase();q.accessType=s(r.accessType||r.accessMode||'free').toLowerCase();q.rowNumber=i+1;
 return {valid:e.length===0,errors:e,value:q};
}
function validate(rows){rows=Array.isArray(rows)?rows:[];var results=rows.map(row),bad=results.filter(function(x){return !x.valid});return {valid:bad.length===0,total:rows.length,validRows:rows.length-bad.length,invalidRows:bad.length,results:results};}
window.SkillSagaBulkImport={validateRow:row,validate:validate};
})();

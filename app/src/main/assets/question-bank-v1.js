/* Skill Saga — Question Bank v1
 * Additive model for curriculum-linked questions. Existing quiz engine remains unchanged.
 */
(function(){
  'use strict';
  var KEY='SKILL_SAGA_QUESTION_BANK_V1';
  var TYPES=Object.freeze({MCQ:'mcq',TRUE_FALSE:'true_false',SHORT:'short_answer'});
  var DIFFICULTY=Object.freeze({EASY:1,MEDIUM:2,HARD:3});
  var STATUS=Object.freeze({DRAFT:'draft',REVIEW:'review',APPROVED:'approved',PUBLISHED:'published',ARCHIVED:'archived'});

  function s(v){return String(v==null?'':v).trim();}
  function slug(v){return s(v).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}
  function makeId(q){return [q.classNumber,q.stream||'',q.subject,q.chapter,q.topic,q.question].map(slug).join('__');}
  function normalize(q){
    q=q||{};
    var options=Array.isArray(q.options)?q.options.map(s).filter(Boolean):[];
    var d=Number(q.difficulty||2); if(d<1||d>3)d=2;
    var type=s(q.questionType)||TYPES.MCQ;
    if(!Object.values(TYPES).includes(type))type=TYPES.MCQ;
    var status=s(q.status)||STATUS.DRAFT;
    if(!Object.values(STATUS).includes(status))status=STATUS.DRAFT;
    return {
      id:s(q.id)||makeId(q), classNumber:Number(q.classNumber||0), stream:s(q.stream),
      subject:s(q.subject), chapter:s(q.chapter), topic:s(q.topic), questionType:type,
      question:s(q.question), options:options, correctIndex:Number.isFinite(Number(q.correctIndex))?Number(q.correctIndex):0,
      correctAnswer:s(q.correctAnswer), explanation:s(q.explanation), difficulty:d,
      xp:Number(q.xp||0), coins:Number(q.coins||0), curriculumSource:s(q.curriculumSource||q.source),
      quizId:s(q.quizId), accessType:s(q.accessType)||'free', status:status,
      version:Number(q.version||1), updatedAt:q.updatedAt||new Date().toISOString()
    };
  }
  function all(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')||[];}catch(e){return[];}}
  function save(items){localStorage.setItem(KEY,JSON.stringify(items));return items;}
  function upsert(q){
    var x=normalize(q), a=all(), i=a.findIndex(function(v){return v.id===x.id;});
    if(i>=0){x=Object.assign({},a[i],x,{version:Number(a[i].version||1)+1,updatedAt:new Date().toISOString()});a[i]=x;}
    else a.push(x);
    save(a); return x;
  }
  function validate(q){
    q=normalize(q); var e=[];
    if(!q.classNumber||q.classNumber<1||q.classNumber>12)e.push('Class must be 1–12');
    if(!q.subject)e.push('Subject is required');
    if(!q.chapter)e.push('Chapter is required');
    if(!q.topic)e.push('Topic is required');
    if(!q.question)e.push('Question is required');
    if(q.questionType===TYPES.MCQ){
      if(q.options.length<2)e.push('MCQ needs at least 2 options');
      if(q.correctIndex<0||q.correctIndex>=q.options.length)e.push('Correct option is invalid');
    }
    if(!q.explanation)e.push('Explanation is required');
    if(![1,2,3].includes(q.difficulty))e.push('Difficulty must be 1, 2 or 3');
    if(q.xp<0||q.coins<0)e.push('XP/Coins cannot be negative');
    return {valid:e.length===0,errors:e,value:q};
  }
  function findByTopic(classNumber,stream,subject,chapter,topic){
    return all().filter(function(q){return Number(q.classNumber)===Number(classNumber)&&s(q.stream)===s(stream)&&s(q.subject)===s(subject)&&s(q.chapter)===s(chapter)&&s(q.topic)===s(topic);});
  }
  window.SKILL_SAGA_QUESTION_TYPES=TYPES;
  window.SKILL_SAGA_QUESTION_DIFFICULTY=DIFFICULTY;
  window.SKILL_SAGA_QUESTION_STATUS=STATUS;
  window.SkillSagaQuestionBank={normalize:normalize,validate:validate,all:all,save:save,upsert:upsert,findByTopic:findByTopic};
  if(!localStorage.getItem(KEY))save([]);
})();

/* Skill Saga — Learning Material v1
 * Production-safe additive layer. Does not replace the existing UI or quiz engine.
 * Hierarchy: Class -> Stream -> Subject -> Chapter -> Topic -> Material/Practice/Quiz
 */
(function(){
  'use strict';
  var KEY='SKILL_SAGA_LEARNING_MATERIAL_V1';
  var TYPES={EXPLANATION:'explanation',KEY_CONCEPT:'key_concept',RULE_FORMULA:'rule_formula',WORKED_EXAMPLE:'worked_example',PRACTICE:'practice'};

  function clean(v){return String(v==null?'':v).trim();}
  function slug(v){return clean(v).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}
  function idFor(x){return [x.classNumber,x.stream||'',x.subject,x.chapter,x.topic].map(slug).join('__');}

  function material(input){
    input=input||{};
    return {
      id:clean(input.id)||idFor(input),
      classNumber:Number(input.classNumber||0),
      stream:clean(input.stream),
      subject:clean(input.subject),
      chapter:clean(input.chapter),
      topic:clean(input.topic),
      title:clean(input.title)||clean(input.topic),
      explanation:clean(input.explanation),
      keyConcepts:Array.isArray(input.keyConcepts)?input.keyConcepts:[],
      rules:Array.isArray(input.rules)?input.rules:[],
      formulas:Array.isArray(input.formulas)?input.formulas:[],
      workedExamples:Array.isArray(input.workedExamples)?input.workedExamples:[],
      practice:Array.isArray(input.practice)?input.practice:[],
      status:clean(input.status)||'draft',
      version:Number(input.version||1),
      updatedAt:input.updatedAt||new Date().toISOString()
    };
  }

  function getAll(){
    try{return JSON.parse(localStorage.getItem(KEY)||'[]')||[];}catch(e){return [];}
  }
  function saveAll(items){localStorage.setItem(KEY,JSON.stringify(items));return items;}
  function upsert(input){
    var x=material(input), all=getAll(), i=all.findIndex(function(a){return a.id===x.id;});
    if(i>=0)all[i]=Object.assign({},all[i],x,{version:Number(all[i].version||1)+1,updatedAt:new Date().toISOString()});
    else all.push(x);
    saveAll(all); return x;
  }
  function find(classNumber,stream,subject,chapter,topic){
    var id=idFor({classNumber:classNumber,stream:stream,subject:subject,chapter:chapter,topic:topic});
    return getAll().find(function(x){return x.id===id;})||null;
  }

  window.SKILL_SAGA_MATERIAL_TYPES=TYPES;
  window.SkillSagaLearningMaterial={material:material,getAll:getAll,saveAll:saveAll,upsert:upsert,find:find};

  // Seed only the schema demonstration; no fabricated curriculum content is published.
  if(!localStorage.getItem(KEY))saveAll([]);
})();

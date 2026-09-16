/* Skill Saga — Production Curriculum Hierarchy v1
 * Foundation for: Class → Stream → Subject → Chapter → Topic → Material/Practice/Quiz.
 * Chapter/topic CONTENT is intentionally data-driven and will be populated through the Admin Content system.
 */
(function(){
  'use strict';
  var S={
    junior:['English','Hindi','Mathematics','EVS','GK'],
    primary:['English','Hindi','Mathematics','EVS','Science','Social Studies','GK'],
    middle:['English','Hindi','Mathematics','Science','Social Science','Computer','GK'],
    secondary:['English','Hindi','Mathematics','Science','Social Science','Computer/IT','GK'],
    science:['English','Physics','Chemistry','Mathematics','Biology/Computer Science','GK'],
    commerce:['English','Accountancy','Business Studies','Economics','Mathematics/Applied Mathematics','Computer','GK'],
    humanities:['English','Hindi','History','Political Science','Geography','Economics','Sociology/Psychology','GK']
  };
  function subjectsFor(n){
    n=Number(n);
    if(n<=2) return S.junior.slice();
    if(n<=5) return S.primary.slice();
    if(n<=8) return S.middle.slice();
    if(n<=10) return S.secondary.slice();
    return [];
  }
  var C={};
  for(var n=1;n<=10;n++) C[n]={classNumber:n,streams:null,subjects:subjectsFor(n)};
  C[11]={classNumber:11,streams:{Science:S.science.slice(),Commerce:S.commerce.slice(),Humanities:S.humanities.slice()}};
  C[12]={classNumber:12,streams:{Science:S.science.slice(),Commerce:S.commerce.slice(),Humanities:S.humanities.slice()}};

  function key(x){return String(x||'').trim().toLowerCase();}
  function getClass(n){return C[Number(n)]||null;}
  function getSubjects(n,stream){
    var c=getClass(n); if(!c)return [];
    if(c.streams){var s=Object.keys(c.streams).find(function(k){return key(k)===key(stream);});return s?c.streams[s].slice():[];}
    return c.subjects.slice();
  }
  function emptyHierarchy(n,stream,subject){
    return {classNumber:Number(n),stream:stream||null,subject:subject||'',chapters:[]};
  }
  window.SKILL_SAGA_CURRICULUM=C;
  window.ssCurriculumClass=getClass;
  window.ssCurriculumSubjects=getSubjects;
  window.ssCurriculumEmptyHierarchy=emptyHierarchy;
  window.ssCurriculumSchema={
    levelOrder:['class','stream','subject','chapter','topic','material','practice','quiz'],
    chapterFields:['id','name','order','status'],
    topicFields:['id','chapterId','name','order','status'],
    materialFields:['id','topicId','title','content','examples','status'],
    questionFields:['id','classNumber','stream','subject','chapter','topic','questionType','difficulty','correctAnswer','explanation','xp','coins','accessType','status']
  };
})();

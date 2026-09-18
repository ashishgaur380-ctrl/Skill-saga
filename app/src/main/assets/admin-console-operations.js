/* Skill Saga Admin operations - non-content administration */
(function(){'use strict';
function ok(){return ssAdminGuard()}function db(){return ssAdminDB()}function au(){return ssAdminAuth()}function ts(){return ssAdminStamp()}function esc(v){return ssAdminEsc(v)}function page(t,s,b){return ssAdminPage(t,s,b)}function btn(t,f,k){return ssAdminButton(t,f,k)}function docs(c){return ssAdminDocs(c)}function toastx(x){if(window.toast)toast(x)}
function val(id){var e=document.getElementById(id);return e?e.value.trim():''}
function input(id,p,v){return '<input id="'+id+'" class="input" placeholder="'+esc(p)+'" value="'+esc(v||'')+'">'}
function area(id,p,v){return '<textarea id="'+id+'" class="area" rows="3" placeholder="'+esc(p)+'">'+esc(v||'')+'</textarea>'}
window.ssAdminCompetitions=async function(){if(!ok())return;var a=await docs('competitions');page('Competition Manager','Create and manage competitions. Select existing quiz IDs instead of duplicating quiz content.','<div class="card admin">'+btn('＋ Create Competition','ssAdminCompetitionForm()','gold')+'</div>'+(a.length?a.slice(0,100).map(function(x){return '<div class="card"><div class="row"><b>'+esc(x.title||'Competition')+'</b><span class="badge">'+esc(x.status||'draft')+'</span></div><div class="small muted">'+esc(x.type||'')+' • '+esc(x.startAt||'')+' → '+esc(x.endAt||'')+'<br>Quiz IDs: '+esc(Array.isArray(x.quizIds)?x.quizIds.join(', '):(x.quizIds||'—'))+'</div>'+btn('Edit','ssAdminCompetitionForm(\''+esc(x.id)+'\')')+'</div>'}).join(''):'<div class="card">No competitions yet.</div>'))};
window.ssAdminCompetitionForm=async function(id){if(!ok())return;var x={};if(id){var s=await db().collection('competitions').doc(id).get();if(s.exists)x=s.data()}page(id?'Edit Competition':'Create Competition','Configure schedule, eligibility and existing quiz references.','<div class="card">'+input('cpTitle','Competition title',x.title)+input('cpType','Type (Skill Sprint / Weekly Challenge / etc.)',x.type)+input('cpCategory','Category',x.category)+input('cpClass','Class level',x.classLevel)+input('cpSubject','Subject',x.subject)+input('cpStart','Start date/time',x.startAt)+input('cpEnd','End date/time',x.endAt)+input('cpDuration','Duration in minutes',x.durationMinutes)+input('cpCount','Question count',x.questionCount)+input('cpQuizIds','Existing quiz IDs (comma separated)',Array.isArray(x.quizIds)?x.quizIds.join(','):x.quizIds)+input('cpEntry','Entry coins',x.entryCoins)+area('cpDesc','Description',x.description)+btn('Save Competition','ssAdminSaveCompetition('+JSON.stringify(id||'')+')','gold')+'</div>')};
window.ssAdminSaveCompetition=async function(id){if(!ok())return;var title=val('cpTitle');if(!title)return toastx('Enter a competition title.');var ids=val('cpQuizIds').split(',').map(function(x){return x.trim()}).filter(Boolean);try{if(ids.length){var q=await Promise.all(ids.map(function(x){return db().collection('quizzes').doc(x).get()}));var bad=ids.filter(function(x,i){return !q[i].exists});if(bad.length)return toastx('Unknown quiz ID(s): '+bad.join(', '))}var d={title:title,type:val('cpType'),category:val('cpCategory'),classLevel:val('cpClass'),subject:val('cpSubject'),startAt:val('cpStart'),endAt:val('cpEnd'),durationMinutes:Number(val('cpDuration'))||0,questionCount:Number(val('cpCount'))||0,quizIds:ids,entryCoins:Number(val('cpEntry'))||0,description:val('cpDesc'),status:'draft',published:false,updatedBy:au().uid,updatedAt:ts()};if(id)await db().collection('competitions').doc(id).set(d,{merge:true});else{d.createdBy=au().uid;d.createdAt=ts();await db().collection('competitions').add(d)}toastx('Competition saved ✓');ssAdminCompetitions()}catch(e){toastx(e.message||'Could not save competition')}};
window.ssAdminAssignments=async function(){
 if(!ok())return;
 try{
   var a=await docs('assignments');
   page('Assignments','Create, assign, edit and manage teacher-to-learner work.',
     '<div class="card admin">'+
       btn('＋ Create Assignment','ssAdminAssignmentForm("")','gold')+
       '<p class="small muted">Assign an existing quiz to a specific learner. Assignment records remain separate from quiz content.</p>'+
     '</div>'+
     (a.length?a.slice(0,100).map(function(x){
       return '<div class="card">'+
         '<div class="row"><b>'+esc(x.title||x.assignmentTitle||'Assignment')+'</b><span class="badge">'+esc(x.status||'active')+'</span></div>'+
         '<div class="small muted">Teacher: '+esc(x.teacherName||x.teacherUid||x.assignedBy||'—')+
         '<br>Learner: '+esc(x.studentName||x.studentUid||x.learnerUid||'—')+
         '<br>Quiz: '+esc(x.quizTitle||x.quizId||'—')+
         (x.dueAt?'<br>Due: '+esc(x.dueAt):'')+
         '</div>'+
         '<div class="row" style="margin-top:8px">'+
           btn('Edit','ssAdminAssignmentForm("'+esc(x.id)+'")')+
           btn('Delete','ssAdminAssignmentDelete("'+esc(x.id)+'")','light')+
         '</div>'+
       '</div>';
     }).join(''):'<div class="card">No assignments found.</div>')
   );
 }catch(e){toastx(e.message||'Could not load assignments')}
};
window.ssAdminAssignmentForm=async function(id){
 if(!ok())return;
 try{
   var x={},users=await docs('users'),quizzes=await docs('quizzes');
   if(id){var s=await db().collection('assignments').doc(id).get();if(s.exists)x=s.data()}
   var teachers=users.filter(function(u){return u.role==='teacher'}),
       learners=users.filter(function(u){return !u.role||u.role==='learner'});
   function opt(value,label,selected){return '<option value="'+esc(value)+'"'+(String(value||'')===String(selected||'')?' selected':'')+'>'+esc(label)+'</option>'}
   var th='<label>Teacher</label><select id="asTeacher" class="input">'+
     opt('','Select teacher',x.teacherUid)+
     teachers.map(function(u){return opt(u.uid||u.id,u.name||u.displayName||u.email||'Teacher',x.teacherUid)}).join('')+
     '</select>';
   var le='<label>Learner</label><select id="asLearner" class="input">'+
     opt('','Select learner',x.studentUid||x.learnerUid)+
     learners.map(function(u){return opt(u.uid||u.id,u.name||u.displayName||u.email||'Learner',x.studentUid||x.learnerUid)}).join('')+
     '</select>';
   var q='<label>Quiz</label><select id="asQuiz" class="input">'+
     opt('','Select quiz',x.quizId)+
     quizzes.map(function(v){return opt(v.id,v.title||'Quiz',x.quizId)}).join('')+
     '</select>';
   var statuses=['active','draft','completed','cancelled'];
   var st='<label>Status</label><select id="asStatus" class="input">'+
     statuses.map(function(v){return opt(v,v,x.status||'active')}).join('')+'</select>';
   page(id?'Edit Assignment':'Create Assignment','Assign existing quiz content to a learner.',
     '<div class="card">'+
       input('asTitle','Assignment title',x.title||x.assignmentTitle)+
       area('asDesc','Description',x.description)+
       th+le+q+
       input('asDue','Due date/time',x.dueAt||'')+
       st+
       btn('Save Assignment','ssAdminAssignmentSave("'+esc(id||'')+'")','gold')+
     '</div>'
   );
 }catch(e){toastx(e.message||'Could not open assignment form')}
};
window.ssAdminAssignmentSave=async function(id){
 if(!ok())return;
 var title=val('asTitle'),teacher=val('asTeacher'),learner=val('asLearner'),quiz=val('asQuiz');
 if(!title)return toastx('Enter an assignment title.');
 if(!teacher)return toastx('Select a teacher.');
 if(!learner)return toastx('Select a learner.');
 if(!quiz)return toastx('Select a quiz.');
 try{
   var t=await db().collection('users').doc(teacher).get(),
       l=await db().collection('users').doc(learner).get(),
       q=await db().collection('quizzes').doc(quiz).get();
   if(!t.exists)return toastx('Selected teacher was not found.');
   if(!l.exists)return toastx('Selected learner was not found.');
   if(!q.exists)return toastx('Selected quiz was not found.');
   var d={
     title:title,
     assignmentTitle:title,
     description:val('asDesc'),
     teacherUid:teacher,
     teacherName:t.data().name||t.data().displayName||t.data().email||'Teacher',
     studentUid:learner,
     studentName:l.data().name||l.data().displayName||l.data().email||'Learner',
     quizId:quiz,
     quizTitle:q.data().title||'Quiz',
     dueAt:val('asDue'),
     status:val('asStatus')||'active',
     updatedBy:au().uid,
     updatedAt:ts()
   };
   if(id)await db().collection('assignments').doc(id).set(d,{merge:true});
   else{d.createdBy=au().uid;d.createdAt=ts();await db().collection('assignments').add(d)}
   toastx('Assignment saved ✓');
   ssAdminAssignments();
 }catch(e){toastx(e.message||'Could not save assignment')}
};
window.ssAdminAssignmentDelete=async function(id){
 if(!ok()||!id)return;
 if(!confirm('Delete this assignment permanently?'))return;
 try{
   await db().collection('assignments').doc(id).delete();
   toastx('Assignment deleted ✓');
   ssAdminAssignments();
 }catch(e){toastx(e.message||'Could not delete assignment')}
};
window.ssAdminV3Leaderboards=async function(){if(!ok())return;var a=await docs('leaderboards');page('Leaderboards','Review leaderboard configuration and published ranking records.','<div class="card admin"><b>Leaderboard records</b><p class="small muted">Leaderboard records are displayed from Firestore. Ranking calculation remains separate from Admin configuration.</p></div>'+(a.length?a.slice(0,100).map(function(x){return '<div class="card"><div class="row"><b>'+esc(x.title||x.name||'Leaderboard')+'</b><span class="badge">'+esc(x.status||'published')+'</span></div><div class="small muted">Scope: '+esc(x.scope||x.type||'Overall')+' • Class: '+esc(x.classLevel||'All')+'<br>Period: '+esc(x.period||'—')+'</div></div>'}).join(''):'<div class="card">No leaderboard records yet.</div>'))};
window.ssAdminV3Rewards=async function(){if(!ok())return;var r=await docs('rewards'),bds=await docs('badges');page('Rewards & Badges','Manage reward and badge definitions used by the learner experience.','<div class="card admin">'+btn('＋ Add Reward','ssAdminV3RewardForm()','gold')+'</div><div class="section"><b>Rewards ('+r.length+')</b></div>'+(r.length?r.slice(0,100).map(function(x){return '<div class="card"><div class="row"><b>'+esc(x.title||x.name||'Reward')+'</b><span class="badge">'+esc(x.status||'draft')+'</span></div><div class="small muted">Coins: '+esc(x.coins||0)+' • XP: '+esc(x.xp||0)+'<br>'+esc(x.description||'')+'</div></div>'}).join(''):'<div class="card">No rewards yet.</div>')+'<div class="section"><b>Badges ('+bds.length+')</b></div>'+(bds.length?bds.slice(0,100).map(function(x){return '<div class="card"><div class="row"><b>'+esc(x.title||x.name||'Badge')+'</b><span class="badge">'+esc(x.status||'draft')+'</span></div><div class="small muted">'+esc(x.description||'')+'</div></div>'}).join(''):'<div class="card">No badges yet.</div>'))};
window.ssAdminV3Relationships=async function(){if(!ok())return;var r=await docs('relationships');page('Relationships','Review parent, teacher and learner links.','<div class="notice">Relationship records are read for administration and audit. Do not expose private learner data unnecessarily.</div>'+(r.length?r.slice(0,100).map(function(x){return '<div class="card"><div class="row"><b>'+esc(x.status||'active')+'</b><span class="badge">'+esc(x.type||'relationship')+'</span></div><div class="small muted">Learner: '+esc(x.studentUid||x.learnerUid||'—')+'<br>Parent: '+esc(x.parentUid||'—')+'<br>Teacher: '+esc(x.teacherUid||'—')+'</div></div>'}).join(''):'<div class="card">No relationships found.</div>'))};
window.ssAdminV3Learners=async function(){if(!ok())return;var u=await docs('users'),l=u.filter(function(x){return !x.role||x.role==='learner'});page('Learner Profiles','Administrative learner profile view.','<div class="notice">Read-only profile audit. Changes to learner identity should be handled through the dedicated Users & Roles workflow.</div>'+(l.length?l.slice(0,100).map(function(x){return '<div class="card"><div class="row"><b>'+esc(x.name||x.displayName||x.email||'Learner')+'</b><span class="badge">'+esc(x.role||'learner')+'</span></div><div class="small muted">Class: '+esc(x.studentClass||x.classNumber||'—')+' • Board: '+esc(x.board||'—')+'<br>Academic Year: '+esc(x.academicYear||'—')+'<br>School: '+esc(x.school||'—')+'<br>XP: '+esc(x.xp||0)+' • Coins: '+esc(x.coins||0)+' • Level: '+esc(x.level||1)+'</div></div>'}).join(''):'<div class="card">No learner profiles found.</div>'))};
window.ssAdminV3Records=async function(){if(!ok())return;var a=await docs('quizAttempts');page('Learning Records','Administrative audit of quiz attempts and learning history.','<div class="card"><b>Total attempts: '+a.length+'</b><p class="small muted">Latest records are shown below. Detailed learner analytics remain available through Analytics.</p></div>'+(a.length?a.slice(0,100).map(function(x){return '<div class="card"><div class="row"><b>'+esc(x.quizTitle||x.quizId||'Quiz')+'</b><span class="badge">'+esc(x.percentage||0)+'%</span></div><div class="small muted">Learner: '+esc(x.uid||x.studentUid||'—')+' • Score: '+esc(x.score||0)+' / '+esc(x.total||0)+'</div></div>'}).join(''):'<div class="card">No quiz attempts yet.</div>'))};
})();

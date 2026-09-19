/* Skill Saga — targeted Teacher Dashboard data-sync layer.
 * Loaded after the finalized baseline. It keeps the learner profile and quizAttempts as sources of truth.
 */
(function(){
  async function canonicalStudent(studentRef){
    var db=window.cloudDb, me=window.user&&window.user();
    if(!db||!me||me.role!=='teacher'||!studentRef||!studentRef.uid)return studentRef;
    var uid=studentRef.uid, profile=null, attempts=[];
    try{
      var ps=await db.collection('users').doc(uid).get();
      if(ps.exists)profile=ps.data();
    }catch(e){ console.warn('Teacher learner profile read failed',e); }
    try{
      var as=await db.collection('quizAttempts').where('uid','==',uid).get();
      attempts=as.docs.map(function(d){return {id:d.id,...d.data()};});
    }catch(e){ console.warn('Teacher learner attempts read failed',e); }

    var accuracy;
    if(attempts.length){
      var answered=attempts.reduce(function(n,a){return n+Number(a.total||0)},0);
      var correct=attempts.reduce(function(n,a){return n+Number(a.score||0)},0);
      accuracy=answered?Math.round(correct/answered*100):0;
    }else{
      accuracy=Number(profile&&profile.accuracy!=null?profile.accuracy:(studentRef.studentAccuracy||studentRef.accuracy||0));
    }
    var p=profile||studentRef;
    return Object.assign({},studentRef,p,{
      uid:uid,
      name:p.name||studentRef.name||'Student',
      email:p.email||studentRef.email||'',
      xp:Number(p.xp!=null?p.xp:(studentRef.studentXp||studentRef.xp||0)),
      level:Number(p.level!=null?p.level:(studentRef.studentLevel||studentRef.level||1)),
      accuracy:accuracy,
      quizzes:attempts.length||Number(p.quizzes!=null?p.quizzes:(studentRef.studentQuizzes||studentRef.quizzes||0)),
      streak:Number(p.streak!=null?p.streak:(studentRef.studentStreak||studentRef.streak||0)),
      coins:Number(p.coins!=null?p.coins:(studentRef.studentCoins||studentRef.coins||0)),
      mastery:p.mastery||p.skillMastery||studentRef.mastery||{},
      assignedQuizzes:p.assignedQuizzes||studentRef.assignedQuizzes||[],
      _teacherAttempts:attempts
    });
  }

  async function canonicalStudents(){
    var me=window.user&&window.user();
    if(!me||me.role!=='teacher')return [];
    var refs=Array.isArray(me.linkedStudents)?me.linkedStudents:[];
    return Promise.all(refs.filter(function(x){return x&&x.uid;}).map(canonicalStudent));
  }

  async function teacherDashboardCanonical(){
    var me=window.user&&window.user();
    if(!me||me.role!=='teacher')return window.toast&&window.toast('Teacher account required');
    var students=await canonicalStudents();
    me.linkedStudents=students;
    var totalXP=students.reduce(function(a,x){return a+x.xp},0);
    var avg=students.length?Math.round(students.reduce(function(a,x){return a+x.accuracy},0)/students.length):0;
    var totalQ=students.reduce(function(a,x){return a+x.quizzes},0);
    var html='<div class="row"><div><h1 style="margin:0">Teacher Dashboard</h1><div class="muted">Live learner performance from Skill Saga records.</div></div></div>'+
      '<div class="grid" style="margin-top:15px">'+
      '<div class="tile"><span class="ico">🎓</span><b>'+students.length+'</b><small>Students</small></div>'+
      '<div class="tile"><span class="ico">⭐</span><b>'+totalXP+'</b><small>Total XP</small></div>'+
      '<div class="tile"><span class="ico">🎯</span><b>'+avg+'%</b><small>Avg Accuracy</small></div>'+
      '<div class="tile"><span class="ico">📚</span><b>'+totalQ+'</b><small>Quizzes</small></div></div>'+
      '<div class="section"><b>Link a Student</b></div>'+
      '<div class="card"><input id="linkStudentEmail" class="input" type="text" autocomplete="off" placeholder="Student Link Code (e.g. SS-ABC123)"><button class="btn block" style="margin-top:8px" onclick="linkStudentByEmail()">🔗 Link Student</button></div>'+
      '<div class="section"><b>My Students</b></div>'+
      (students.length?students.map(function(x){return '<div class="card" style="margin-bottom:10px"><div class="row"><div style="font-size:28px">🎓</div><div style="flex:1"><b>'+esc(x.name||'Student')+'</b><div class="muted">'+esc(x.email||'Linked learner')+' • '+x.accuracy+'% accuracy • '+x.quizzes+' quizzes</div></div><button class="btn light" onclick="viewTeacherStudent(\''+String(x.uid).replace(/'/g,"\\'")+'\')">View</button></div></div>';}).join(''):'<div class="card"><div class="muted">No students linked yet.</div></div>')+
      '<div class="section"><b>Teacher Tools</b></div><div class="grid"><div class="tile" onclick="teacherClassProgress()"><span class="ico">📊</span><b>Class Progress</b><small>Live performance</small></div><div class="tile" onclick="teacherWeakTopics()"><span class="ico">🎯</span><b>Weak Topics</b><small>Needs attention</small></div><div class="tile" onclick="teacherAssignments()"><span class="ico">📝</span><b>Assignments</b><small>Assigned quizzes</small></div><div class="tile" onclick="teacherSkills()"><span class="ico">🧬</span><b>Skill DNA</b><small>Skill development</small></div></div><button class="btn light block" style="margin-top:18px" onclick="logout()">Log out</button>';
    shell(html);
  }

  async function viewTeacherStudentCanonical(uid){
    var me=window.user&&window.user();
    var refs=Array.isArray(me&&me.linkedStudents)?me.linkedStudents:[];
    var ref=refs.find(function(x){return x&&x.uid===uid;});
    if(!ref)return window.toast&&window.toast('Student not found');
    var x=await canonicalStudent(ref);
    var mastery=Array.isArray(x.mastery)?x.mastery:Object.values(x.mastery||{});
    var weak=mastery.slice().sort(function(a,b){return Number(a.mastery||a.accuracy||0)-Number(b.mastery||b.accuracy||0)}).slice(0,3);
    var recent=(x._teacherAttempts||[]).sort(function(a,b){return (b.completedAt&&b.completedAt.toMillis?b.completedAt.toMillis():0)-(a.completedAt&&a.completedAt.toMillis?a.completedAt.toMillis():0)}).slice(0,5);
    var recentHtml=recent.length?recent.map(function(a){return '<div class="card" style="margin-bottom:8px"><div class="row"><b>'+esc(a.quizTitle||a.title||'Quiz')+'</b><b>'+Number(a.percentage!=null?a.percentage:(a.total?Math.round(Number(a.score||0)/Number(a.total)*100):0))+'%</b></div><div class="muted">'+Number(a.score||0)+'/'+Number(a.total||0)+' correct</div></div>';}).join(''):'<div class="card"><div class="muted">No quiz attempts yet.</div></div>';
    shell('<div class="row"><button class="back" onclick="teacherDashboard()">‹</button><div><h1 style="margin:0">'+esc(x.name||'Student')+'</h1><div class="muted">Live student performance</div></div></div><div class="grid" style="margin-top:18px"><div class="tile"><span class="ico">⭐</span><b>'+x.xp+'</b><small>XP</small></div><div class="tile"><span class="ico">🏅</span><b>Level '+x.level+'</b><small>Level</small></div><div class="tile"><span class="ico">🎯</span><b>'+x.accuracy+'%</b><small>Accuracy</small></div><div class="tile"><span class="ico">🔥</span><b>'+x.streak+'</b><small>Streak</small></div></div><div class="section"><b>Learning Summary</b></div><div class="card"><div class="row"><span>Quizzes completed</span><b>'+x.quizzes+'</b></div><div class="row" style="margin-top:12px"><span>Skill Saga Coins</span><b>🪙 '+x.coins+'</b></div></div><div class="section"><b>Recent Attempts</b></div>'+recentHtml+'<div class="section"><b>Topics Needing Attention</b></div>'+(weak.length?weak.map(function(m){var s=Number(m.mastery||m.accuracy||0);return '<div class="card" style="margin-bottom:8px"><div class="row"><span>'+esc(m.topic||m.name||'General')+'</span><b>'+s+'%</b></div><div class="bar" style="margin-top:8px"><i style="width:'+Math.max(0,Math.min(100,s))+'%"></i></div></div>';}).join(''):'<div class="card"><div class="muted">No topic mastery data available yet.</div></div>'));
  }

  window.teacherDashboard=teacherDashboardCanonical;
  window.viewTeacherStudent=viewTeacherStudentCanonical;
  window.refreshLinkedStudents=async function(){return canonicalStudents();};
  window.teacherClassProgress=async function(){
    var students=await canonicalStudents();
    if(!students.length)return window.toast&&window.toast('Link students first');
    var totalXP=students.reduce(function(a,x){return a+x.xp},0), totalQ=students.reduce(function(a,x){return a+x.quizzes},0), avg=Math.round(students.reduce(function(a,x){return a+x.accuracy},0)/students.length);
    var html='<div class="row"><button class="back" onclick="teacherDashboard()">‹</button><div><h1 style="margin:0">Class Progress</h1><div class="muted">Live overview of linked learners</div></div></div><div class="grid" style="margin-top:18px"><div class="tile"><span class="ico">👨‍🎓</span><b>'+students.length+'</b><small>Students</small></div><div class="tile"><span class="ico">⭐</span><b>'+totalXP+'</b><small>Total XP</small></div><div class="tile"><span class="ico">📚</span><b>'+totalQ+'</b><small>Quizzes</small></div><div class="tile"><span class="ico">🎯</span><b>'+avg+'%</b><small>Avg Accuracy</small></div></div><div class="section"><b>Student Progress</b></div>'+students.map(function(x){return '<div class="card" style="margin-bottom:10px"><div class="row"><b>'+esc(x.name||'Student')+'</b><b>'+x.accuracy+'%</b></div><div class="muted" style="margin-top:6px">Level '+x.level+' · '+x.quizzes+' quizzes · '+x.xp+' XP · 🔥 '+x.streak+'</div></div>';}).join('');
    shell(html);
  };
})();

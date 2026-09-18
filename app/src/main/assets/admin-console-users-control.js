(function(){'use strict';
function ok(){return ssAdminGuard()}function db(){return ssAdminDB()}function au(){return ssAdminAuth()}function ts(){return ssAdminStamp()}function esc(v){return ssAdminEsc(v)}function page(t,s,b){return ssAdminPage(t,s,b)}function btn(t,f,k){return ssAdminButton(t,f,k)}function val(id){var e=document.getElementById(id);return e?e.value.trim():''}function field(id,l,v){return '<label>'+esc(l)+'</label><input id="'+id+'" class="input" value="'+esc(v||'')+'">'}
window.ssAdminUsersControl=async function(filter){
 if(!ok())return;
 var u=await db().collection('users').get().then(function(s){return s.docs.map(function(d){return Object.assign({id:d.id},d.data())})});
 if(filter)u=u.filter(function(x){return x.role===filter});
 var title=filter?(filter==='parent'?'Parent Control':'Teacher Control'):'Users & Roles Control';
 var desc=filter?(filter==='parent'?'Manage parent accounts, child-link access and basic permissions.':'Manage teacher accounts, class/content access and basic permissions.'):'Manage learner, parent, teacher and admin records and roles.';
 var cards='<div class="card admin">'+btn('＋ Create User Record','ssAdminUserEdit("")','gold')+btn('All Users','ssAdminUsersControl()')+btn('Parents','ssAdminUsersControl("parent")')+btn('Teachers','ssAdminUsersControl("teacher")')+'</div>';
 cards+=(u.length?u.slice(0,100).map(function(x){return '<div class="card"><div class="row"><b>'+esc(x.name||x.displayName||x.email||'User')+'</b><span class="badge">'+esc(x.role||'learner')+'</span></div><div class="small muted">'+esc(x.email||'')+' • Class '+esc(x.studentClass||x.classNumber||'—')+' • Status '+esc(x.accountStatus||'active')+'</div>'+btn('Edit','ssAdminUserEdit("'+esc(x.id)+'")')+'</div>'}).join(''):'<div class="card">No matching user records.</div>');
 page(title,desc,cards);
};
window.ssAdminUserEdit=async function(id){
 if(!ok())return;var x={};
 if(id){var s=await db().collection('users').doc(id).get();if(s.exists)x=s.data()}
 page(id?'Edit User':'Create User Record','Account, role and basic access metadata.','<div class="card">'+field('ucName','Name',x.name||x.displayName)+field('ucEmail','Email',x.email)+field('ucRole','Role (learner/parent/teacher/admin)',x.role||'learner')+field('ucClass','Class',x.studentClass||x.classNumber)+field('ucBoard','Board',x.board)+field('ucStatus','Account Status (active/suspended/blocked)',x.accountStatus||'active')+field('ucPermissions','Permissions (comma separated)',Array.isArray(x.permissions)?x.permissions.join(','):x.permissions)+field('ucRolePermissions','Role Permissions (comma separated)',Array.isArray(x.rolePermissions)?x.rolePermissions.join(','):x.rolePermissions)+field('ucContentAccess','Content Access (all/free/premium/assigned)',x.contentAccess||'all')+btn('Save User Record','ssAdminUserSave("'+esc(id||'')+'")','gold')+'</div>');
};
window.ssAdminUserSave=async function(id){
 if(!ok())return;
 var role=val('ucRole')||'learner',status=val('ucStatus')||'active';
 if(!['learner','parent','teacher','admin'].includes(role))return toast('Invalid role.');
 if(!['active','suspended','blocked'].includes(status))return toast('Invalid account status.');
 var d={name:val('ucName'),displayName:val('ucName'),email:val('ucEmail'),role:role,studentClass:val('ucClass'),board:val('ucBoard'),accountStatus:status,permissions:val('ucPermissions').split(',').map(function(x){return x.trim()}).filter(Boolean),rolePermissions:val('ucRolePermissions').split(',').map(function(x){return x.trim()}).filter(Boolean),contentAccess:val('ucContentAccess')||'all',updatedBy:au().uid,updatedAt:ts()};
 try{if(id)await db().collection('users').doc(id).set(d,{merge:true});else{d.createdBy=au().uid;d.createdAt=ts();await db().collection('users').add(d)}toast('User record saved ✓');ssAdminUsersControl()}catch(e){toast(e.message||'Could not save user')}
};
})();
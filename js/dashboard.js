shell('dashboard','Dashboard');
const E=DB.g('employees'),A=DB.g('attendance'),L=DB.g('leaves'),D=DB.g('departments'),t=today();
const PR=['Present','Late','Half-Day'];
const pres=A.filter(a=>a.date==t&&PR.includes(a.status)).length;
const onL=L.filter(l=>l.status=='Approved'&&l.start<=t&&l.end>=t).length;
const sal=E.filter(e=>e.status=='Active').reduce((s,e)=>s+e.salary,0);
const C=[['Total Employees',E.length,'people','primary'],['Active',E.filter(e=>e.status=='Active').length,'person-check','success'],['Inactive',E.filter(e=>e.status!='Active').length,'person-x','secondary'],['Departments',D.length,'diagram-3','info'],["Today's Attendance",pres,'calendar-check','success'],['On Leave Today',onL,'calendar-x','warning'],['Monthly Salary',money(sal),'cash-stack','primary'],['Pending Leaves',L.filter(l=>l.status=='Pending').length,'hourglass-split','danger']];
const pend=L.filter(l=>l.status=='Pending');
$('#content').innerHTML=`<div class="row g-3 mb-3">${C.map(c=>`<div class="col-6 col-xl-3"><div class="card stat"><div class="ic bg-${c[3]}-subtle text-${c[3]}"><i class="bi bi-${c[2]}"></i></div><div><small class="text-secondary">${c[0]}</small><h3>${c[1]}</h3></div></div></div>`).join('')}</div>
<div class="row g-3 mb-3"><div class="col-lg-5"><div class="card p-3"><h6>Employees by Department</h6><canvas id="c1"></canvas></div></div><div class="col-lg-7"><div class="card p-3"><h6>Attendance – Last 7 Days</h6><canvas id="c2"></canvas></div></div></div>
<div class="row g-3"><div class="col-lg-6"><div class="card p-3"><h6>Pending Leave Requests</h6>${pend.map(l=>`<div class="d-flex justify-content-between border-bottom py-2"><span>${empName(l.emp)} · ${l.type}</span><small class="text-secondary">${l.start}</small></div>`).join('')||'<p class="text-secondary mb-0">None pending</p>'}<a href="leaves.html" class="mt-2">Manage →</a></div></div>
<div class="col-lg-6"><div class="card p-3"><h6>Recent Activities</h6>${DB.g('activity').slice(0,6).map(a=>`<div class="border-bottom py-2">${a.m}<br><small class="text-secondary">${a.t}</small></div>`).join('')}</div></div></div>`;
new Chart($('#c1'),{type:'doughnut',data:{labels:D.map(d=>d.name),datasets:[{data:D.map(d=>E.filter(e=>e.dept==d.name).length),backgroundColor:['#2563EB','#10B981','#F59E0B','#8B5CF6']}]}});
const ds=Array.from({length:7},(_,i)=>new Date(Date.now()-(6-i)*864e5).toISOString().slice(0,10));
new Chart($('#c2'),{type:'bar',data:{labels:ds.map(d=>d.slice(5)),datasets:[{label:'Present',data:ds.map(d=>A.filter(a=>a.date==d&&PR.includes(a.status)).length),backgroundColor:'#10B981'},{label:'Absent',data:ds.map(d=>A.filter(a=>a.date==d&&a.status=='Absent').length),backgroundColor:'#EF4444'}]}});

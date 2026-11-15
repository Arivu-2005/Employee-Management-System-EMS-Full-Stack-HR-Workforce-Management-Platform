shell('reports','Reports & Analytics');
const R={
 Employees:()=>[['ID','Name','Department','Designation','Salary','Status'],DB.g('employees').map(e=>[[e.id,e.name,e.dept,e.desig,e.salary,e.status],e.joined])],
 Departments:()=>[['Department','Manager','Employees'],DB.g('departments').map(d=>[[d.name,d.manager,DB.g('employees').filter(e=>e.dept==d.name).length],''])],
 Attendance:()=>[['Date','Employee','Status','In','Out'],DB.g('attendance').map(a=>[[a.date,empName(a.emp),a.status,a.in,a.out],a.date])],
 Leaves:()=>[['Employee','Type','From','To','Status'],DB.g('leaves').map(l=>[[empName(l.emp),l.type,l.start,l.end,l.status],l.start])],
 Salary:()=>[['Employee','Department','Basic Salary'],DB.g('employees').map(e=>[[e.name,e.dept,e.salary],e.joined])],
 Payroll:()=>[['Employee','Month','Gross','Deductions','Net'],DB.g('payroll').map(p=>[[empName(p.emp),p.month,gross(p),p.ded,net(p)],p.month+'-01'])],
 Performance:()=>[['Employee','Month','Rating','Productivity','Tasks'],DB.g('performance').map(p=>[[empName(p.emp),p.month,p.rating,p.prod,p.tasks],p.month+'-01'])]};
$('#content').innerHTML=`<div class="card p-3 mb-3 no-print"><div class="row g-2"><div class="col-md-3"><select id="rt" class="form-select">${Object.keys(R).map(k=>`<option>${k}</option>`).join('')}</select></div><div class="col-md-2"><input id="from" type="date" class="form-control"></div><div class="col-md-2"><input id="to" type="date" class="form-control"></div><div class="col-md-5 d-flex gap-2"><button id="csvb" class="btn btn-success"><i class="bi bi-filetype-csv"></i> CSV</button><button id="prn" class="btn btn-primary"><i class="bi bi-printer"></i> Print</button><button id="pdf" class="btn btn-outline-primary"><i class="bi bi-file-pdf"></i> PDF</button></div></div></div><div class="card"><div class="p-3"><h5 id="rh"></h5></div><div class="table-responsive"><table class="table mb-0" id="rtb"></table></div></div>`;
let cur=[[],[]];
const draw=()=>{const [h,rows]=R[$('#rt').value](),f=$('#from').value,t=$('#to').value;
 const r=rows.filter(x=>!x[1]||((!f||x[1]>=f)&&(!t||x[1]<=t))).map(x=>x[0]);cur=[h,r];
 $('#rh').textContent=$('#rt').value+' Report ('+r.length+' rows)';
 $('#rtb').innerHTML=`<thead><tr>${h.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${r.map(x=>`<tr>${x.map(c=>`<td>${c??''}</td>`).join('')}</tr>`).join('')||'<tr><td class="text-center text-secondary py-4">No data</td></tr>'}</tbody>`};
['rt','from','to'].forEach(i=>$('#'+i).onchange=draw);
$('#csvb').onclick=()=>csv(cur[0],cur[1],$('#rt').value.toLowerCase()+'-report');
$('#prn').onclick=()=>window.print();
$('#pdf').onclick=()=>{toast('Choose "Save as PDF" in the print dialog','info');setTimeout(()=>window.print(),900)};
draw();

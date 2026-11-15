const $=s=>document.querySelector(s);
const DB={g:(k,d=[])=>{try{const v=localStorage.getItem('ems_'+k);return v?JSON.parse(v):d}catch(e){return d}},s:(k,v)=>localStorage.setItem('ems_'+k,JSON.stringify(v))};
const today=()=>new Date().toISOString().slice(0,10);
const money=n=>'₹'+(+n||0).toLocaleString('en-IN');
const uid=()=>'X'+Date.now().toString(36)+Math.random().toString(36).slice(2,5);
const empName=id=>(DB.g('employees').find(e=>e.id===id)||{name:'(deleted)'}).name;
const toast=(t,i='success')=>Swal.fire({toast:true,position:'top-end',icon:i,title:t,showConfirmButton:false,timer:2000});
const BC={Active:'success',Inactive:'secondary',Present:'success',Absent:'danger','Half-Day':'warning',Late:'warning',Leave:'info',Pending:'warning',Approved:'success',Rejected:'danger'};
const badge=s=>`<span class="badge bg-${BC[s]||'primary'}-subtle text-${BC[s]||'primary'}-emphasis">${s}</span>`;
const log=m=>{const a=DB.g('activity');a.unshift({m,t:new Date().toLocaleString()});DB.s('activity',a.slice(0,30))};
const days=(a,b)=>{const r=[];for(let d=new Date(a);d<=new Date(b);d.setUTCDate(d.getUTCDate()+1))r.push(d.toISOString().slice(0,10));return r};
const gross=p=>(+p.basic||0)+(+p.hra||0)+(+p.allow||0)+(+p.ot||0);
const net=p=>gross(p)-(+p.ded||0);
const csv=(h,rows,name)=>{const t=[h,...rows].map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/csv'}));a.download=name+'.csv';a.click()};
function seed(force){
 if(!force&&DB.g('seeded',0))return;
 Object.keys(localStorage).filter(k=>k.startsWith('ems_')&&k!=='ems_session').forEach(k=>localStorage.removeItem(k));
 const dn=['Engineering','Human Resources','Finance','Marketing'];
 const names=['Aarav Sharma','Priya Nair','Rohan Mehta','Sneha Iyer','Vikram Singh','Ananya Das','Karthik Raj','Meera Pillai','Arjun Reddy','Divya Menon'];
 const E=names.map((n,i)=>({id:'EMP'+String(i+1).padStart(3,'0'),name:n,email:n.split(' ')[0].toLowerCase()+'@company.com',phone:'98765432'+(10+i),gender:i%2?'Female':'Male',dob:'1990-0'+(i%9+1)+'-15',address:'Chennai, India',dept:dn[i%4],desig:['Developer','HR Executive','Accountant','Marketer','Team Lead'][i%5],joined:'202'+(i%4)+'-0'+(i%9+1)+'-10',type:'Full-time',salary:30000+i*5000,status:i==9?'Inactive':'Active'}));
 DB.s('employees',E);
 DB.s('departments',dn.map((n,i)=>({id:'D'+(i+1),name:n,desc:n+' team',manager:E[i].name})));
 const A=[];E.filter(e=>e.status=='Active').forEach((e,i)=>{for(let d=0;d<7;d++){const dt=new Date(Date.now()-d*864e5).toISOString().slice(0,10),s=(i+d)%7==0?'Absent':(i+d)%5==0?'Late':'Present';A.push({id:uid(),emp:e.id,date:dt,status:s,in:s=='Absent'?'':s=='Late'?'09:45':'09:00',out:s=='Absent'?'':'18:00'})}});
 DB.s('attendance',A);
 const t=today();
 DB.s('leaves',[{id:uid(),emp:'EMP002',type:'Casual Leave',start:t,end:t,reason:'Personal work',status:'Pending'},{id:uid(),emp:'EMP003',type:'Sick Leave',start:t,end:t,reason:'Fever',status:'Pending'},{id:uid(),emp:'EMP005',type:'Earned Leave',start:'2026-10-05',end:'2026-10-07',reason:'Vacation',status:'Approved'}]);
 DB.s('performance',[{id:uid(),emp:'EMP001',month:t.slice(0,7),rating:5,prod:92,tasks:95,remarks:'Excellent delivery'},{id:uid(),emp:'EMP004',month:t.slice(0,7),rating:3,prod:70,tasks:75,remarks:'Needs improvement'}]);
 DB.s('payroll',[]);DB.s('activity',[{m:'Demo data loaded',t:new Date().toLocaleString()}]);
 DB.s('admin',{name:'Admin User',email:'admin@ems.com',password:'admin123'});
 DB.s('company',{name:'EMS Pro Pvt Ltd',address:'Chennai, India',email:'hr@emspro.com'});
 DB.s('seeded',1);
}
const NAV=[['dashboard','speedometer2','Dashboard'],['employees','people','Employees'],['departments','diagram-3','Departments'],['attendance','calendar-check','Attendance'],['leaves','calendar-x','Leaves'],['payroll','cash-stack','Payroll'],['performance','graph-up-arrow','Performance'],['reports','file-earmark-bar-graph','Reports'],['settings','gear','Settings']];
function shell(page,title){
 if(!DB.g('session',null))return location.replace('index.html');
 seed();const a=DB.g('admin',{});
 $('#app').innerHTML=`<aside class="sidebar offcanvas-lg offcanvas-start" id="sb"><div class="brand"><i class="bi bi-buildings"></i> EMS Pro</div><nav>${NAV.map(n=>`<a href="${n[0]}.html" class="${n[0]==page?'active':''}"><i class="bi bi-${n[1]}"></i><span>${n[2]}</span></a>`).join('')}</nav></aside><main class="main"><header class="topbar"><button class="btn btn-light d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#sb"><i class="bi bi-list"></i></button><button class="btn btn-light d-none d-lg-inline" id="tg"><i class="bi bi-layout-sidebar"></i></button><h5 class="mb-0 me-auto">${title}</h5><span class="text-secondary d-none d-md-inline">${a.name||'Admin'}</span><button class="btn btn-outline-danger btn-sm" id="lo"><i class="bi bi-box-arrow-right"></i> Logout</button></header><div id="content" class="p-3 p-md-4"></div></main>`;
 $('#tg').onclick=()=>document.body.classList.toggle('collapsed');
 $('#lo').onclick=()=>{localStorage.removeItem('ems_session');location='index.html'};
}
const opts=o=>(typeof o=='function'?o():o).map(x=>Array.isArray(x)?x:[x,x]);
function crud(c){
 let q='',f='',pg=1;const P=8,el=$('#content');
 el.innerHTML=`${c.top?'<div id="top"></div>':''}<div class="d-flex flex-wrap gap-2 mb-3"><input id="q" class="form-control w-auto flex-grow-1" placeholder="Search...">${c.filter?`<select id="fl" class="form-select w-auto"><option value="">All ${c.filter.l}</option>${opts(c.filter.o).map(x=>`<option value="${x[0]}">${x[1]}</option>`).join('')}</select>`:''}${(c.btns||[]).map((b,i)=>`<button class="btn btn-outline-primary" data-b="${i}">${b.l}</button>`).join('')}<button id="add" class="btn btn-primary"><i class="bi bi-plus-lg"></i> Add ${c.name}</button></div><div class="card"><div class="table-responsive"><table class="table table-hover align-middle mb-0"><thead><tr>${c.cols.map(x=>`<th>${x[0]}</th>`).join('')}<th class="text-end">Actions</th></tr></thead><tbody id="tb"></tbody></table></div><div class="p-3 d-flex justify-content-between align-items-center"><small id="ct" class="text-secondary"></small><div id="pg" class="btn-group"></div></div></div>`;
 const load=()=>{
  const all=DB.g(c.key).filter(r=>(!f||String(r[c.filter.n])==f)&&c.cols.map(x=>x[1](r)).join(' ').replace(/<[^>]*>/g,' ').toLowerCase().includes(q));
  const pages=Math.max(1,Math.ceil(all.length/P));pg=Math.min(pg,pages);
  $('#tb').innerHTML=all.slice((pg-1)*P,pg*P).map(r=>`<tr>${c.cols.map(x=>`<td>${x[1](r)}</td>`).join('')}<td class="text-end text-nowrap">${(c.act||[]).filter(a=>!a.show||a.show(r)).map(a=>`<button class="btn btn-sm btn-light" title="${a.t}" data-a="${c.act.indexOf(a)}" data-id="${r.id}"><i class="bi bi-${a.i}"></i></button>`).join('')}<button class="btn btn-sm btn-light" title="Edit" data-e="${r.id}"><i class="bi bi-pencil"></i></button><button class="btn btn-sm btn-light text-danger" title="Delete" data-d="${r.id}"><i class="bi bi-trash"></i></button></td></tr>`).join('')||`<tr><td colspan="${c.cols.length+1}" class="text-center text-secondary py-4">No records found</td></tr>`;
  $('#ct').textContent=all.length+' record(s)';
  $('#pg').innerHTML=Array.from({length:pages},(_,i)=>`<button class="btn btn-sm btn-${i+1==pg?'primary':'outline-secondary'}" data-p="${i+1}">${i+1}</button>`).join('');
  if(c.top)$('#top').innerHTML=c.top();
 };
 const form=async id=>{
  const list=DB.g(c.key),rec=id?list.find(r=>r.id==id):(c.def?c.def():{});
  const {value:v}=await Swal.fire({title:(id?'Edit ':'Add ')+c.name,width:650,showCancelButton:true,confirmButtonText:'Save',customClass:{htmlContainer:'text-start'},
   html:`<div class="row g-2">${c.fields.map(x=>{const val=rec[x.n]??'';const i=`id="f_${x.n}"`;const inp=x.o?`<select ${i} class="form-select">${opts(x.o).map(o=>`<option value="${o[0]}" ${o[0]==val?'selected':''}>${o[1]}</option>`).join('')}</select>`:x.t=='textarea'?`<textarea ${i} class="form-control" rows="2">${val}</textarea>`:`<input ${i} type="${x.t||'text'}" class="form-control" value="${val}" ${x.t=='number'?'min="0"':''}>`;return `<div class="col-md-${x.w||6}"><label class="form-label small fw-semibold">${x.l}${x.r?' *':''}</label>${inp}</div>`}).join('')}</div>`,
   preConfirm:()=>{const o={};for(const x of c.fields){let val=$('#f_'+x.n).value.trim();
    if(x.r&&!val)return Swal.showValidationMessage(x.l+' is required');
    if(x.t=='email'&&val&&!/^\S+@\S+\.\S+$/.test(val))return Swal.showValidationMessage('Enter a valid email');
    if(x.re&&val&&!x.re.test(val))return Swal.showValidationMessage('Invalid '+x.l);
    if(x.t=='number')val=+val;o[x.n]=val}
    const err=c.check&&c.check(o,id);if(err)return Swal.showValidationMessage(err);return o}});
  if(!v)return;
  if(id)Object.assign(rec,v);else list.push({...rec,...v,id:c.idf?c.idf(list):uid()});
  DB.s(c.key,list);log(c.name+(id?' updated':' added'));toast('Saved successfully');load();
 };
 const del=async id=>{if((await Swal.fire({title:'Delete this '+c.name.toLowerCase()+'?',text:'This cannot be undone.',icon:'warning',showCancelButton:true,confirmButtonColor:'#dc2626',confirmButtonText:'Delete'})).isConfirmed){DB.s(c.key,DB.g(c.key).filter(r=>r.id!=id));log(c.name+' deleted');toast('Deleted');load()}};
 el.onclick=e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;
  if(d.p){pg=+d.p;load()}else if(d.e)form(d.e);else if(d.d)del(d.d);
  else if(d.a)c.act[d.a].f(DB.g(c.key).find(r=>r.id==d.id),load);
  else if(d.b)c.btns[d.b].f(load)};
 $('#add').onclick=()=>form();
 $('#q').oninput=e=>{q=e.target.value.toLowerCase();pg=1;load()};
 if(c.filter)$('#fl').onchange=e=>{f=e.target.value;pg=1;load()};
 load();
}

shell('employees','Employee Management');
crud({key:'employees',name:'Employee',
 idf:l=>'EMP'+String(Math.max(0,...l.map(e=>+e.id.slice(3)))+1).padStart(3,'0'),
 def:()=>({status:'Active',type:'Full-time',joined:today()}),
 filter:{n:'dept',l:'Departments',o:()=>DB.g('departments').map(d=>d.name)},
 fields:[{n:'name',l:'Full Name',r:1},{n:'email',l:'Email',t:'email',r:1},{n:'phone',l:'Phone (10 digits)',re:/^\d{10}$/,r:1},{n:'gender',l:'Gender',o:['Male','Female','Other']},{n:'dob',l:'Date of Birth',t:'date'},{n:'joined',l:'Joining Date',t:'date',r:1},{n:'dept',l:'Department',o:()=>DB.g('departments').map(d=>d.name),r:1},{n:'desig',l:'Designation',r:1},{n:'type',l:'Employment Type',o:['Full-time','Part-time','Contract','Intern']},{n:'salary',l:'Basic Salary (₹)',t:'number',r:1},{n:'status',l:'Status',o:['Active','Inactive']},{n:'address',l:'Address',t:'textarea',w:12}],
 check:(o,id)=>DB.g('employees').some(e=>e.email==o.email&&e.id!=id)?'Email already exists':'',
 cols:[['ID',e=>e.id],['Employee',e=>`<span class="av">${e.name[0]}</span>${e.name}<br><small class="text-secondary ms-5">${e.email}</small>`],['Department',e=>e.dept],['Designation',e=>e.desig],['Salary',e=>money(e.salary)],['Status',e=>badge(e.status)]],
 act:[{i:'eye',t:'View profile',f:e=>Swal.fire({title:e.name,icon:'info',html:`<div class="text-start small"><b>ID:</b> ${e.id}<br><b>Email:</b> ${e.email}<br><b>Phone:</b> ${e.phone}<br><b>Gender:</b> ${e.gender} · <b>DOB:</b> ${e.dob}<br><b>Dept:</b> ${e.dept} · ${e.desig}<br><b>Joined:</b> ${e.joined} (${e.type})<br><b>Salary:</b> ${money(e.salary)}<br><b>Status:</b> ${e.status}<br><b>Address:</b> ${e.address}</div>`})}]});

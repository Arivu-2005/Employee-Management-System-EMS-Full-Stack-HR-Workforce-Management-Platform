shell('departments','Department Management');
crud({key:'departments',name:'Department',idf:l=>'D'+(Math.max(0,...l.map(d=>+d.id.slice(1)))+1),
 fields:[{n:'name',l:'Department Name',r:1,w:12},{n:'manager',l:'Manager',o:()=>[['','— None —'],...DB.g('employees').map(e=>e.name)],w:12},{n:'desc',l:'Description',t:'textarea',w:12}],
 check:(o,id)=>DB.g('departments').some(d=>d.name.toLowerCase()==o.name.toLowerCase()&&d.id!=id)?'Department already exists':'',
 cols:[['Name',d=>d.name],['Description',d=>d.desc||'—'],['Manager',d=>d.manager||'—'],['Employees',d=>`<span class="badge bg-primary">${DB.g('employees').filter(e=>e.dept==d.name).length}</span>`]]});

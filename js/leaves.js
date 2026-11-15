shell('leaves','Leave Management');
const Q={'Casual Leave':12,'Sick Leave':10,'Earned Leave':15};
const bal=r=>Q[r.type]-DB.g('leaves').filter(l=>l.emp==r.emp&&l.type==r.type&&l.status=='Approved').reduce((s,l)=>s+days(l.start,l.end).length,0);
const setS=(r,s,l)=>{const L=DB.g('leaves');L.find(x=>x.id==r.id).status=s;DB.s('leaves',L);
 if(s=='Approved'){const ds=days(r.start,r.end),A=DB.g('attendance').filter(a=>!(a.emp==r.emp&&ds.includes(a.date)));ds.forEach(d=>A.push({id:uid(),emp:r.emp,date:d,status:'Leave',in:'',out:''}));DB.s('attendance',A)}
 log(`Leave ${s.toLowerCase()} for ${empName(r.emp)}`);toast('Leave '+s.toLowerCase());l()};
crud({key:'leaves',name:'Leave',def:()=>({status:'Pending',start:today(),end:today()}),
 filter:{n:'status',l:'Statuses',o:['Pending','Approved','Rejected']},
 fields:[{n:'emp',l:'Employee',o:()=>DB.g('employees').map(e=>[e.id,e.name]),r:1},{n:'type',l:'Leave Type',o:Object.keys(Q)},{n:'start',l:'Start Date',t:'date',r:1},{n:'end',l:'End Date',t:'date',r:1},{n:'reason',l:'Reason',t:'textarea',r:1,w:12}],
 check:o=>o.end<o.start?'End date cannot be before start date':'',
 cols:[['Employee',r=>empName(r.emp)],['Type',r=>r.type],['From',r=>r.start],['To',r=>r.end],['Days',r=>days(r.start,r.end).length],['Reason',r=>r.reason],['Balance',r=>bal(r)+' left'],['Status',r=>badge(r.status)]],
 act:[{i:'check-circle',t:'Approve',show:r=>r.status=='Pending',f:(r,l)=>setS(r,'Approved',l)},{i:'x-circle',t:'Reject',show:r=>r.status=='Pending',f:(r,l)=>setS(r,'Rejected',l)}]});

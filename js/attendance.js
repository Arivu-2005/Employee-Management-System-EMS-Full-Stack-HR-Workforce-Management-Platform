shell('attendance','Attendance Management');
const hrs=a=>{if(!a.in||!a.out)return '—';const m=t=>t.split(':')[0]*60+ +t.split(':')[1];return Math.max(0,(m(a.out)-m(a.in))/60).toFixed(1)+' h'};
crud({key:'attendance',name:'Attendance',def:()=>({date:today(),status:'Present',in:'09:00',out:'18:00'}),
 filter:{n:'status',l:'Statuses',o:['Present','Absent','Half-Day','Late','Leave']},
 fields:[{n:'emp',l:'Employee',o:()=>DB.g('employees').map(e=>[e.id,e.name]),r:1},{n:'date',l:'Date',t:'date',r:1},{n:'status',l:'Status',o:['Present','Absent','Half-Day','Late','Leave']},{n:'in',l:'Check-In',t:'time'},{n:'out',l:'Check-Out',t:'time'}],
 check:(o,id)=>DB.g('attendance').some(a=>a.emp==o.emp&&a.date==o.date&&a.id!=id)?'Attendance already marked for this employee and date':(o.in&&o.out&&o.out<o.in?'Check-out must be after check-in':''),
 cols:[['Date',a=>a.date],['Employee',a=>empName(a.emp)],['Status',a=>badge(a.status)],['Check-In',a=>a.in||'—'],['Check-Out',a=>a.out||'—'],['Hours',hrs]]});

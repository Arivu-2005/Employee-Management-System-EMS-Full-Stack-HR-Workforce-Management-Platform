shell('performance','Performance Management');
crud({key:'performance',name:'Review',def:()=>({month:today().slice(0,7),rating:3,prod:80,tasks:80}),
 fields:[{n:'emp',l:'Employee',o:()=>DB.g('employees').map(e=>[e.id,e.name]),r:1},{n:'month',l:'Month',t:'month',r:1},{n:'rating',l:'Rating (1-5)',o:[1,2,3,4,5]},{n:'prod',l:'Productivity %',t:'number',r:1},{n:'tasks',l:'Task Completion %',t:'number',r:1},{n:'remarks',l:'Remarks',t:'textarea',w:12}],
 check:o=>o.prod>100||o.tasks>100?'Scores cannot exceed 100':'',
 cols:[['Employee',r=>empName(r.emp)],['Month',r=>r.month],['Rating',r=>`<span class="text-warning">${'★'.repeat(+r.rating)}${'☆'.repeat(5-r.rating)}</span>`],['Productivity',r=>r.prod+'%'],['Tasks',r=>r.tasks+'%'],['Remarks',r=>r.remarks||'—']]});

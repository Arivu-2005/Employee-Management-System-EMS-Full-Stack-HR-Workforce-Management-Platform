seed();
if(DB.g('session',null))location.replace('dashboard.html');
const rem=localStorage.getItem('ems_remember');if(rem){$('#email').value=rem;$('#remember').checked=true}
$('#eye').onclick=()=>{const p=$('#password');p.type=p.type=='password'?'text':'password';$('#eye i').className='bi bi-eye'+(p.type=='text'?'-slash':'')};
$('#loginForm').onsubmit=e=>{e.preventDefault();
 const em=$('#email').value.trim(),pw=$('#password').value,a=DB.g('admin',{}),err=$('#err');
 if(!/^\S+@\S+\.\S+$/.test(em))return err.textContent='Enter a valid email address.';
 if(pw.length<6)return err.textContent='Password must be at least 6 characters.';
 if(em!==a.email||pw!==a.password)return err.textContent='Invalid email or password.';
 if($('#remember').checked)localStorage.setItem('ems_remember',em);else localStorage.removeItem('ems_remember');
 DB.s('session',{email:em});location='dashboard.html'};

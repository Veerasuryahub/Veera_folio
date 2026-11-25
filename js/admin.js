import { supabase } from './supabase-client.js';
(function () {
  'use strict';
  const ADMIN_EMAIL = 'veerasurya39@gmail.com';
  const loginForm = document.getElementById('loginForm');
  const loginPanel = document.getElementById('adminLogin');
  const dashboard = document.getElementById('adminDashboard');
  const loginError = document.getElementById('loginError');
  const logoutBtn = document.getElementById('logoutBtn');
  const msgContainer = document.getElementById('messagesContainer');
  const msgCount = document.getElementById('messageCount');
  const noMessages = document.getElementById('noMessages');
  const toast = document.getElementById('toast');
  const resetPanel = document.getElementById('passwordResetPanel');
  const resetForm = document.getElementById('passwordResetForm');
  function notify(message, type) {
    if (!toast) return;
    toast.textContent = message; toast.className = 'toast ' + (type || '') + ' show';
    window.setTimeout(() => toast.classList.remove('show'), 3500);
  }
  function loginProblem(message) { loginError.textContent = message; loginError.style.display = 'block'; }
  function showLogin() { loginPanel.classList.remove('hidden'); dashboard.classList.remove('active'); }
  function showDashboard() { loginPanel.classList.add('hidden'); dashboard.classList.add('active'); }
  function textNode(tag, cls, value) { const el=document.createElement(tag); el.className=cls; el.textContent=value || ''; return el; }
  function renderMessage(item) {
    const card=document.createElement('article'); card.className='message-card';
    const header=document.createElement('div'); header.className='message-card__header';
    header.append(textNode('span','message-card__sender',item.name), textNode('span','message-card__date',new Date(item.created_at).toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'})));
    const email=textNode('p','message-card__email',item.email), body=textNode('p','message-card__body',item.message);
    const actions=document.createElement('div'); actions.style.cssText='display:flex;gap:10px;margin-top:14px;flex-wrap:wrap;';
    const read=document.createElement('button'); read.className='btn btn-outline'; read.type='button'; read.textContent=item.is_read?'Mark unread':'Mark read';
    read.addEventListener('click',()=>updateMessage(item.id,{is_read:!item.is_read}));
    const del=document.createElement('button'); del.className='btn btn-outline'; del.type='button'; del.textContent='Delete';
    del.addEventListener('click',()=>deleteMessage(item.id)); actions.append(read,del);
    if(!item.is_read) card.style.borderLeft='3px solid var(--accent, #8b7355)';
    card.append(header,email,body,actions); return card;
  }
  async function loadMessages() {
    msgCount.textContent='Loading messages...';
    const {data,error}=await supabase.from('contact_messages').select('id,name,email,message,is_read,created_at').order('created_at',{ascending:false}).limit(100);
    if(error){console.error(error);msgCount.textContent='Unable to load messages';notify('Could not load inbox. Check your admin account and database policies.','error');return;}
    const items=data||[], unread=items.filter(x=>!x.is_read).length;
    msgCount.textContent=items.length+' messages · '+unread+' unread';
    msgContainer.replaceChildren(...items.map(renderMessage)); noMessages.style.display=items.length?'none':'block';
  }
  async function updateMessage(id, changes) {
    const {error}=await supabase.from('contact_messages').update(changes).eq('id',id);
    if(error){notify('Could not update this message.','error');return;} await loadMessages();
  }
  async function deleteMessage(id) {
    if(!window.confirm('Delete this contact message permanently?')) return;
    const {error}=await supabase.from('contact_messages').delete().eq('id',id);
    if(error){notify('Could not delete this message.','error');return;}
    notify('Message deleted.','success'); await loadMessages();
  }
  loginForm.addEventListener('submit',async(event)=>{
    event.preventDefault(); loginError.style.display='none';
    const email=document.getElementById('adminUsername').value.trim().toLowerCase();
    const password=document.getElementById('adminPassword').value;
    if(email!==ADMIN_EMAIL){loginProblem('This email is not authorized for the portfolio inbox.');return;}
    const button=loginForm.querySelector('button[type="submit"]'); button.disabled=true;
    try { const {error}=await supabase.auth.signInWithPassword({email,password}); if(error) throw error; }
    catch(error){console.error(error);loginProblem('Sign-in failed. Check your password and confirm the admin account exists in Supabase.');}
    finally{button.disabled=false;}
  });
  document.getElementById('resetPasswordBtn').addEventListener('click',async()=>{
    const email=document.getElementById('adminUsername').value.trim().toLowerCase();
    if(email!==ADMIN_EMAIL){loginProblem('Enter your authorized admin email first.');return;}
    const button=document.getElementById('resetPasswordBtn'); button.disabled=true;
    try {
      const {error}=await supabase.auth.resetPasswordForEmail(email,{redirectTo:window.location.origin+'/admin.html'});
      if(error) throw error; notify('Password reset email requested. Check your inbox and spam folder.','success');
    } catch(error){console.error(error);loginProblem('Could not send a reset email. Check Supabase Auth email and redirect URL settings.');}
    finally{button.disabled=false;}
  });
  resetForm.addEventListener('submit',async(event)=>{
    event.preventDefault(); const password=document.getElementById('newAdminPassword').value;
    if(password.length<10){notify('Use at least 10 characters for your new password.','error');return;}
    const {error}=await supabase.auth.updateUser({password});
    if(error){notify('Password update failed. Request a new reset email.','error');return;}
    resetForm.reset(); resetPanel.style.display='none'; notify('Password updated successfully.','success');
  });
  logoutBtn.addEventListener('click',async()=>{await supabase.auth.signOut();showLogin();notify('Signed out.','success');});
  supabase.auth.onAuthStateChange((event,session)=>{
    if(event==='PASSWORD_RECOVERY'){resetPanel.style.display='block';showLogin();return;}
    const user=session&&session.user;
    if(user&&user.email===ADMIN_EMAIL){showDashboard();window.setTimeout(()=>loadMessages(),0);}
    else{if(user) window.setTimeout(()=>supabase.auth.signOut(),0);showLogin();}
  });
})();

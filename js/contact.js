import { supabase } from './supabase-client.js';
(function () {
  'use strict';
  const form = document.getElementById('contactForm');
  if (!form) return;
  const submitBtn = document.getElementById('contactSubmit');
  const originalButton = submitBtn.innerHTML;
  const toast = (message, type) => window.showToast ? window.showToast(message, type) : window.alert(message);
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    const honeypot = document.getElementById('contactWebsite').value.trim();
    if (honeypot) { form.reset(); toast('Message sent successfully!', 'success'); return; }
    if (!name || name.length > 80 || !email || email.length > 254 || !message || message.length > 4000 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast('Please check your name, email address, and message.', 'error'); return;
    }
    submitBtn.disabled = true; submitBtn.textContent = 'Sending...';
    try {
      const { error } = await supabase.from('contact_messages').insert({ name, email, message });
      if (error) throw error;
      toast('Message sent successfully!', 'success'); form.reset();
    } catch (error) {
      console.error('Contact submission failed:', error);
      toast('Could not send your message right now. Please email me directly.', 'error');
    } finally { submitBtn.disabled = false; submitBtn.innerHTML = originalButton; }
  });
})();

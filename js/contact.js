/* ============================================
   CONTACT.JS — Contact form → Firestore
   ============================================ */

(function () {
    'use strict';

    const form = document.getElementById('contactForm');
    if (!form) return;

    const submitBtn = document.getElementById('contactSubmit');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        // Basic validation
        if (!name || !email || !message) {
            window.showToast('Please fill in all fields.', 'error');
            return;
        }

        // Email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            window.showToast('Please enter a valid email address.', 'error');
            return;
        }

        // Disable button
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
      Sending...
    `;

        try {
            // Check if Firebase is configured
            if (typeof db === 'undefined' || firebase.app().options.apiKey === 'YOUR_API_KEY') {
                // Firebase not configured — show success anyway for demo
                setTimeout(() => {
                    window.showToast('Message sent successfully! ✨', 'success');
                    form.reset();
                    resetButton();
                }, 1000);
                return;
            }

            await db.collection('messages').add({
                name: name,
                email: email,
                message: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                read: false
            });

            window.showToast('Message sent successfully! ✨', 'success');
            form.reset();
        } catch (error) {
            console.error('Error sending message:', error);
            window.showToast('Failed to send message. Please try again.', 'error');
        } finally {
            resetButton();
        }
    });

    function resetButton() {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      Send Message
    `;
    }

    // Add spin animation for the loading state
    const style = document.createElement('style');
    style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);

})();

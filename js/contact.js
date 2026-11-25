/* Contact form — validated public submission to Firestore */
(function () {
    'use strict';

    const form = document.getElementById('contactForm');
    if (!form) return;

    const submitBtn = document.getElementById('contactSubmit');
    const originalButton = submitBtn.innerHTML;

    form.addEventListener('submit', async event => {
        event.preventDefault();

        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();
        const honeypot = document.getElementById('contactWebsite').value.trim();

        if (honeypot) {
            form.reset();
            window.showToast('Message sent successfully!', 'success');
            return;
        }

        if (!name || name.length > 80 || !email || email.length > 254 || !message || message.length > 4000) {
            window.showToast('Please check the form fields and try again.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            window.showToast('Please enter a valid email address.', 'error');
            return;
        }

        if (typeof firebase === 'undefined' || typeof db === 'undefined' ||
            !firebase.apps.length || firebase.app().options.apiKey === 'YOUR_API_KEY') {
            window.showToast('The contact form is temporarily unavailable. Please email me directly.', 'error');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            await db.collection('messages').add({
                name,
                email,
                message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                read: false
            });
            window.showToast('Message sent successfully!', 'success');
            form.reset();
        } catch (error) {
            console.error('Contact form submission failed:', error);
            window.showToast('Could not send your message. Please email me directly.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalButton;
        }
    });
})();

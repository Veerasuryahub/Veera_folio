/* Admin dashboard — Firebase Authentication + protected Firestore reads */
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
    let unsubscribeMessages = null;

    function showToast(message, type) {
        if (!toast) return;
        toast.textContent = message;
        toast.className = 'toast ' + (type || '') + ' show';
        window.setTimeout(() => toast.classList.remove('show'), 3500);
    }

    function showLoginError(message) {
        loginError.textContent = message;
        loginError.style.display = 'block';
    }

    function showDashboard() {
        loginPanel.classList.add('hidden');
        dashboard.classList.add('active');
    }

    function showLogin() {
        loginPanel.classList.remove('hidden');
        dashboard.classList.remove('active');
    }

    function firebaseReady() {
        return typeof firebase !== 'undefined' &&
            typeof auth !== 'undefined' &&
            typeof db !== 'undefined' &&
            firebase.apps.length > 0;
    }

    function renderMessage(data) {
        const card = document.createElement('article');
        card.className = 'message-card';

        const header = document.createElement('div');
        header.className = 'message-card__header';

        const sender = document.createElement('span');
        sender.className = 'message-card__sender';
        sender.textContent = data.name || 'Unknown sender';

        const date = document.createElement('span');
        date.className = 'message-card__date';
        date.textContent = data.timestamp && typeof data.timestamp.toDate === 'function'
            ? data.timestamp.toDate().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
            : 'Just now';

        const email = document.createElement('p');
        email.className = 'message-card__email';
        email.textContent = data.email || '';

        const message = document.createElement('p');
        message.className = 'message-card__body';
        message.textContent = data.message || '';

        header.append(sender, date);
        card.append(header, email, message);
        return card;
    }

    function loadMessages() {
        if (unsubscribeMessages) unsubscribeMessages();
        if (!firebaseReady()) {
            msgCount.textContent = 'Firebase is not configured.';
            noMessages.textContent = 'Configure Firebase Authentication and Firestore to enable the admin inbox.';
            noMessages.style.display = 'block';
            return;
        }

        unsubscribeMessages = db.collection('messages')
            .orderBy('timestamp', 'desc')
            .limit(100)
            .onSnapshot(snapshot => {
                msgContainer.replaceChildren();
                const total = snapshot.size;
                msgCount.textContent = total + ' message' + (total === 1 ? '' : 's');

                if (total === 0) {
                    noMessages.textContent = 'No messages yet. Share your portfolio to start receiving messages!';
                    noMessages.style.display = 'block';
                    return;
                }

                noMessages.style.display = 'none';
                snapshot.forEach(doc => msgContainer.appendChild(renderMessage(doc.data())));
            }, error => {
                console.error('Messages load error:', error);
                msgCount.textContent = 'Unable to load messages.';
                showToast('Could not load messages. Check Firestore rules.', 'error');
            });
    }

    if (!loginForm || !loginPanel || !dashboard || !logoutBtn) return;

    loginForm.addEventListener('submit', async event => {
        event.preventDefault();
        loginError.style.display = 'none';

        if (!firebaseReady()) {
            showLoginError('Firebase is not configured. Check js/firebase-config.js.');
            return;
        }

        const email = document.getElementById('adminUsername').value.trim().toLowerCase();
        const password = document.getElementById('adminPassword').value;
        if (email !== ADMIN_EMAIL) {
            showLoginError('This account is not authorized for the portfolio inbox.');
            return;
        }

        const submitButton = loginForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        try {
            const credential = await auth.signInWithEmailAndPassword(email, password);
            if (!credential.user.emailVerified) {
                await auth.signOut();
                showLoginError('Please verify your admin email address before signing in.');
            } else {
                showToast('Signed in successfully.', 'success');
            }
        } catch (error) {
            console.error('Admin sign-in error:', error);
            showLoginError('Sign-in failed. Check your email and password, and confirm the Firebase admin account is enabled.');
        } finally {
            submitButton.disabled = false;
        }
    });

    logoutBtn.addEventListener('click', async () => {
        if (unsubscribeMessages) {
            unsubscribeMessages();
            unsubscribeMessages = null;
        }
        try {
            await auth.signOut();
            showToast('Signed out.', 'success');
        } catch (error) {
            console.error('Sign-out error:', error);
            showToast('Could not sign out. Please try again.', 'error');
        }
    });

    if (firebaseReady()) {
        auth.onAuthStateChanged(user => {
            if (user && user.email === ADMIN_EMAIL && user.emailVerified) {
                showDashboard();
                loadMessages();
            } else {
                if (user) auth.signOut();
                if (unsubscribeMessages) {
                    unsubscribeMessages();
                    unsubscribeMessages = null;
                }
                showLogin();
            }
        });
    } else {
        showLogin();
    }
})();

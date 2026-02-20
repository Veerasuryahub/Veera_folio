/* ============================================
   ADMIN.JS — Simple JS Auth + Firestore messages
   ============================================ */

(function () {
    'use strict';

    /* ---- Admin Credentials (JS-based) ---- */
    const ADMIN_USERNAME = 'veerasurya';
    const ADMIN_PASSWORD = 'Portveera@2002';

    const loginForm = document.getElementById('loginForm');
    const loginPanel = document.getElementById('adminLogin');
    const dashboard = document.getElementById('adminDashboard');
    const loginError = document.getElementById('loginError');
    const logoutBtn = document.getElementById('logoutBtn');
    const msgContainer = document.getElementById('messagesContainer');
    const msgCount = document.getElementById('messageCount');
    const noMessages = document.getElementById('noMessages');
    const toast = document.getElementById('toast');

    // ---- Toast ----
    function showToast(message, type) {
        if (!toast) return;
        toast.textContent = message;
        toast.className = 'toast ' + type + ' show';
        setTimeout(() => toast.classList.remove('show'), 3500);
    }

    // ---- Check if already logged in (session) ----
    if (sessionStorage.getItem('vs_admin_auth') === 'true') {
        showDashboard();
        loadMessages();
    }

    // ---- Login ----
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        loginError.style.display = 'none';

        const username = document.getElementById('adminUsername').value.trim();
        const password = document.getElementById('adminPassword').value;

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            sessionStorage.setItem('vs_admin_auth', 'true');
            showDashboard();
            loadMessages();
            showToast('Welcome back, Veerasurya!', 'success');
        } else {
            loginError.textContent = 'Invalid username or password.';
            loginError.style.display = 'block';
        }
    });

    // ---- Logout ----
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('vs_admin_auth');
        showLogin();
        showToast('Signed out.', 'success');
    });

    // ---- Show / Hide ----
    function showDashboard() {
        loginPanel.classList.add('hidden');
        dashboard.classList.add('active');
    }

    function showLogin() {
        loginPanel.classList.remove('hidden');
        dashboard.classList.remove('active');
    }

    // ---- Check Firebase readiness ----
    function isFirebaseReady() {
        try {
            return typeof db !== 'undefined' &&
                firebase.app().options.apiKey !== 'YOUR_API_KEY';
        } catch {
            return false;
        }
    }

    // ---- Load Messages ----
    function loadMessages() {
        if (!isFirebaseReady()) {
            msgCount.textContent = 'Firebase not configured — no messages to display.';
            noMessages.style.display = 'block';
            noMessages.textContent = 'Connect Firebase to start receiving contact messages. Update js/firebase-config.js with your project keys.';
            return;
        }

        db.collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                msgContainer.innerHTML = '';
                const total = snapshot.size;
                msgCount.textContent = total + ' message' + (total !== 1 ? 's' : '');

                if (total === 0) {
                    noMessages.style.display = 'block';
                    return;
                }
                noMessages.style.display = 'none';

                localStorage.setItem('vs_portfolio_msg_count', String(total));

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const date = data.timestamp
                        ? new Date(data.timestamp.toDate()).toLocaleString('en-IN', {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                        })
                        : 'Just now';

                    const card = document.createElement('div');
                    card.className = 'message-card';
                    card.innerHTML = `
            <div class="message-card__header">
              <span class="message-card__sender">${escapeHtml(data.name)}</span>
              <span class="message-card__date">${date}</span>
            </div>
            <p class="message-card__email">${escapeHtml(data.email)}</p>
            <p class="message-card__body">${escapeHtml(data.message)}</p>
          `;
                    msgContainer.appendChild(card);
                });
            }, (err) => {
                console.error('Messages load error:', err);
                showToast('Failed to load messages.', 'error');
            });
    }

    // ---- Helpers ----
    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str || '';
        return div.innerHTML;
    }

})();

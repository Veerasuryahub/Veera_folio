/* ============================================
   NOTIFICATION.JS — Firestore message listener
   Pulses the gold dot when new messages arrive
   ============================================ */

(function () {
    'use strict';

    const dot = document.getElementById('notificationDot');
    if (!dot) return;

    // Only run if Firebase is properly configured
    function isFirebaseReady() {
        try {
            return typeof db !== 'undefined' &&
                firebase.app().options.apiKey !== 'YOUR_API_KEY';
        } catch {
            return false;
        }
    }

    if (!isFirebaseReady()) return;

    // Track the last-seen message count in localStorage
    const STORAGE_KEY = 'vs_portfolio_msg_count';

    function getLastSeenCount() {
        return parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    }

    function setLastSeenCount(count) {
        localStorage.setItem(STORAGE_KEY, String(count));
    }

    // Listen for real-time updates on messages collection
    db.collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
            const totalMessages = snapshot.size;
            const lastSeen = getLastSeenCount();

            if (totalMessages > lastSeen) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        }, (error) => {
            console.warn('Notification listener error:', error);
        });

    // Clicking the dot marks all as seen
    dot.addEventListener('click', () => {
        db.collection('messages').get().then((snapshot) => {
            setLastSeenCount(snapshot.size);
            dot.classList.remove('active');
        });
    });

})();

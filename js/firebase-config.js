/* ============================================
   FIREBASE CONFIGURATION
   ============================================ */

const firebaseConfig = {
   apiKey: "AIzaSyDP3BI1sNDtIvVYzaeLw3NphrjuaCTJPqY",
   authDomain: "veera-portfolio-2026.firebaseapp.com",
   projectId: "veera-portfolio-2026",
   storageBucket: "veera-portfolio-2026.firebasestorage.app",
   messagingSenderId: "825680284787",
   appId: "1:825680284787:web:6b8cdc91eddfefec196e06"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export services
const db = firebase.firestore();
const auth = firebase.auth();

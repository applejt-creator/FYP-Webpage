import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOAWKXPnJC3N1fdk846Qr2QF7yiJ9g3Po",
  authDomain: "fpy-24-s4-01.firebaseapp.com",
  projectId: "fpy-24-s4-01",
  storageBucket: "fpy-24-s4-01.appspot.com",
  messagingSenderId: "63162605522",
  appId: "1:63162605522:web:8a5029a7283a96e0ccf20b",
  measurementId: "G-T8SE250HF9",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Optional: Analytics
let analytics;
try {
  analytics = getAnalytics(app);
} catch (e) {
  console.warn("Analytics not initialized:", e);
}

// Export the app (optional, if needed elsewhere)
export default app;

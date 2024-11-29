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
  storageBucket: "fpy-24-s4-01.appspot.com", // Corrected
  messagingSenderId: "63162605522",
  appId: "1:63162605522:web:8a5029a7283a96e0ccf20b",
  measurementId: "G-T8SE250HF9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional)
let analytics;
try {
  analytics = getAnalytics(app);
} catch (e) {
  console.warn("Analytics not initialized:", e);
}

// Initialize Firebase services
export const auth = getAuth(app); // Auth export
export const db = getFirestore(app); // Firestore export
export const storage = getStorage(app); // Storage export
export default app; // Export the app for other uses if necessary

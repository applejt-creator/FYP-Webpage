// src/firebase.js
import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOAWKXPnJC3N1fdk846Qr2QF7yiJ9g3Po",
  authDomain: "fpy-24-s4-01.firebaseapp.com",
  projectId: "fpy-24-s4-01",
  storageBucket: "fpy-24-s4-01.firebasestorage.app",
  messagingSenderId: "63162605522",
  appId: "1:63162605522:web:8a5029a7283a96e0ccf20b",
  measurementId: "G-T8SE250HF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = firebase.firestore();
export default firebase;

const storage = getStorage(app);

const auth = getAuth(app);

const functions = getFunctions(app)

const firestore = getFirestore(app)

let currentUser

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    currentUser = user
    console.log(user.uid); // Print the user's ID
  } else {
    // No user is signed in
    currentUser = null; 
    console.log("No user signed in");
  }
});

export {app, auth, functions, currentUser, storage, firestore};
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getFunctions } from "firebase/functions";

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

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

const auth = getAuth(firebaseApp);

const functions = getFunctions(firebaseApp)

const db = getFirestore(firebaseApp)

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

export {firebaseApp, auth, functions, currentUser, storage, db};
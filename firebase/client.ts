import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClq3tJni_CTh3WpAcXD48Vd7z31Nq-qMs",
  authDomain: "willtheyhireme-68c18.firebaseapp.com",
  projectId: "willtheyhireme-68c18",
  storageBucket: "willtheyhireme-68c18.firebasestorage.app",
  messagingSenderId: "462142531736",
  appId: "1:462142531736:web:b57f65867fbae714b688ed",
  measurementId: "G-0EB6X31CWX"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
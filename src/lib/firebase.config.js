// Import the functions you need from the SDKs you need
import { initializeApp, getApps,getApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_FIREBASE_KEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: "capstone-e4b08",
  storageBucket: "capstone-e4b08.firebasestorage.app",
  messagingSenderId: "911745819222",
  appId: "1:911745819222:web:a6054a9b2a2998a8a811f7",
  measurementId: "G-9RMX6SLV6X"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);

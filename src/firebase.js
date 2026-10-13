// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiAGvBcyORTXrl5aXu2SJG8p2sXTxoB8A",
  authDomain: "easybanking-eafce.firebaseapp.com",
  projectId: "easybanking-eafce",
  storageBucket: "easybanking-eafce.firebasestorage.app",
  messagingSenderId: "698859691477",
  appId: "1:698859691477:web:6862debe3f2abaf7cdf15c",
  measurementId: "G-RHZ9E4YRF6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
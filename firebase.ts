// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuk5LRCSLaIg_alDTTbB0yA1d7x4IoP2I",
  authDomain: "fellwanderers-85f0d.firebaseapp.com",
  projectId: "fellwanderers-85f0d",
  storageBucket: "fellwanderers-85f0d.appspot.com",
  messagingSenderId: "440459668854",
  appId: "1:440459668854:web:313c631a7081a7e1a31e57",
  measurementId: "G-NZPXJZ8ZLH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
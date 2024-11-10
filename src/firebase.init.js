// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCso22guIYy2yZ6M9Y1Mxp6zhuBfO4pANs",
  authDomain: "email-register-form-92346.firebaseapp.com",
  projectId: "email-register-form-92346",
  storageBucket: "email-register-form-92346.firebasestorage.app",
  messagingSenderId: "812436716039",
  appId: "1:812436716039:web:351a106c8426f648cec8a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
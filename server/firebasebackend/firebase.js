// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCOKi6u3EF5bMlTUXk7Z2AvDt2w2a0Dm0",
  authDomain: "authentication-e845f.firebaseapp.com",
  projectId: "authentication-e845f",
  storageBucket: "authentication-e845f.firebasestorage.app",
  messagingSenderId: "645450238407",
  appId: "1:645450238407:web:beb1d5a1bd8826048031e2",
  measurementId: "G-H1M9L7468L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth(app);

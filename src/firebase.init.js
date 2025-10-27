// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjjReNbHb0NNIMnt3hcTC1QjEzeWtJ6L4",
    authDomain: "explore-email-password-a-94597.firebaseapp.com",
    projectId: "explore-email-password-a-94597",
    storageBucket: "explore-email-password-a-94597.firebasestorage.app",
    messagingSenderId: "228328050749",
    appId: "1:228328050749:web:b2dba5482c20822fc95a54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
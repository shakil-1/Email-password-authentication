// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDt3-aCVOSlekpGt6zHo6sGMXCMMZR_22g",
    authDomain: "email-passwrod-auth.firebaseapp.com",
    projectId: "email-passwrod-auth",
    storageBucket: "email-passwrod-auth.appspot.com",
    messagingSenderId: "58002441939",
    appId: "1:58002441939:web:2e097634ff971608b8b626"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
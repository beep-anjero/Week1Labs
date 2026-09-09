// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDyWtMpU3mWnrtfnS_OEton0t-JqrL-stA",
    authDomain: "week1labs-ab746.firebaseapp.com",
    projectId: "week1labs-ab746",
    storageBucket: "week1labs-ab746.firebasestorage.app",
    messagingSenderId: "633287482422",
    appId: "1:633287482422:web:bf104b9407814bff958c97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
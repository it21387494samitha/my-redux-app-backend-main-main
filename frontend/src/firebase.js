// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAac_r5GfiHkZyu2akLF7levVL0kVJxkiQ",
    authDomain: "newlogin-da8d9.firebaseapp.com",
    projectId: "newlogin-da8d9",
    storageBucket: "newlogin-da8d9.appspot.com",
    messagingSenderId: "487049466992",
    appId: "1:487049466992:web:b8064722bb0705404d90b5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();



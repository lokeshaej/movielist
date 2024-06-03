// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDIT75cmC4YOTXZrNYPqfkx9GjPudIW02o",
    authDomain: "login-42660.firebaseapp.com",
    databaseURL: "https://login-42660-default-rtdb.firebaseio.com",
    projectId: "login-42660",
    storageBucket: "login-42660.appspot.com",
    messagingSenderId: "509048671428",
    appId: "1:509048671428:web:962e657906e5ed729d4d91",
    measurementId: "G-2408659LHM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

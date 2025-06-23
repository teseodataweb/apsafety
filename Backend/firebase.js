// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDlZQ3tAGMfO3iq_O5Lvw6DPvUxfhdpQ5M",
    authDomain: "apsafety-3eb5b.firebaseapp.com",
    projectId: "apsafety-3eb5b",
    storageBucket: "apsafety-3eb5b.firebasestorage.app",
    messagingSenderId: "1013984443044",
    appId: "1:1013984443044:web:41f78fd830bf00e5420431",
    measurementId: "G-XT6QRQ0QVN"
};

// Inicializamos la aplicación Firebase
const app = initializeApp(firebaseConfig);

// Obtenemos la instancia de autenticación
const auth = getAuth(app);

// Exportamos las funciones necesarias para login
export { auth, signInWithEmailAndPassword };

// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importamos Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDlZQ3tAGMfO3iq_O5Lvw6DPvUxfhdpQ5M",
  authDomain: "apsafety-3eb5b.firebaseapp.com",
  projectId: "apsafety-3eb5b",
  storageBucket: "apsafety-3eb5b.appspot.com",
  messagingSenderId: "1013984443044",
  appId: "1:1013984443044:web:41f78fd830bf00e5420431",
  measurementId: "G-XT6QRQ0QVN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db }; // Exportamos db
export default auth; // Exportamos auth como default

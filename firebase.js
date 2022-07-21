import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC-HzvGcS1iVFGVeZq1j_Dt5lE2pA4hPt8",
  authDomain: "whatsapp2-d1e17.firebaseapp.com",
  projectId: "whatsapp2-d1e17",
  storageBucket: "whatsapp2-d1e17.appspot.com",
  messagingSenderId: "185656105830",
  appId: "1:185656105830:web:6d2b60519fb088d88186a7",
  measurementId: "G-9VCSR7P11P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getDatabase(app)
export {auth,db}
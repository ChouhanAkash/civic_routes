// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Use the config provided by Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAXlnm9yybVtx9UZi4d0kr59zmVoXMdTt8",
  authDomain: "civicroutes-2c58b.firebaseapp.com",
  projectId: "civicroutes-2c58b",
  storageBucket: "civicroutes-2c58b.appspot.com",  // Ensure this is correct as provided
  messagingSenderId: "856972110150",
  appId: "1:856972110150:web:605a1f1d7c20b845b5dd47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);

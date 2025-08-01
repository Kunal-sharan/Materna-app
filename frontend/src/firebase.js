// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuRfLJ8xqGWhEo_-vV8nm9KfapLAMew74",
  authDomain: "materna-5421d.firebaseapp.com",
  projectId: "materna-5421d",
  appId: "1:632105711841:web:03185bd1f76211c9e29fa0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);
export { auth, db };
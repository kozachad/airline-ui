// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACGesetMgRQbkkcG_6_Sfq1vZpfLbCRI8",
  authDomain: "flight-chat-agent.firebaseapp.com",
  projectId: "flight-chat-agent",
  storageBucket: "flight-chat-agent.firebasestorage.app",
  messagingSenderId: "830610880498",
  appId: "1:830610880498:web:775d09354416d2624c1d6b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

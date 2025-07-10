import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC8RtFa0msJbSRbTQrOVrXJJGlegZOorlw",
  authDomain: "instalacao-8f692.firebaseapp.com",
  projectId: "instalacao-8f692",
  storageBucket: "instalacao-8f692.firebasestorage.app",
  messagingSenderId: "182783021840",
  appId: "1:182783021840:web:17d6382e0b2e91f82f4b95",
  databaseURL: "https://instalacao-8f692-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

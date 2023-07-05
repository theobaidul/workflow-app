import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJiOb8hJFawfEyPxvedzUCUJGLyOgOcws",
  authDomain: "workflow-app-9bbe1.firebaseapp.com",
  databaseURL:
    "https://workflow-app-9bbe1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "workflow-app-9bbe1",
  storageBucket: "workflow-app-9bbe1.appspot.com",
  messagingSenderId: "484463649048",
  appId: "1:484463649048:web:57893fb4abf2ff3702fe6d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const db = getDatabase(app);

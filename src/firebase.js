import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBMcyJ3bKfMq5gF0qA5H-Dr2whVHNhteY8",
  authDomain: "kresidual.firebaseapp.com",
  projectId: "kresidual",
  storageBucket: "kresidual.appspot.com",
  messagingSenderId: "1097738683832",
  appId: "1:1097738683832:web:71cf032cf7526d493ffb4d",
  measurementId: "G-T67J8XCGJ3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

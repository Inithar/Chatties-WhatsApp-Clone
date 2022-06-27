import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbClCwA5TZbo4t6xJftdUFcJfzyMY_1_Y",
  authDomain: "messenger2-74b2b.firebaseapp.com",
  projectId: "messenger2-74b2b",
  storageBucket: "messenger2-74b2b.appspot.com",
  messagingSenderId: "732500780210",
  appId: "1:732500780210:web:a55e221e09531151e995ab",
  measurementId: "G-2FEPN8Z521",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

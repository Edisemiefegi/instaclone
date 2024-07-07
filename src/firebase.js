import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  updateDoc,
  addDoc,
  query,
  where,
  deleteDoc,
  increment,
  arrayUnion,
  arrayRemove,
  orderBy,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMUMpH3IVeui5s8VFyTYisZKza5fho5OI",
  authDomain: "instaclone-fc52f.firebaseapp.com",
  projectId: "instaclone-fc52f",
  storageBucket: "instaclone-fc52f.appspot.com",
  messagingSenderId: "697874296283",
  appId: "1:697874296283:web:85a2dc786249f9c5178bfe",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  db,
  collection,
  getDocs,
  auth,
  createUserWithEmailAndPassword,
  doc,
  setDoc,
  signInWithEmailAndPassword,
  getDoc,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
  onSnapshot,
  storage,
  updateDoc,
  addDoc,
  query,
  where,
  deleteDoc,
  increment,
  arrayUnion,
  arrayRemove,
  orderBy,
};

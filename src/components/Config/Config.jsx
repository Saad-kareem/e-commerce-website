import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDnDpIEp69klwEaCO2e6-A0C-LBFqOsn7M",
  authDomain: "saad-collection-b1803.firebaseapp.com",
  projectId: "saad-collection-b1803",
  storageBucket: "saad-collection-b1803.appspot.com",
  messagingSenderId: "1065701453440",
  appId: "1:1065701453440:web:4a59ff30b49821ac664065",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);

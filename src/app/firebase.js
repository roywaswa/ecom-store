import { initializeApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore, connectFirestoreEmulator, getDocs } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getStorage, connectStorageEmulator } from "firebase/storage";


const development = import.meta.env.DEV;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
  setPersistence(auth, browserLocalPersistence)
const firestore = getFirestore(app);
const functions = getFunctions(app);
const storage = getStorage(app);

if (development) {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(firestore, "localhost", 8080);
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectStorageEmulator(storage, "localhost",9199);
}


export async function createNewAdminUser(email, password) {
  try {
    const newAdmin = await createUserWithEmailAndPassword(auth, email, password)
    return newAdmin.user;
  } catch (error) {
    console.log(error);
  }
}

export async function signInAdminUser(email, password) {
  try {
    const admin = await signInWithEmailAndPassword(auth, email, password);
    return admin.user;
  } catch (error) {
    console.log(error);
  }
}

export async function signInWithGoogle() { 
  const googleProvider = new GoogleAuthProvider();
  try {
    const googleUser = await signInWithPopup(auth, googleProvider);
    return googleUser.user;
  } catch (error) {
    console.log(error);
  }
}

export async function signOutAdminUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
}

export {
  firestore,
  auth,
  functions,
  storage,
}

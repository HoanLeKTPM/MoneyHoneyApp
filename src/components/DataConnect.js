import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, child } from "firebase/database";
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// export const firebaseConfig = {
//     apiKey: "AIzaSyDCJZKm5jfKrafGKxn_CStrJRvDDPQcVMM",
//     authDomain: "final-c733f.firebaseapp.com",
//     projectId: "final-c733f",
//     storageBucket: "final-c733f.firebasestorage.app",
//     messagingSenderId: "528978272342",
//     appId: "1:528978272342:web:98d3d4d5004fdc32901bf7",
//     measurementId: "G-VGJ5H3CRRV"
// };
const firebaseConfig = {
    apiKey: "AIzaSyDwSwaPmFhCvSGO3UmDZj684PyyIsLO1zs",
    authDomain: "test-80164.firebaseapp.com",
    projectId: "test-80164",
    storageBucket: "test-80164.firebasestorage.app",
    messagingSenderId: "874871246110",
    appId: "1:874871246110:web:0d2a042fbcd8582dc08d0f",
    measurementId: "G-35JQQXP8PQ"
  };


// Initialize Firebase App
var firebaseApp;
if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
} else {
    firebaseApp = getApp();
}

// Initialize Firebase Auth and Database
const auth = getAuth(firebaseApp);
const rootRef = getDatabase(firebaseApp);
const userRef = ref(rootRef, 'users');

// Database references
export const walletRef = ref(rootRef, "Wallet");
export const categoryRef = ref(rootRef, "Category");

// Export Firebase auth and references for usage in your app
export { auth, rootRef, userRef };

import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { getDatabase, ref } from "firebase/database";


// export const firebaseConfig = {
//   apiKey: "AIzaSyDCJZKm5jfKrafGKxn_CStrJRvDDPQcVMM",
//   authDomain: "final-c733f.firebaseapp.com",
//   projectId: "final-c733f",
//   storageBucket: "final-c733f.firebasestorage.app",
//   messagingSenderId: "528978272342",
//   appId: "1:528978272342:web:98d3d4d5004fdc32901bf7",
//   measurementId: "G-VGJ5H3CRRV"
// };

export const firebaseConfig = {
  apiKey: "AIzaSyDwSwaPmFhCvSGO3UmDZj684PyyIsLO1zs",
  authDomain: "test-80164.firebaseapp.com",
  projectId: "test-80164",
  storageBucket: "test-80164.firebasestorage.app",
  messagingSenderId: "874871246110",
  appId: "1:874871246110:web:0d2a042fbcd8582dc08d0f",
  measurementId: "G-35JQQXP8PQ"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;

export const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
export const rootRef = getDatabase(firebaseApp);
export const walletRef = ref(rootRef, "Wallet");
export const categoryRef = ref(rootRef, "Category");
export const userRef = ref(rootRef, "users");
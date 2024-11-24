import * as firebase from 'firebase';
//import FirebaseApp from '@firebase/app';

// Optionally import the services that you want to use
//import "firebase/auth";
import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCHGOg6zhT96i4YiFMqk_kRacXr_VryqqM",
    authDomain: "homodemo-a72ec.firebaseapp.com",
    databaseURL: "https://homodemo-a72ec.firebaseio.com",
    projectId: "homodemo-a72ec",
    storageBucket: "homodemo-a72ec.appspot.com",
    messagingSenderId: "156508141120",
    appId: "1:156508141120:web:f9be3034b96298d48e51a5"
  };
  
//FirebaseApp.initializeApp();
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
else {
firebase.app(); // if already initialized, use that one
}

//console.log(firebase);

export const rootRef = firebase.database().ref();
export const walletRef = rootRef.child('Wallet');
export const categoryRef = rootRef.child('Category');

let uid = 'none';
if(firebase.auth().currentUser) {
    uid = firebase.auth().currentUser.uid;
}

export const userRef = rootRef.child('users');
export const userWalletRef = userRef.child(uid).child('Wallet/');
export const userCategoryRef = userRef.child(uid).child('Category/');
// console.log(userCategoryRef);

//export const subcategoryRef = rootRef.child('SubCategory');
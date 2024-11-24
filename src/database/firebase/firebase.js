import * as firebase from 'firebase';
import "firebase/database";

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyCHGOg6zhT96i4YiFMqk_kRacXr_VryqqM",
  authDomain: "homodemo-a72ec.firebaseapp.com",
  databaseURL: "https://homodemo-a72ec.firebaseio.com",
  projectId: "homodemo-a72ec",
  storageBucket: "homodemo-a72ec.appspot.com",
  messagingSenderId: "156508141120",
  appId: "1:156508141120:web:772171bdb7b56feb8e51a5"
}

//FirebaseApp.initializeApp();
if (!firebase.apps.length) { 
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export default firebase;

export const rootRef = firebase.database().ref();
export const walletRef = rootRef.child('Wallet');
export const categoryRef = rootRef.child('Category');
export const userRef = rootRef.child('users');

// let uid = 'none';
// if(firebase.auth().currentUser) {
//     uid = firebase.auth().currentUser.uid;
// }


// export const userWalletRef = userRef.child(uid).child('Wallet/');
// export const userCategoryRef = userRef.child(uid).child('Category/');
// // console.log(userCategoryRef);
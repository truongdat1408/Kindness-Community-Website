// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2bXPMe0q5Z3IVr-VfQzt6QTWHHSI5Df0",
  authDomain: "kcproject-89ec8.firebaseapp.com",
  projectId: "kcproject-89ec8",
  storageBucket: "kcproject-89ec8.appspot.com",
  messagingSenderId: "863423940641",
  appId: "1:863423940641:web:fc93184c0f21888322fb60",
  measurementId: "G-VJZHG35635"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };

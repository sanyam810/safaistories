// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "safaistories-3bafe.firebaseapp.com",
  projectId: "safaistories-3bafe",
  storageBucket: "safaistories-3bafe.appspot.com",
  messagingSenderId: "708434649250",
  appId: "1:708434649250:web:cc9c203c6c336adcc6b7fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
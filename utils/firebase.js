// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "safai-stories-fireb.firebaseapp.com",
  projectId: "safai-stories-fireb",
  storageBucket: "safai-stories-fireb.appspot.com",
  messagingSenderId: "773016232153",
  appId: "1:773016232153:web:fccd4c9775bdf4e236dec8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
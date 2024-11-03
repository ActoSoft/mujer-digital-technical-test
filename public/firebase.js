// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firabase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrDyR0gykErX7KS0l7pN2dsI_ln7DXbu4",
  authDomain: "webapp-e4a61.firebaseapp.com",
  projectId: "webapp-e4a61",
  storageBucket: "webapp-e4a61.appspot.com",
  messagingSenderId: "61669217504",
  appId: "1:61669217504:web:2fe4adabcb8d2645982c85",
  measurementId: "G-5SNS2D7B6J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

initializeApp();

export const db = getFirestore(app);



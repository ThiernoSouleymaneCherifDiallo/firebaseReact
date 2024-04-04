
import { initializeApp } from "firebase/app";
import 'firebase/compat/firestore'
import firebase from 'firebase/compat/app'

const firebaseConfig = {
  apiKey: "AIzaSyCSbYVN0g3GQ-heqPQQCBhtQvvMrO-42X8",
  authDomain: "odc-create-fae73.firebaseapp.com",
  projectId: "odc-create-fae73",
  storageBucket: "odc-create-fae73.appspot.com",
  messagingSenderId: "545576489072",
  appId: "1:545576489072:web:63a546bb58970068b7a4b5"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()

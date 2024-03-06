// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzH2E9wQyJg89kBjngeIJVybEdKC4x6R0",
  authDomain: "movie-681d8.firebaseapp.com",
  projectId: "movie-681d8",
  storageBucket: "movie-681d8.appspot.com",
  messagingSenderId: "46417893379",
  appId: "1:46417893379:web:2e11910504d78a49a01636",
  measurementId: "G-47HW4TLNN8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
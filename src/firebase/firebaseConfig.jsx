// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSKbN_4jmRWegXaWMYG-S97BsuM7uAIJk",
  authDomain: "fir-twitterclone-892b5.firebaseapp.com",
  projectId: "fir-twitterclone-892b5",
  storageBucket: "fir-twitterclone-892b5.appspot.com",
  messagingSenderId: "279247343186",
  appId: "1:279247343186:web:4767d212764948690b198b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// yetkilendirmne

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

// veri tabanının referansını alma
export const db = getFirestore(app);

// medyaları depolayacağımız yer
export const storage = getStorage(app);

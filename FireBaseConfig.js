// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , connectAuthEmulator} from "firebase/auth"
import {getFirestore, collection, onSnapshot} from "firebase/firestore"
import { useEffect, useState } from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDttSlTrcmAF4v7Qub3agC2C4C4Pf5Sut8",
  authDomain: "stoktakip-a477e.firebaseapp.com",
  projectId: "stoktakip-a477e",
  storageBucket: "stoktakip-a477e.appspot.com",
  messagingSenderId: "176866557333",
  appId: "1:176866557333:web:68746cfe6846407af3ca9c"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

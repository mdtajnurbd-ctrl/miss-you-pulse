// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebaseConfig = {
  apiKey: "AIzaSyBDlYHRIKJ_tx1g-PgV8MdBnbyspjmoZqY",
  authDomain: "miss-you-pulse-db.firebaseapp.com",
  databaseURL: "https://miss-you-pulse-db-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "miss-you-pulse-db",
  storageBucket: "miss-you-pulse-db.firebasestorage.app",
  messagingSenderId: "447203090073",
  appId: "1:447203090073:web:2fd23f2c21e26d3c60e208",
  measurementId: "G-8J50MX9JDM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrmYrWi40PTD_GLAAU4GXXrXlaI_qA1dQ",
  authDomain: "chatpap-8c281.firebaseapp.com",
  projectId: "chatpap-8c281",
  storageBucket: "chatpap-8c281.appspot.com",
  messagingSenderId: "552519682061",
  appId: "1:552519682061:web:bf3af7c0a0590f45c66d44"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp
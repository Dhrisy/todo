// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVXuyOFmK67Jy5Cb4HLxRKRdCFZqqtya8",
  authDomain: "react-projects-b92e0.firebaseapp.com",
  projectId: "react-projects-b92e0",
  storageBucket: "react-projects-b92e0.appspot.com",
  messagingSenderId: "66870792254",
  appId: "1:66870792254:web:d04aeaf0243962f1a1416f",
  measurementId: "G-N4REJC56N1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db, auth, analytics };
 
export default app;
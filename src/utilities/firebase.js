import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyAwTRMW0PMDxqutB2Fnqqbxf5r8vrw8BB8",
  authDomain: "vue-full-course-6db5c.firebaseapp.com",
  projectId: "vue-full-course-6db5c",
  storageBucket: "vue-full-course-6db5c.appspot.com",
  messagingSenderId: "22088346735",
  appId: "1:22088346735:web:60dccb50292e3f241a319a",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;

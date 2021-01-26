import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "",
  authDomain: "vue-full-course-6db5c.firebaseapp.com",
  projectId: "vue-full-course-6db5c",
  storageBucket: "vue-full-course-6db5c.appspot.com",
  messagingSenderId: "22088346735",
  appId: "",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfiKaErYHphYbf2CM3nvOwljZ4NOaV1Yw",
  authDomain: "linkedin-app-ccade.firebaseapp.com",
  projectId: "linkedin-app-ccade",
  storageBucket: "linkedin-app-ccade.appspot.com",
  messagingSenderId: "291494986027",
  appId: "1:291494986027:web:8374437dbf0de8f8a4056e",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, storage, provider };
export default db;

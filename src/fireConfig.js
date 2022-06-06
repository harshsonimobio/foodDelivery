import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUeZwFGwgAK2kQKJHVHHiaREU2AvwB_FI",
  authDomain: "resttro.firebaseapp.com",
  projectId: "resttro",
  storageBucket: "resttro.appspot.com",
  messagingSenderId: "282649406051",
  appId: "1:282649406051:web:fce22a2a47b455503ce656",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app)

export default fireDB
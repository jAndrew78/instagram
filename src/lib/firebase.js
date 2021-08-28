import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import { seedDatabase } from '../seed';


const config = {
  apiKey: "AIzaSyBz6Ku8Rtv7gewepgDGjUZ0TbdbG607Xls",
  authDomain: "instagram-b1fb0.firebaseapp.com",
  projectId: "instagram-b1fb0",
  storageBucket: "instagram-b1fb0.appspot.com",
  messagingSenderId: "785144268210",
  appId: "1:785144268210:web:ecb0d74232a078663150ab"
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// CALL SEED FILE ***ONCE ONLY***
// // // // // seedDatabase(firebase);

export { firebase, FieldValue };

import * as firebase from "firebase";
import "@firebase/firestore";
// import { FIRE_KEY } from '@env'
const firebaseConfig = {
  apiKey: "AIzaSyBzgtgCGnnIQSXjlnbwPV5bj0f3aZVcJzE",
  authDomain: "capacity-gljs.firebaseapp.com",
  databaseURL: "https://capacity-gljs.firebaseio.com",
  projectId: "capacity-gljs",
  storageBucket: "capacity-gljs.appspot.com",
  messagingSenderId: "239734981243",
  appId: "1:239734981243:web:154f2650030301b08e58de",
  measurementId: "G-GD7Y49JDE0",
}; // apiKey, authDomain, etc. (see above)

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }

  // Do other things
});

export const db = firebase.firestore();

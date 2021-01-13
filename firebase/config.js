import * as firebase from "firebase";
import "@firebase/firestore";
import {
  FIRE_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  MESSAGE_SENDER_ID,
  APP_ID,
  MEASURE_ID
 } from '@env'
 
const firebaseConfig = {
  apiKey: FIRE_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: "capacity-gljs.appspot.com",
  messagingSenderId: MESSAGE_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASURE_ID,
}; // apiKey, authDomain, etc. (see above)

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }

  // Do other things
});

export const db = firebase.firestore();

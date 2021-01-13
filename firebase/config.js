import * as firebase from "firebase";
import "@firebase/firestore";
import { FIRE_CONFIG } from "../API_KEYS";

firebase.initializeApp(FIRE_CONFIG);

firebase.auth().onAuthStateChanged((user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }
});

export const db = firebase.firestore();

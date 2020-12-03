import * as firebase from 'firebase'
import '@firebase/firestore';

const firebaseConfig = { 
    apiKey: "AIzaSyCFfgiGo0iMIlrP_yJuDah5u6P5_AT6bUE",
    authDomain: "capacity-gljs.firebaseapp.com",
    databaseURL: "https://capacity-gljs.firebaseio.com",
    projectId: "capacity-gljs",
    storageBucket: "capacity-gljs.appspot.com",
    messagingSenderId: "239734981243",
    appId: "1:239734981243:web:154f2650030301b08e58de",
    measurementId: "G-GD7Y49JDE0"
}  // apiKey, authDomain, etc. (see above)

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
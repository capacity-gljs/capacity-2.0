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


/*db.collection("characters").doc("mario").set({
  employment: "plumber",
  outfitColor: "red",
  specialAttack: "fireball"
})*/


/*// Get a new write batch
const batch = db.batch();

// Set the value of 'NYC'
const newPlaces = db.collection('places').doc('Whole Foods in Westwood');
batch.set(newPlaces, {name: 'Whole Foods Westwood'});

// Commit the batch
await batch.commit();
*/

/*
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.1.1/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBzgtgCGnnIQSXjlnbwPV5bj0f3aZVcJzE",
    authDomain: "capacity-gljs.firebaseapp.com",
    databaseURL: "https://capacity-gljs.firebaseio.com",
    projectId: "capacity-gljs",
    storageBucket: "capacity-gljs.appspot.com",
    messagingSenderId: "239734981243",
    appId: "1:239734981243:web:154f2650030301b08e58de",
    measurementId: "G-GD7Y49JDE0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>
*/
import { db } from "../../firebase/config";
//import { uuidv1 } from "uuid";

// get capacity
// export const getCapacity = (placeId) => {
//   const places = db.collection('places');
//     const rating = places
//       .doc(placeId)
//       .collection('capacity')
//       .get()
//       .then((snap) => {
//         snap.forEach((doc) => {
//           this.setState({ ratings: doc.data() });
//           console.log('CAPACITY GET CAPACITY FUNC', doc.data());
//         });
//       });
// }

export const getOrAddPlace = async (placeId, placeLat, placeLng, placeName) => {
  const placeRef = db.collection("places").doc(placeId);

  const docSnapshot = await placeRef.get();
  if (!docSnapshot.exists) {
    console.log("THE PLACE DOES NOT EXIST YET");
    const newPlace = await db.collection("places").doc(placeId).set({
      placeName: placeName,
      avgCapacity: 0,
      numCapacities: 0,
      lat: placeLat,
      long: placeLng,
    });
    console.log("HI I CREATED A NEW PLACE: ", placeId);
    //placeRef.set({placeName, avgCapacity: 0, numRatings: 0, placeLat, placeLng, placeName}) // create the document
  } else {
    ("IT THINKS THE PLACE EXISTS");
  }

  /*if(!doc) {
    console.log('AM I RUNNING')
    db.collection('places').doc(placeId).set({placeName, avgCapacity: 0, numRatings: 0, placeLat, placeLng, placeName})
  } else {
    return
  }*/
};
// add capacity
export const addCapacity = async (placeId, capacityPercent) => {
  const placeRef = db.collection("places").doc(placeId);
  const capacityRef = placeRef.collection("capacity").doc();

  try {
    await db.runTransaction(async (transaction) => {
      let doc;
      try {
        doc = await transaction.get(placeRef);
      } catch (error) {
        console.log("THIS IS THE ERROR", error);
        throw error;
      }

      if (!doc.exists) {
        throw "Document does not exist!";
      }
      // Compute new number of ratings
      const newNumCapacities = doc.data().numCapacities + 1;
      // Compute new average rating
      var oldCapacityTotal = doc.data().avgCapacity * doc.data().numCapacities;
      var newAvgCapacity =
        (oldCapacityTotal + capacityPercent) / newNumCapacities;

      // Commit to Firestore
      transaction.update(placeRef, {
        numCapacities: newNumCapacities,
        avgCapacity: newAvgCapacity,
      });
      transaction.set(capacityRef, { capacityPercent: capacityPercent });
    });
  } catch (err) {
    console.log(err);
  }
};

export const addUser = (email, password) => {
  db.collection("users").doc().collection("info").add({ email, password });
};

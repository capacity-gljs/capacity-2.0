import firebase from "firebase";
import { db } from "../../firebase/config";

// for reference - first successful writing to firestore
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
        console.error("THIS IS THE ERROR", error);
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
    console.error(err);
  }
};

// add fave to db
export const addFave = async (
  userId,
  placeId,
  placeName,
  latitude,
  longitude
) => {
  try {
    const userRef = db.collection("users").doc(userId);
    const favesRef = userRef.collection("favorites").doc(placeId);
    await db.runTransaction(async (transaction) => {
      transaction.set(favesRef, {
        favorited: true,
        placeName,
        coordinates: { latitude, longitude },
      });
    });
  } catch (error) {
    console.error(error);
  }
};

// remove user's fave from db
export const removeFave = async (userId, placeId) => {
  try {
    const userRef = db.collection("users").doc(userId);
    const favesRef = userRef.collection("favorites").doc(placeId);
    await db.runTransaction(async (transaction) => {
      transaction.set(favesRef, { favorited: false });
    });
  } catch (error) {
    console.error(error);
  }
};

// get fave
export const updateFave = async (userId, placeId) => {
  try {
    const userRef = db.collection("users").doc(userId);
    const favesRef = userRef.collection("favorites").doc(placeId);
    let favorited = false;
    try {
      await db.runTransaction(async (transaction) => {
        const doc = await transaction.get(favesRef);
        favorited = doc.data().favorited;
      });
    } catch (error) {
      return false;
    }
    return favorited;
  } catch (error) {
    console.error(error);
  }
};

export const getFave = async (userId) => {
  try {
    const userRef = db.collection("users").doc(userId).collection("favorites");
    const userFaves = await userRef.where("favorited", "==", true).get();
    const favorites = [];
    userFaves.forEach((doc) => {
      favorites.push(doc.data());
    });
    if (userFaves.empty) {
      console.log("No matching documents.");
    } else {
      console.log("THESE ARE MY FAVES: ", favorites);
    }
  } catch (error) {
    console.error(error);
  }
};

//adds feedback to db
export const addFeedback = async (placeId, experience, boostOrPromote) => {
  try {
    const placeRef = db.collection("places").doc(placeId);
    const feedbackRef = placeRef.collection("feedback").doc();
    await db.runTransaction(async (transaction) => {
      transaction.set(feedbackRef, { experience, boostOrPromote });
    });
  } catch (error) {
    console.log(error);
  }
};
//gets all average capacities for all single places in DB
export const getAllCaps = async () => {
  try {
    const placesRef = db.collection("places");
    const placeDocs = await placesRef.get();
    const places = [];
    placeDocs.forEach((doc) => {
      places.push(doc.data());
    });
    return places;
  } catch (error) {
    console.error(error);
  }
};

//gets points for heatmap
export const getHeat = async () => {
  try {
    const locations = await getAllCaps();
    const place = [];
    locations.forEach((obj) => {
      delete obj.placeName;
      delete obj.numCapacities;
      obj["latitude"] = obj["lat"];
      obj["longitude"] = obj["long"];
      obj["weight"] = obj["avgCapacity"];
      delete obj.lat;
      delete obj.long;
      delete obj.avgCapacity;
      place.push(obj);
    });

    return place;
  } catch (error) {
    console.error(error);
  }
};

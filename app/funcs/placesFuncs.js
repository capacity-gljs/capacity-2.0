import firebase from "firebase";
import { db } from "../../firebase/config";

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
      let oldCapacityTotal = doc.data().avgCapacity * doc.data().numCapacities;
      let newAvgCapacity =
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

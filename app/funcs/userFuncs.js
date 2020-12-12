import firebase from "firebase";
import { db } from "../../firebase/config";

// USER FAVES

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
    //query users to get the placesIds of the user's favorite places
    const userRef = db.collection("users").doc(userId).collection("favorites");
    const userFaves = await userRef.where("favorited", "==", true).get();
    const favorites = [];
    const favoritesId = [];
    userFaves.forEach((doc) => {
      favorites.push(doc.data());
      favoritesId.push(doc.id);
    });
    const placeDetails = [];
    for (let i = 0; i < favoritesId.length; i++) {
      let placeId = favoritesId[i];

      //query users to get the placeName
      const userPlaceRef = db
        .collection("users")
        .doc(userId)
        .collection("favorites")
        .doc(placeId);
      const userPlaceSnapshot = await userPlaceRef.get();
      const userPlaceData = userPlaceSnapshot.data();
      const placeName = userPlaceData.placeName;

      //query places collection to get the avgCapacity
      const placeRef = db.collection("places").doc(placeId);
      const placeSnapshot = await placeRef.get();
      const placeData = placeSnapshot.data();
      if (placeData) {
        const avgCapacity = placeData.avgCapacity;
        placeDetails.push({ [placeName]: avgCapacity });
      } else {
        placeDetails.push({ [placeName]: "No Capacity Information" });
      }
    }
    //check if the user has any favorites
    if (userFaves.empty) {
      console.log("No matching documents.");
      placeDetails.push("You have no places favorited");
      return placeDetails;
    } else {
      console.log("THESE ARE THE FAVES PLACES DETAILS: ", placeDetails);

      //return array of objects with users favorite place name and capacity as key value pairs
      return placeDetails;
    }
  } catch (error) {
    console.error(error);
  }
};

//USER FEEDBACK

//adds feedback to db
export const addFeedback = async (placeId, experience, boostOrPromote) => {
  try {
    const placeRef = db.collection("places").doc(placeId);
    const feedbackRef = placeRef.collection("feedback").doc();
    await db.runTransaction(async (transaction) => {
      transaction.set(feedbackRef, { experience, boostOrPromote });
    });
  } catch (error) {
    console.error(error);
  }
};


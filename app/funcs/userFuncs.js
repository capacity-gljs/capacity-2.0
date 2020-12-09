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
    const userRef = db.collection("users").doc(userId).collection("favorites");
    const userFaves = await userRef.where("favorited", "==", true).get();
    const favorites = [];
    userFaves.forEach((doc) => {
      favorites.push(doc.data());
    });
    if (userFaves.empty) {
      console.log("No matching documents.");
    } else {
      // console.log("THESE ARE MY FAVES: ", favorites);
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

export const logoutUser = async () => {
  try {
    const response = await firebase.auth().signOut();
    alert("You are now logged out");
  } catch (error) {
    alert(error);
  }
};

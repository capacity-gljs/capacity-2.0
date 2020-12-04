import { db } from "../../firebase/config";
import { uuidv1 } from "uuid";

// get place
// not needed
// export const getPlace = () => {

// }

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

// add capacity
export const addCapacity = (
  placeId,
  capacityPercent,
  placeLat,
  placeLng,
  placeName
) => {
  db.collection("places").doc(placeId).set({ placeName });
  db.collection("places")
    .doc(placeId)
    .collection("capacity")
    .add({ capacityPercent, placeLat, placeLng });
};
export const addUser = (email, password) => {
  db.collection("users").doc().collection("info").add({ email, password });
};

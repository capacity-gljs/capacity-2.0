import { db } from '../../firebase/config';

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
export const addCapacity = (placeId, capacityPercent, placeLat, placeLng) => {
  console.log('ADD CAP FUNC', placeLat, placeLng)
  db.collection('places').doc(placeId).collection('capacity').add({capacity: capacityPercent, latitude: placeLat, longitude: placeLng})
}


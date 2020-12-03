import { db } from '../../firebase/config';

// add capacity
export const addCapacity = (placeId, capacityPercent) => {
  db.collection('places').doc(placeId).collection('capacity').add({capacity: capacityPercent})
}
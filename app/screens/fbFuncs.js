import { db } from '../../firebase/config';

// get place


// get capacity


// add capacity
export const addCapacity = (placeId, capacityPercent) => {
  db.collection('places').doc(placeId).collection('capacity').add({capacity: capacityPercent})
}


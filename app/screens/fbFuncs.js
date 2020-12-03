import { db } from '../../firebase/config';

// add capacity
export const addCapacity = () => {
  // want it to add a new place to the db
  // AND adds it's capacity to it's ratings subcollection
  const addPlace = db.collection('places').doc().collection().add()
}
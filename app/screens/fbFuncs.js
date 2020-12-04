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

export const getOrAddPlace = async (placeId, placeLat, placeLng, placeName) => {
  const placeRef = db.collection('places').doc(placeId);
  //const doc = await placeRef.get()
  //console.log('THIS IS THE DOC', doc)

  placeRef.get()
  .then((docSnapshot) => {
    if (!docSnapshot.exists) {
      console.log("THE PLACE DOES NOT EXIST YET")
      db.collection('places').doc(placeId).set({placeName: placeName, avgCapacity: 0, numRatings: 0, lat: placeLat, long: placeLng})

      //placeRef.set({placeName, avgCapacity: 0, numRatings: 0, placeLat, placeLng, placeName}) // create the document
    } else {
      ('IT THINKS THE PLACE EXISTS')
      return
    }
});

  /*if(!doc) {
    console.log('AM I RUNNING')
    db.collection('places').doc(placeId).set({placeName, avgCapacity: 0, numRatings: 0, placeLat, placeLng, placeName})
  } else {
    return
  }*/
  
}
// add capacity
export const addCapacity = (placeId, capacityPercent) => {
  
  const placeRef = db.collection('places').doc(placeId);
  const capacityRef = placeRef.collection('capacity').doc();

  return db.runTransaction(transaction => {
    return transaction.get(placeRef).then(res => {

        if (!res.exists) {
          //transaction.set(placeRef, {placeName, avgCapacity: 50, numRatings: 0})
         // console.log('I MADE IT THIS FAR')
          throw "Document does not exist!";
        }

        // Compute new number of ratings
        const newNumCapacities = res.data().numCapacities + 1;

        // Compute new average rating
        var oldCapacityTotal = res.data().avgCapacity * res.data().numCapacities;
        var newAvgCapacity = (oldCapacityTotal + capacityPercent) / newNumCapacities;

        // Commit to Firestore
        transaction.update(placeId, {
          numCapacities: newNumCapacities,
          avgCapacity: newAvgCapacity
        });
        transaction.set(capacityRef, { capacityPercent: capacityPercent });
    })
});

  //db.collection('places').doc(placeId).set({placeName, avgCapacity: null, numRatings: 0})
  //db.collection('places').doc(placeId).collection('capacity').add({capacityPercent, placeLat, placeLng})
}


/*function addRating(restaurantRef, rating) {
  // Create a reference for a new rating, for use inside the transaction
  var ratingRef = restaurantRef.collection('ratings').doc();

  // In a transaction, add the new rating and update the aggregate totals
  return db.runTransaction(transaction => {
      return transaction.get(restaurantRef).then(res => {
          if (!res.exists) {
              throw "Document does not exist!";
          }

          // Compute new number of ratings
          var newNumRatings = res.data().numRatings + 1;

          // Compute new average rating
          var oldRatingTotal = res.data().avgRating * res.data().numRatings;
          var newAvgRating = (oldRatingTotal + rating) / newNumRatings;

          // Commit to Firestore
          transaction.update(restaurantRef, {
              numRatings: newNumRatings,
              avgRating: newAvgRating
          });
          transaction.set(ratingRef, { rating: rating });
      })
  });
}
*/
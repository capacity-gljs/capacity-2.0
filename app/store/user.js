import firebase from "firebase";
import { db } from "../../firebase/config";

const GOT_USER = "GOT_USER";
const gotUser = (user) => ({ type: GOT_USER, user });

/**
  It's interesting to note that this is the only async call being done through Redux / Thunk. At this point, it would be most consistent if we didn't use Redux at all for this state and only managed it on the React side. If you have time set aside for refactoring this week, I'd recommend refactoring this so that either you utilize Redux more or remove it completely.
*/

export const signUp = (email, password) => async (dispatch) => {
  try {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    db.collection("users")
      .doc(response.user.uid)
      .set({ uid: response.user.uid, email: email });
    //console.log('SIGNUP RESPONSE', response.user);
    dispatch(gotUser(response.user));
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    //console.log(response.user);
    dispatch(gotUser(response.user));
  } catch (error) {
    alert(error);
  }
};

export default (state = {}, action) => {
  switch (action.type) {
    case GOT_USER:
      return action.user;
    default:
      return state;
  }
};

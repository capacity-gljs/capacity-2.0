import firebase from "firebase";
import { db } from "../../firebase/config";

const GOT_USER = "GOT_USER";
const gotUser = (user) => ({ type: GOT_USER, user });

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

export const logoutUser = (email, password) => async (dispatch) => {
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

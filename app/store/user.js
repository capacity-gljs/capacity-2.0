// import Firebase from "../../firebase/config"

// const GOT_USER = "GOT_USER"
// const gotUser = (user) => ({type: GOT_USER, user})

// export const signUp = (email, password) => async (dispatch) => {
//   try {
//     console.log(Firebase)
//     const { user } = await Firebase.auth().createUserWithEmailAndPassword(
//       email,
//       password
//     );
//     dispatch(gotUser(user))
//   } catch (error) {
//     console.error(error);
//   }
// };

// export default (state = {}, action) => {
//   switch (action.type) {
//     case GOT_USER:
//       return action.user
//     default:
//       return state;
//   }
// };


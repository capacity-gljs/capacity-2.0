// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   TextInput,
//   Button,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import RadioForm, {
//   RadioButton,
//   RadioButtonInput,
//   RadioButtonLabel,
// } from "react-native-simple-radio-button";
// import { singlePlace } from "./styles";

// function SignUpScreen(props) {
//   let capacityPercent = 77;
//   return (
//     <SafeAreaView style={singlePlace.safeArea}>
//       <View>
//         <Text style={singlePlace.title}>{props.route.params.name}</Text>
//         <Text style={singlePlace.subtitle}>
//           This location is at {capacityPercent}% capacity
//         </Text>
//       </View>
//       <View>
//         <Text>
//           {Array(capacityPercent)
//             .fill()
//             .map((_, index) => (
//               <React.Fragment key={index}>
//                 <Ionicons
//                   key={index}
//                   style={singlePlace.icon}
//                   name="md-person"
//                   size={32}
//                   color="black"
//                 />
//                 {"  "}
//               </React.Fragment>
//             ))}
//           {Array(100 - capacityPercent)
//             .fill()
//             .map((_, index) => (
//               <React.Fragment key={index}>
//                 <Ionicons
//                   key={index}
//                   style={singlePlace.icon}
//                   name="md-person"
//                   size={32}
//                   color="grey"
//                 />
//                 {"  "}
//               </React.Fragment>
//             ))}
//         </Text>
//       </View>
//       <View style={{ alignItems: "center" }}>
//         <Text style={singlePlace.subtitle}>How Crowded Was It?</Text>
//         <RadioForm
//           radio_props={[
//             { label: "Empty", value: 0 },
//             { label: "A Few People", value: 1 },
//             { label: "Half Full", value: 2 },
//             { label: "Full", value: 3 },
//             { label: "Crowded", value: 4 },
//           ]}
//           onPress={() => {}}
//           formHorizontal={true}
//           labelHorizontal={false}
//           style={{ textAlign: "center" }}
//         />
//         <Button title="Submit" />
//       </View>
//     </SafeAreaView>
//   );
// }

// export default SignUpScreen;

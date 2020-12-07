import React, { useState } from "react";
import {
  Image,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { singlePlace } from "./styles";
import { connect } from "react-redux";
import { signUp } from "../store/user";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { addFeedback } from "./fbFuncs";

function UserFeedbackScreen({ navigation, route }) {
  
  const [experience, setExperience] = useState(-1);
  const [boostOrPromote, setBoostOrPromote] = useState(false);

  return (
    <SafeAreaView>
      <View style={{ alignItems: "center" }}>
        <Text style={singlePlace.subtitle}>Experience</Text>
        <RadioForm
          key={0}
          radio_props={[
            { label: "", value: 1 },
            { label: "", value: 2 },
            { label: "", value: 3 },
            { label: "", value: 4 },
            { label: "", value: 5 },
          ]}
          initial={-1}
          onPress={(exp) => setExperience(exp)}
          formHorizontal={true}
          labelHorizontal={false}
          style={{ textAlign: "center" }}
        />
        <RadioForm
          key={0}
          radio_props={[
            { label: "", value: false },
            { label: "", value: true },
          ]}
          initial={-1}
          onPress={(boost) => setBoostOrPromote(boost)}
          formHorizontal={true}
          labelHorizontal={false}
          style={{ textAlign: "center" }}
        />
        <Button
          title="Submit"
          onPress={async () => {
            console.log(route.params.placeId)
            await addFeedback(route.params.placeId, experience, boostOrPromote);
          }}
        />
      </View>
    </SafeAreaView>
  );
}


export default connect(null, null)(UserFeedbackScreen);

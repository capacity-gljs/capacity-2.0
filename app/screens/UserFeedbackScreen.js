import React, { useState } from "react";
import {
  Image,
  Button,
  Text,
  TextInput,
  Picker,
  TouchableOpacity,
  View,
  Switch,
  SafeAreaView,
} from "react-native";
import { singlePlace, UserFeedback } from "./styles";
import { connect } from "react-redux";
import { signUp } from "../store/user";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { addFeedback } from "../funcs/userFuncs";
import Slider from "@react-native-community/slider";

function UserFeedbackScreen({ navigation, route }) {
  const [experience, setExperience] = useState(1);
  const [boostOrPromote, setBoostOrPromote] = useState(false);
  let experienceText;
  if (experience === 1) experienceText = "Abort";
  else if (experience === 2) experienceText = "Chill";
  else if (experience === 3) experienceText = "Stressful";
  return (
    <SafeAreaView>
      <View style={{ alignItems: "center" }}>
        <Text style={singlePlace.subtitle}>How was your experience?</Text>
        {/* <RadioForm
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
        /> */}
        <Text>{experienceText}</Text>
        <Slider
          style={{ width: "50%", height: 40 }}
          minimumValue={1}
          maximumValue={3}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={(val) => {
            setExperience(val);
          }}
          step={1}
        />
        <Text style={singlePlace.subtitle}>Boost?</Text>

        {/* <RadioForm
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
        /> */}
        <Switch
          onValueChange={() => {
            setBoostOrPromote(!boostOrPromote);
          }}
          value={boostOrPromote}
        />
        <Button
          title="Submit"
          onPress={async () => {
            console.log(route.params.placeId);
            await addFeedback(route.params.placeId, experience, boostOrPromote);
            alert("Thanks for leaving feedback!");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default connect(null, null)(UserFeedbackScreen);

import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { SignUp } from "./styles";
import { connect } from "react-redux";
import { signUp } from "../store/user";

function UserFeedbackScreen({ navigation, signUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    signUp(email, password);
    alert("Registered Successfully");
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView>
      <View style={{ alignItems: "center" }}>
        <Text style={singlePlace.subtitle}>Experience</Text>
        <RadioForm
          key={this.state.formLabel}
          radio_props={this.state.capacities}
          initial={this.state.initialRadioPos}
          onPress={this.handleChange}
          formHorizontal={true}
          labelHorizontal={false}
          style={{ textAlign: "center" }}
        />
        <Button title="Submit" onPress={this.handleSubmit} />
      </View>
    </SafeAreaView>
  );
}

const mapDispatch = (dispatch) => ({
  signUp: (email, password) => dispatch(signUp(email, password)),
});

export default connect(null, mapDispatch)(UserFeedbackScreen);

import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
//import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SignUp } from "./styles";

function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {};

  return (
    <SafeAreaView>
      <View
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <TextInput
          style={SignUp.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={SignUp.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={SignUp.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={SignUp.button}
          onPress={() => onRegisterPress()}
        >
          <Text>Create account</Text>
        </TouchableOpacity>
        <View>
          <Text style={SignUp.footerText}>
            Already have an account?{" "}
            <Text onPress={onFooterLinkPress} style={SignUp.footerLink}>
              Log in
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SignUpScreen;

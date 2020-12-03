import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
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
    <View>
      <View
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        {/* <Image
          style={styles.logo}
          source={require("../../../assets/icon.png")}
        /> */}
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
          <Text>
            Already have an account?{" "}
            <Text onPress={onFooterLinkPress}>
              Log in
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

export default SignUpScreen
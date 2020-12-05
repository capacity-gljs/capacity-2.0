import React, { useState } from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import { SignUp } from './styles';
// import { loginUser } from "./fbFuncs";

function LoginScreen({ navigation, login }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFooterLinkPress = () => {
    navigation.navigate('Login'); // should this be 'Registration'
  };

  const onLoginPress = () => {
    // addUser(email, password); // replace with function to login from fbFuncs
    alert('Login Successful');
    // navigation.navigate("Home"); // want it to go to the singlePlace screen?
  };

  return (
    <SafeAreaView>
      <View
        style={{ flex: 1, width: '100%' }}
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
        <TouchableOpacity
          style={SignUp.button}
          onPress={() => onLoginPress()}
        >
          <Text>Log in</Text>
        </TouchableOpacity>
        <View>
          <Text style={SignUp.footerText}>
            No account?{' '}
            <Text onPress={onFooterLinkPress} style={SignUp.footerLink}>
              Log in
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;

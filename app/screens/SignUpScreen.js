import React, { useState } from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import { SignUpLogin } from './styles';
import { connect } from 'react-redux';
import { signUp } from '../store/user';

function SignUpScreen({ navigation, signUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onFooterLinkPress = () => {
    navigation.navigate('Login');
  };

  const onRegisterPress = () => {
    signUp(email, password);
    navigation.navigate('Capacity');
  };

  return (
    <SafeAreaView>
      <View
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always"
      >
        <TextInput
          style={SignUpLogin.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={SignUpLogin.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={SignUpLogin.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={SignUpLogin.button}
          onPress={() => onRegisterPress()}
        >
          <Text>Create account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={SignUpLogin.button}
          onPress={() => onFooterLinkPress()}
        >
          <Text>Log in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const mapDispatch = (dispatch) => ({
  signUp: (email, password) => dispatch(signUp(email, password)),
});

export default connect(null, mapDispatch)(SignUpScreen);

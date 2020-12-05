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
import { connect } from 'react-redux';
import { loginUser } from '../store/user';

function LoginScreen({ navigation, loginUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFooterLinkPress = () => {
    navigation.navigate('SignUp');
  };

  const onLoginPress = () => {
    loginUser(email, password);
    alert('Login Successful');
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
        <TouchableOpacity style={SignUp.button} onPress={() => onLoginPress()}>
          <Text>Log in</Text>
        </TouchableOpacity>
        <View>
          <Text style={SignUp.footerText}>
            No account?{' '}
            <Text onPress={onFooterLinkPress} style={SignUp.footerLink}>
              Sign up!
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const mapDispatch = (dispatch) => ({
  loginUser: (email, password) => dispatch(loginUser(email, password)),
});

export default connect(null, mapDispatch)(LoginScreen);

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
import { logoutUser } from '../store/user';

function LogoutScreen({ navigation, logoutUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFooterLinkPress = () => {
    navigation.navigate('SignUp');
  };

  const onLogoutPress = () => {
    logoutUser();
    alert('Login Successful');
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView>
      <View
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always"
      >
        <TouchableOpacity style={SignUpLogin.button} onPress={() => onLogoutPress()}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const mapDispatch = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(null, mapDispatch)(LogoutScreen);

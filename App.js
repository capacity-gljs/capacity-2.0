import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import {Routes} from './app/screens/Menu' 
import store from './app/store';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { useTheme } from '@react-navigation/native';
// import * as Linking from 'expo-linking';

export default function App() {
  const scheme = useColorScheme();
  const { colors } = useTheme();
  return (
    <Provider store={store}>
      <AppearanceProvider>
        <NavigationContainer
          theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Routes />
        </NavigationContainer>
      </AppearanceProvider>
    </Provider>
  );
}

import React from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import HomeScreen from './app/screens/HomeScreen';
import SinglePlaceScreen from './app/screens/SinglePlaceScreen';
import SignUpScreen from './app/screens/SignUpScreen';
import LoginScreen from './app/screens/LoginScreen';
import UserFeedbackScreen from './app/screens/UserFeedbackScreen';
import store from './app/store';
import CameraScreen from './app/screens/CameraScreen';
import UserFavesScreen from './app/screens/UserFavesScreen';
import { Loader } from './app/screens/loader';
import { logoutUser } from './app/funcs/userFuncs';
import { DrawerStyle } from './app/screens/styles';
import { Ionicons } from '@expo/vector-icons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { useTheme } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Log out" onPress={() => logoutUser()} />
      <View style={DrawerStyle.bottomDrawerSection}>
        <DrawerItem label="Creators" labelStyle={{ fontSize: 13 }} />
        <DrawerItem
          label="Samantha Jardanowski"
          labelStyle={DrawerStyle.labelStyle}
          icon={() => (
            <AntDesign name="linkedin-square" size={20} color="black" />
          )}
          onPress={() =>
            Linking.openURL('https://www.linkedin.com/in/samantha-jardanowski/')
          }
        />
        <DrawerItem
          label="Laura Maranto"
          labelStyle={DrawerStyle.labelStyle}
          icon={() => (
            <FontAwesome name="github" size={24} color="black" />
          )}
          onPress={() => Linking.openURL('https://github.com/lwmaranto')}
        />
        <DrawerItem
          label="Jennifer Rafael"
          labelStyle={DrawerStyle.labelStyle}
          icon={() => (
            <FontAwesome name="github" size={24} color="black" />
          )}
          onPress={() => Linking.openURL('https://github.com/JenniferR326')}
        />
        <DrawerItem
          label="Groana Melendez"
          labelStyle={DrawerStyle.labelStyle}
          icon={() => (
            <AntDesign name="linkedin-square" size={20} color="black" />
          )}
          onPress={() => Linking.openURL('https://www.linkedin.com/in/groana/')}
        />
      </View>
    </DrawerContentScrollView>
  );
}

function DrawerRoutes() {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        initialParams={colors}
      />
      <Drawer.Screen
        name="Favorites"
        component={UserFavesScreen}
        initialParams={colors}
      />
      <Drawer.Screen name="Camera" component={CameraScreen} />
      <Drawer.Screen name="Sign up" component={SignUpScreen} />
      <Drawer.Screen name="Log in" component={LoginScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const scheme = useColorScheme();
  const { colors } = useTheme();
  return (
    <Provider store={store}>
      <AppearanceProvider>
        <NavigationContainer
          theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack.Navigator initialRouteName="Getting Started">
            <Stack.Screen
              name="Getting Started"
              component={Loader}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={DrawerRoutes}
              options={({ navigation, route }) => ({
                headerLeft: () => (
                  <Ionicons
                    name="md-menu"
                    size={24}
                    color={colors.background}
                    style={{ margin: 10 }}
                    onPress={() =>
                      navigation.dispatch(DrawerActions.toggleDrawer())
                    }
                  />
                ),
              })}
            />
            <Stack.Screen
              name="SinglePlace"
              component={SinglePlaceScreen}
              options={({ navigation, route }) => ({
                title: 'Location Details',
              })}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={({ navigation, route }) => ({
                title: 'Sign Up',
                headerLeft: () => (
                  <Ionicons
                    name="md-menu"
                    size={24}
                    color={colors.background}
                    style={{ margin: 10 }}
                    onPress={() =>
                      navigation.dispatch(DrawerActions.toggleDrawer())
                    }
                  />
                ),
              })}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={({ navigation, route }) => ({
                title: 'Log in',
                headerLeft: () => (
                  <Ionicons
                    name="md-menu"
                    size={24}
                    color={colors.background}
                    style={{ margin: 10 }}
                    onPress={() =>
                      navigation.dispatch(DrawerActions.toggleDrawer())
                    }
                  />
                ),
              })}
            />
            <Stack.Screen
              name="Camera"
              component={CameraScreen}
              options={({ navigation, route }) => ({
                title: 'Add a Photo',
                headerLeft: () => (
                  <Ionicons
                    name="md-menu"
                    size={24}
                    color={colors.background}
                    style={{ margin: 10 }}
                    onPress={() =>
                      navigation.dispatch(DrawerActions.toggleDrawer())
                    }
                  />
                ),
              })}
            />
            <Stack.Screen
              name="UserFeedback"
              component={UserFeedbackScreen}
              options={({ navigation, route }) => ({
                title: 'Leave Feedback',
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppearanceProvider>
    </Provider>
  );
}

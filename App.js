import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import HomeScreen from "./app/screens/HomeScreen";
import SinglePlaceScreen from "./app/screens/SinglePlaceScreen";
import SignUpScreen from "./app/screens/SignUpScreen";
import LoginScreen from "./app/screens/LoginScreen";
import UserFeedbackScreen from "./app/screens/UserFeedbackScreen";
import store from "./app/store";
import CameraScreen from "./app/screens/CameraScreen";
import { Button } from "react-native";
// option for drawer with no header
import { createDrawerNavigator } from "@react-navigation/drawer";
import Loader from "./app/screens/loader";
import {logoutUser} from "./app/funcs/userFuncs"
import { DefaultTheme, DarkTheme } from '@react-navigation/native'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'


const Stack = createStackNavigator();


export default function App (){
  
  const scheme = useColorScheme();
  
   
    return (
      
      <Provider store={store}>
        <AppearanceProvider>
        <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack.Navigator
            initialRouteName="Loader"
          >
            <Stack.Screen name="Loader" component={Loader} />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({ navigation, route }) => ({
                headerRight: () => (
                  store.getState().user.uid ? (
                    <Button
                      onPress={() => logoutUser()}
                      title="Log out"
                    />
                  ) : (
                    <Button
                      onPress={() => navigation.navigate("Login")}
                      title="Log in"
                    />
                  )
                ),
                headerLeft: () => (
                  <Button
                    onPress={() => navigation.navigate("SignUp")}
                    title="Sign up"
                  />
                ),
              })}
            />
            <Stack.Screen
              name="SinglePlace"
              component={SinglePlaceScreen}
              options={({ navigation, route }) => ({
                title: "Location Details",
                headerRight: () => (
                  <Button
                    onPress={() => navigation.navigate("Login")}
                    title="Log in"
                  />
                ),
              })}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ title: "Sign Up" }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={({ navigation, route }) => ({
                title: "Log in",
                headerRight: () => (
                  <Button
                    onPress={() => navigation.navigate("Login")}
                    title="Log in"
                  />
                ),
              })}
            />
            <Stack.Screen
              name="Camera"
              component={CameraScreen}
              options={{ title: "Add a Photo" }}
            />
            <Stack.Screen
              name="UserFeedback"
              component={UserFeedbackScreen}
              options={{ title: "Leave Feedback" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        </AppearanceProvider>
      </Provider>
    );
  }


import React from "react";
import HomeScreen from "./app/screens/HomeScreen";
import SinglePlaceScreen from "./app/screens/SinglePlaceScreen";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="SinglePlace"
            component={SinglePlaceScreen}
            options={{ title: "Location Details" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


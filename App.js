import React from "react";
import HomeScreen from "./app/screens/HomeScreen";
import SinglePlaceScreen from "./app/screens/SinglePlaceScreen";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props){
    super(props)
    
    this.state = {
      id: ''
    }
    this.onPlaceSelection = this.onPlaceSelection.bind(this)
  }

  // function to pass props up from homescreen to signle place screen
  onPlaceSelection(homeScreenState){
    this.setState(homeScreenState)
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {/* {props => (<HomeScreen props={...props} onPlaceSelection={this.onPlaceSelection} id={this.state.id}/>)} */}
          <Stack.Screen 
            name="Home"
            component={HomeScreen}
            onPlaceSelection={this.onPlaceSelection}
            id={this.state.id}
          />
          <Stack.Screen
            name="SinglePlace"
            component={SinglePlaceScreen}
            options={{ title: "Location Details" }}
            onPlaceSelection={this.onPlaceSelection}
            id={this.state.id}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


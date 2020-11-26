import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

function getCurrentLocation() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition((position) => {
      let region = {
        latitude: parseFloat(position.coords.latitude),
        longitude: parseFloat(position.coords.longitude),
        latitudeDelta: .1,
        longitudeDelta: .1,
      };
      resolve(region);
    }, reject);
  });
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      initialRegion: null,
    };
  }

  async componentDidMount() {
    const region = await getCurrentLocation();
    this.setState({
      initialRegion: region,
    });
    console.log("THIS IS REGION: ", region);
    console.log("THIS IS THE COMPONENTDIDMOUNT", this.state.initialRegion);
  }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={this.state.initialRegion}
        {...console.log("THIS IS THE MAPVIEW: ", this.state.initalRegion)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

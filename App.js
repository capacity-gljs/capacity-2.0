import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

 function getCurrentLocation() {
   navigator.geolocation.getCurrentPosition(
      position => {
      let region = {
              latitude: parseFloat(position.coords.latitude),
              longitude: parseFloat(position.coords.longitude),
              latitudeDelta: 2,
             
          };
       return region
    
      }
      
  );
}
  
export default class App extends React.Component{
  constructor(){
    super()
    this.state = {
      initialRegion: null
    }
  }

   
  render() {
  
    
  return (
    <MapView
    style = {{flex : 1}}
    provider = {PROVIDER_GOOGLE}
    showsUserLocation 
    showsUserLocation 
     initialRegion = {getCurrentLocation()}    
     
    >
  </MapView>

  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

//  async function getCurrentLocation() {
//   await navigator.geolocation.getCurrentPosition(
//       position => {
//       let region = {
//               latitude: parseFloat(position.coords.latitude),
//               longitude: parseFloat(position.coords.longitude),
//               latitudeDelta: 5,
//               longitudeDelta: 5
//           };
//        return region
    
//       }
      
//   );
// }
  
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
    initialRegion = {{
      latitude: 51.5078788,
      longitude: -0.0877321,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009
    }}
    
    />
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

import React from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'




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
  
export default class App extends React.Component{
  constructor(){
    super()
    this.state = {
      initialRegion: null,
    };
  }


  async componentDidMount() {
    const region = await getCurrentLocation();
    this.setState({
      initialRegion: region,
    });
  
  }



  render() {
    return (
      
      <SafeAreaView style = {styles.safeArea}>
       <MapView
        style = {styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={this.state.initialRegion}
         >
   
      <GooglePlacesAutocomplete  
      style = {styles.input}
      placeholder = 'search'
      minLength = {2}
      fetchDetails = {true}
      onPress={(data, details = null) => {
        console.log(data, details);
      }}
      query={{
          key: 'AIzaSyC7wRQCQ8yH5B-DnqKoNB4PWoKuJ9AQ6fg',
          language: 'en',
        }}
        nearbyPlacesAPI = 'GooglePlacesSearch'
        debounce = {200}
      
      />
       
      
      </MapView>
      </SafeAreaView>
     
     
     );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
   },
   safeArea: {
     flex: 1,
     backgroundColor: 'grey'
   },
   input : {
     borderRadius: 4,
     margin: 5
    
   }
});



import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Alert,
  Button,
  TouchableHighlight,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView,{ PROVIDER_GOOGLE, Marker} from "react-native-maps";
// IMPORT FUNCD
import {
  getCurrentLocation,
  isOpen,
  getColor,
  getType,
  dollarSign,
  getGuidelines,
  heatMapPoints,
  heatMapWeight
} from "./funcs";
import { homeStyleSheet } from "./styles";
import { db } from "../../firebase/config";
import { TouchableOpacity } from "react-native-gesture-handler";

// IMPORT FIREBASE FUNCS
import {getCapacity} from './fbFuncs'
import { Heatmap } from 'react-native-maps';
import { locations } from '../../data/heatmap'



export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // grabbing places info to pass down
      id: '',
      placeLat: null,
      placeLng: null,
      // state for homescreen
      initialRegion: null,
      // coordinates for getting a user's location
      coordinates: {
        latitude: null,
        longitude: null,
      },
      selectedName: '',
      modalVisible: false,
      modalData: null,
      modalDetails: null,
      ratings: {},
    };
    this.setData = this.setData.bind(this);
  }

  async componentDidMount() {
    const region = await getCurrentLocation();
    this.setState({
      initialRegion: region,
    });


    // const places = db.collection('places');
    // const rating = places
    //   .doc('ChIJrUj5NiQZBYgROOtRy0_Mnfg')
    //   .collection('capacity')
    //   .get()
    //   .then((snap) => {
    //     snap.forEach((doc) => {
    //       this.setState({ ratings: doc.data() });
    //       console.log('RATING', doc.data());
    //     });
    //   });

    // const place = await places.get();
    // const foundPlace = place.forEach((doc) => {
    //   console.log('FOUND PLACE', doc.id, '=>', doc.data());
    // });
  }

  closeModal(visible) {
    this.setState({ modalVisible: visible });
  }

  setData(data, details, visible) {
    this.setState({
      modalVisible: visible,
      modalData: data,
      modalDetails: details,
    });
    // console.log('SET DATA', this.state)
  }


  render() {
    const modalVisible = this.state.modalVisible;
    const locDescription = this.state.modalDetails || '';
    const locData = this.state.modalData || '';
    const hours = locDescription.opening_hours || '';
    const type = locData.types || '';
    const state = locData.terms || '';

    return (
      <SafeAreaView style={homeStyleSheet.safeArea}>
        <Modal
          animationType="slide"
          visible={modalVisible}
          onBackdropPress={() => this.closeModal(!modalVisible)}
        >
          <View style={homeStyleSheet.modalView}>
            <Text style={homeStyleSheet.modalName}>{locDescription.name}</Text>
            <Text style={homeStyleSheet.modalText}>
              {locDescription.rating} ({locDescription.user_ratings_total})
            </Text>
            <Text style={homeStyleSheet.modalType}>
              {' '}
              {getType(type)} {dollarSign(locDescription.price_level)}
            </Text>
            <Text
              style={{
                marginBottom: 5,
                fontSize: 15,
                color: getColor(hours),
              }}
            >
              {isOpen(hours)}
            </Text>
            <Text>CAPACITY FROM FIREBASE: {this.state.ratings.capacity}</Text>
            <TouchableHighlight
              style={{
                ...homeStyleSheet.openButton,
                backgroundColor: '#2196F3',
              }}
              onPress={() => {
                this.closeModal(!modalVisible);
              }}
            >
              <Text style={homeStyleSheet.textStyle}> X </Text>
            </TouchableHighlight>
            <Text>Capacity: 77%</Text>
            <Button
              title="Let's go!"
              onPress={() => {
                this.GooglePlacesAutocompleteRef.setAddressText(""); //clears the searchbar
                this.closeModal(!modalVisible);
                this.props.navigation.navigate("SinglePlace", {
                  // PASS PROPS TO SINGLE PLACE HEREEEEEEEE
                  name: this.state.selectedName,
                  id: this.state.id,
                  placeLat: this.state.placeLat,
                  placeLng: this.state.placeLng,
                });
              }}
            />
            <TouchableOpacity
              style={homeStyleSheet.button}
              onPress={() => getGuidelines(state)}
            >
              <Text style={homeStyleSheet.buttonText}>State Guidelines</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <MapView
          ref={(map) => (this.map = map)}
          style={homeStyleSheet.container}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          initialRegion={this.state.initialRegion}
         
        >
        <Heatmap 
          points = {locations}
          opacity = {1}
          radius = {100}
          maxIntensity = {100}
          
          />
          
          
          {this.state.coordinates.latitude && (
            <Marker
              coordinate={this.state.coordinates}
              onPress={() => {
                this.props.navigation.navigate('SinglePlace', {
                  name: this.state.selectedName,
                });
              }}
            />
          )}

          <GooglePlacesAutocomplete
            ref={(instance) => (this.GooglePlacesAutocompleteRef = instance)}
            style={homeStyleSheet.input}
            placeholder="search"
            minLength={2}
            fetchDetails={true}
            onPress={(data, details = null) => {

              // console.log("LOCDETAILS => " ,details)

              this.setData(data, details, true);
              this.setState({
                coordinates: {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                },
                selectedName: data.description,

                // SETTING STATES FOR PASSING DOWN PROPS HERE
                // getting the placeId so we can pass it to SinglePlace component
                id: details.place_id,
                placeLat: details.geometry.location.lat,
                placeLng: details.geometry.location.lng,
              });

              // console.log for state
              // console.log('STATE IN AUTO COMPLETE', this.state)

              this.map.animateCamera({
                center: {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                },
              });
              this.GooglePlacesAutocompleteRef.setAddressText(
                data.terms[0].value
              ); //shortensname in searchbar
            }}
            query={{
              key: 'AIzaSyCukq40uCr0mkfwu4JlZaO6yQ6P0K5D7Bc',
              language: 'en',
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={200}
          />
        </MapView>
      </SafeAreaView>
    );
  }
}

import React, { useRoute } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Alert,
  Button,
  TouchableHighlight,
  ScrollView,
  Animated,
} from "react-native";
import Modal from "react-native-modal";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { connect } from "react-redux";

// IMPORT FUNCS
import {
  getCurrentLocation,
  isOpen,
  getColor,
  getType,
  dollarSign,
  getGuidelines,
  isDarkMode,
} from "../funcs/homeFuncs";
import { homeStyleSheet } from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";

// IMPORT FIREBASE FUNCS
import { getAllCaps, getCapacity } from "../funcs/placesFuncs";
import HeatLayer from "./HeatLayer";
import FavesLayer from "./FavesLayer";
import { mapStyle } from "./map";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // grabbing places info to pass down
      id: "",
      placeLat: null,
      placeLng: null,
      // state for homescreen
      initialRegion: null,
      // coordinates for getting a user's location
      coordinates: {
        latitude: null,
        longitude: null,
      },
      selectedName: "",
      modalVisible: false,
      modalData: null,
      modalDetails: null,
      ratings: {},
      capacity: null,
      capacityNum: null,
      marker: null,
    };
    this.setData = this.setData.bind(this);
    this.getSingleCap = this.getSingleCap.bind(this);
  }

  async componentDidMount() {
    const region = await getCurrentLocation();
    this.setState({
      initialRegion: region,
    });
    getAllCaps();
  }

  async getSingleCap(name) {
    const cap = await getCapacity(name);
    this.setState({
      capacity: `${cap}% Capacity`,
      capacityNum: Number(cap),
    });
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
  }

  isDarkMode() {
    const color = this.props.route.params;
    if (color.text === 'rgb(229, 229, 231)') {
      return mapStyle;
    }
  }

  render() {
    const modalVisible = this.state.modalVisible;
    const locDescription = this.state.modalDetails || '';
    const locData = this.state.modalData || '';
    const hours = locDescription.opening_hours || '';
    const type = locData.types || '';
    const state = locData.terms || '';
    const cap = this.state.capacity || '';
    const colors = this.props.route.params;

    return (
      <SafeAreaView
        style={[
          homeStyleSheet.safeArea,
          { backgroundColor: colors.background },
        ]}
      >
        <Modal
          animationType="slide"
          visible={modalVisible}
          onBackdropPress={() => this.closeModal(!modalVisible)}
        >
          <View
            style={[
              homeStyleSheet.modalView,
              { color: colors.text, backgroundColor: colors.background },
            ]}
          >
            {/* Container for Place Name and X */}
            <View style={{ justifyContent: 'space-between' }}>
              <Text style={[homeStyleSheet.modalName, { color: colors.text }]}>
                {this.state.selectedName}
              </Text>

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
            </View>

            {/* Modal Rating */}
            <Text style={[homeStyleSheet.modalText, { color: colors.text }]}>
              {locDescription.rating} ({locDescription.user_ratings_total})
            </Text>

            {/* Modal Rating */}
            <Text style={[homeStyleSheet.modalType, { color: colors.text }]}>
              {' '}
              {getType(type)} {dollarSign(locDescription.price_level)}
            </Text>

            {/* Modal is Open */}
            <Text
              style={{
                marginBottom: 5,
                fontSize: 15,
                color: getColor(hours),
              }}
            >
              {isOpen(hours)}
            </Text>

            {/* Modal Capacity */}
            <Text style={{ color: colors.text }}>{cap}</Text>

            {/* Modal Buttons for User Feedback */}

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}
            >
              <TouchableOpacity
                style={homeStyleSheet.buttonSideBySide}
                //title="I'm thinking of going"
                onPress={() => {
                  this.GooglePlacesAutocompleteRef.setAddressText(''); //clears the searchbar
                  this.closeModal(!modalVisible);
                  this.props.navigation.navigate('SinglePlace', {
                    // PASS PROPS TO SINGLE PLACE HERE
                    name: this.state.selectedName,
                    id: this.state.id,
                    placeLat: this.state.placeLat,
                    placeLng: this.state.placeLng,
                    isHere: true,
                    capacity: cap,
                    color: colors,
                    capacityNum: this.state.capacityNum,
                  });
                }}
              >
                <Text style={homeStyleSheet.buttonText}>I'm here now</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={homeStyleSheet.buttonSideBySide}
                onPress={() => {
                  this.GooglePlacesAutocompleteRef.setAddressText(''); //clears the searchbar
                  this.closeModal(!modalVisible);
                  this.props.navigation.navigate('SinglePlace', {
                    // PASS PROPS TO SINGLE PLACE HERE
                    name: this.state.selectedName,
                    id: this.state.id,
                    placeLat: this.state.placeLat,
                    placeLng: this.state.placeLng,
                    isHere: false,
                    capacity: cap,
                    color: colors,
                    capacityNum: this.state.capacityNum,
                  });
                }}
              >
                <Text style={homeStyleSheet.buttonText}>
                  I'm thinking of going
                </Text>
              </TouchableOpacity>
            </View>

            {/* State Guidelines Button */}
            <TouchableOpacity
              style={homeStyleSheet.button}
              onPress={() => getGuidelines(state)}
            >
              <Text style={homeStyleSheet.buttonText}>State Guidelines</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* MAP */}
        <MapView
          ref={(map) => (this.map = map)}
          style={homeStyleSheet.container}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          initialRegion={this.state.initialRegion}
          customMapStyle={this.isDarkMode(colors)}
          /* CLICKING ON POI */
          onPoiClick={(evt) =>{
            console.log('ON POI CLICK', evt.nativeEvent)
            this.setState({ 
              // creates a marker at the POI
              marker: evt.nativeEvent.coordinate,

              // // SETTING STATE FOR MODAL
              selectedName: evt.nativeEvent.name,
              id: evt.nativeEvent.placeId,

              // SETTING STATE TO SEND TO THE DB
              name: evt.nativeEvent.name,
              placeLat: evt.nativeEvent.coordinate.latitude,
              placeLng: evt.nativeEvent.coordinate.longitude,

              // // DOES THIS FUNCTION JUST TAKE THE PLACE NAME, OR DOES IT NEED THE ID?
              capacity: this.getSingleCap(evt.nativeEvent.name),
            })
          }}
        >

          {/* POI MARKER */}
          {this.state.marker && (
            <Marker 
              coordinate={this.state.marker}
              onPress={(evt) => {
                const name = this.state.selectedName || ''
                const capacity = this.state.capacity || ''
                const id = this.state.id || ''
                this.setData(null, {name, id}, true);
              }}
            />
          )}

          {/* Added Map Layers */}
          <HeatLayer />
          <FavesLayer />

          {/* Search Bar/ AutoComplete */}
          <GooglePlacesAutocomplete
            ref={(instance) => (this.GooglePlacesAutocompleteRef = instance)}
            style={homeStyleSheet.input}
            styles={{
              textInputContainer: {
                color: colors.text,
              },
              row: {
                backgroundColor: colors.text,
              },
              poweredContainer: {
                backgroundColor: colors.text,
              },
            }}
            placeholder="search"
            minLength={2}
            fetchDetails={true}
            onPress={(data, details = null) => {
              this.getSingleCap(data.description);
              this.setData(data, details, true);
              this.setState({
                coordinates: {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                },
                selectedName: data.description,

                // SETTING STATES FOR PASSING DOWN PROPS HERE
                id: details.place_id,
                placeLat: details.geometry.location.lat,
                placeLng: details.geometry.location.lng,
              });
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

const mapState = (state) => ({
  user: state.user,
});

export default connect(mapState)(HomeScreen);

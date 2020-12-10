import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Alert,
  Button,
  TouchableHighlight,
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

// import { MAP_KEY } from '@env'

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
    };
    this.setData = this.setData.bind(this);
    this.getSingleCap = this.getSingleCap.bind(this);
    this.isDarkMode = this.isDarkMode.bind(this);
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
    // console.log('SET DATA', this.state)
  }

  isDarkMode() {
    if (this.props.route.params.color.text === "rgb(229, 229, 231)") {
      return mapStyle;
    }
  }

  render() {
    const modalVisible = this.state.modalVisible;
    const locDescription = this.state.modalDetails || "";
    const locData = this.state.modalData || "";
    const hours = locDescription.opening_hours || "";
    const type = locData.types || "";
    const state = locData.terms || "";
    const cap = this.state.capacity || "";
    const colors = this.props.route.params.color;

    return (
      <SafeAreaView style={homeStyleSheet.safeArea}>
        <Modal
          animationType="slide"
          visible={modalVisible}
          onBackdropPress={() => this.closeModal(!modalVisible)}
        >
          <View
            style={[
              homeStyleSheet.modalView,
              { backgroundColor: colors.background },
            ]}
          >
            <Text style={[homeStyleSheet.modalName, { color: colors.text }]}>
              {[locDescription.name]}
            </Text>
            <Text style={[homeStyleSheet.modalText, { color: colors.text }]}>
              {locDescription.rating} ({locDescription.user_ratings_total})
            </Text>
            <Text style={[homeStyleSheet.modalType, { color: colors.text }]}>
              {" "}
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
            <TouchableHighlight
              style={{
                ...homeStyleSheet.openButton,
                backgroundColor: "#2196F3",
              }}
              onPress={() => {
                this.closeModal(!modalVisible);
              }}
            >
              <Text style={homeStyleSheet.textStyle}> X </Text>
            </TouchableHighlight>
            <Text style={{ color: colors.text }}>{cap}</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity
                style={homeStyleSheet.buttonSideBySide}
                //title="I'm thinking of going"
                onPress={() => {
                  this.GooglePlacesAutocompleteRef.setAddressText(""); //clears the searchbar
                  this.closeModal(!modalVisible);
                  this.props.navigation.navigate("SinglePlace", {
                    // PASS PROPS TO SINGLE PLACE HERE
                    name: this.state.selectedName,
                    id: this.state.id,
                    placeLat: this.state.placeLat,
                    placeLng: this.state.placeLng,
                    isHere: true,
                    capacity: cap,
                    color: colors,
                  });
                }}
              >
                <Text style={homeStyleSheet.buttonText}>I'm here now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={homeStyleSheet.buttonSideBySide}
                //title="I'm thinking of going"
                onPress={() => {
                  this.GooglePlacesAutocompleteRef.setAddressText(""); //clears the searchbar
                  this.closeModal(!modalVisible);
                  this.props.navigation.navigate("SinglePlace", {
                    // PASS PROPS TO SINGLE PLACE HERE
                    name: this.state.selectedName,
                    id: this.state.id,
                    placeLat: this.state.placeLat,
                    placeLng: this.state.placeLng,
                    isHere: false,
                    color: colors,
                  });
                }}
              >
                <Text style={homeStyleSheet.buttonText}>
                  I'm thinking of going
                </Text>
              </TouchableOpacity>
            </View>

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
          customMapStyle={this.isDarkMode(colors)}
        >
          <HeatLayer />
          <FavesLayer />

          <GooglePlacesAutocomplete
            ref={(instance) => (this.GooglePlacesAutocompleteRef = instance)}
            style={homeStyleSheet.input}
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
              key: "AIzaSyCukq40uCr0mkfwu4JlZaO6yQ6P0K5D7Bc",
              language: "en",
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

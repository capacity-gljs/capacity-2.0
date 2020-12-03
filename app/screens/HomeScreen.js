import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Modal,
  Alert,
  Button,
  TouchableHighlight,
  Image,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
  getCurrentLocation,
  isOpen,
  getColor,
  getType,
  dollarSign,
  getGuidelines
} from "./funcs";
import { homeStyleSheet } from "./styles";
import { db } from "../../firebase/config";
import { TouchableOpacity } from "react-native-gesture-handler";


export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      initialRegion: null,
      coordinates: {
        latitude: null,
        longitude: null,
      },
      selectedName: "",
      modalVisible: false,
      modalData: null,
      modalDetails: null,
    };
    this.setData = this.setData.bind(this);
  }

  async componentDidMount() {
    const region = await getCurrentLocation();
    this.setState({
      initialRegion: region,
    });
    const places = db.collection("places");
    const place = places
      .doc("ChIJrUj5NiQZBYgROOtRy0_Mnfg")
      .collection("capacity")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          // console.log(doc.data());
        });
      });

    //const place = await places.get()
    //const foundPlace = place.forEach(doc => {
    //doc.id, '=>', doc.data()
    //})
    //console.log(foundPlace)
  }

  setModal(visible) {
    this.setState({ modalVisible: visible });
  }

  setData(data, details, visible) {
    this.setState({
      modalVisible: visible,
      modalData: data,
      modalDetails: details,
    });
  }

  render() {
    const modalVisible = this.state.modalVisible;
    const locDescription = this.state.modalDetails || "";
    const locData = this.state.modalData || "";
    const hours = locDescription.opening_hours || "";
    const type = locData.types || "";
    const state = locData.terms || ''

    return (
      <SafeAreaView style={homeStyleSheet.safeArea}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={homeStyleSheet.modalView}>
            <Text style={homeStyleSheet.modalName}>{locDescription.name}</Text>
            <Text style={homeStyleSheet.modalText}>
              {locDescription.rating} ({locDescription.user_ratings_total})
            </Text>
            <Text style={homeStyleSheet.modalType}>
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
                this.setModal(!modalVisible);
              }}
            >
              <Text style={homeStyleSheet.textStyle}> X </Text>
            </TouchableHighlight>
            <Text>Capacity: 77%</Text>
            <Button
              title="Let's go!"
              onPress={() => {
                //this.GooglePlacesAutocompleteRef.setAddressText(""); //clears the search bar
                this.setModal(!modalVisible);
                this.props.navigation.navigate("SinglePlace", {
                  name: this.state.selectedName,
                });
              }}
            />
           <TouchableOpacity 
            style = {homeStyleSheet.button}
            onPress = {() => getGuidelines(state)}
            >
              <Text style = {homeStyleSheet.buttonText}>State Guidelines</Text> 
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
          {this.state.coordinates.latitude && (
            <Marker
              coordinate={this.state.coordinates}
              onPress={() => {
                this.props.navigation.navigate("SinglePlace", {
                  name: this.state.selectedName,
                });
              }}
            />
          )}
          <GooglePlacesAutocomplete
            style={homeStyleSheet.input}
            placeholder="search"
            minLength={2}
            fetchDetails={true}
            onPress={(data, details = null) => {
              this.setData(data, details, true);
              this.setState({
                coordinates: {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                },
                selectedName: data.description,
              });
              this.map.animateCamera({
                center: {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                },
              });
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

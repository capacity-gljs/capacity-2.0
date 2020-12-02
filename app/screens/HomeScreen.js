import React from "react";
import {
  StyleSheet,
  Text,
  Button,
  View,
  SafeAreaView,
  Modal,
  Alert,
  TouchableHighlight,
  Image,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {db} from '../../firebase/config'

function getCurrentLocation() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition((position) => {
      let region = {
        latitude: parseFloat(position.coords.latitude),
        longitude: parseFloat(position.coords.longitude),
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      };
      resolve(region);
    }, reject);
  });
}

function isOpen(hours) {
  if (hours["open_now"] === true) {
    return "Open";
  }
  return "Closed";
}

function getColor(hours) {
  if (hours["open_now"] === true) {
    return "green";
  }
  return "red";
}

function getType(types) {
  let type = [];

  for (let i = 0; i < types.length; i++) {
    type.push(types[i].split("_").join(" "));
  }
  return type[0];
}

function dollarSign(num) {
  if (num === 1) {
    return "$";
  } else if (num === 2) {
    return "$$";
  } else if (num === 3) {
    return "$$$";
  } else if (num === 4) {
    return "$$$$";
  }
}

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
    const places = db.collection('places')
    const place = places.doc('ChIJrUj5NiQZBYgROOtRy0_Mnfg').collection('capacity').get().then(snap => {    snap.forEach(doc => {        console.log(doc.data());    }); })

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

    

    return (
      <SafeAreaView style={styles.safeArea}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalView}>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                this.setModal(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}> X </Text>
            </TouchableHighlight>
            <Text style={styles.modalName}>{locDescription.name}</Text>
            <Text style={styles.modalText}>
              {locDescription.rating} ({locDescription.user_ratings_total})
            </Text>
            <Text style={styles.modalType}>
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
            <Text>Capacity: 77%</Text>
            <Button
              title="Let's go!"
              onPress={() => {
                this.GooglePlacesAutocompleteRef.setAddressText("")  //clears the search bar 
                this.setModal(!modalVisible); 
                this.props.navigation.navigate("SinglePlace", {
                  name: this.state.selectedName,
                });
              }}
            />
          </View>
        </Modal>

        <MapView
          ref={(map) => (this.map = map)}
          style={styles.container}
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
            ref={(instance) => (this.GooglePlacesAutocompleteRef = instance)}
            style={styles.input}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "grey",
  },
  input: {
    borderRadius: 4,
    margin: 5,
  },
  modalView: {
    flex: 0,
    width: 400,
    height: 350,
    alignSelf: "center",
    position: "absolute",
    bottom: 12,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    alignSelf: "flex-end",
    width: 22,
    height: 22,
    borderRadius: 50,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 3,
    marginTop: 2,
  },
  modalText: {
    marginBottom: 5,
    fontSize: 15,
  },
  modalName: {
    marginBottom: 10,
    fontSize: 30,
  },
  modalType: {
    marginLeft: -4,
    marginBottom: 5,
    fontSize: 15,
  },
});
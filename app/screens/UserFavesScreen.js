import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { connect } from "react-redux";
import { userFave } from "./styles";
import { homeStyleSheet } from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
//import { useNavigation } from "@react-navigation/native";

// importing fbFuncs
import { getOrAddPlace, addCapacity } from "../funcs/placesFuncs";

import { addFave, updateFave, removeFave, getFave } from "../funcs/userFuncs";
import CapacityCircle from "./CapacityCircle";

class UserFavesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const favorited = await getFave(this.props.user.uid);
    //console.log("THESE ARE THE USERS FAVORITE PLACES:", favorited);
    this.setState({ favorites: favorited });
  }

  async componentDidUpdate() {
    // const favorited = await getFave(this.props.user.uid);
    // //console.log("THESE ARE THE USERS FAVORITE PLACES:", favorited);
    // this.setState({ favorites: favorited });
  }

  handleChange(capacityPercent) {}

  // grab capacity and write to the db
  async handleSubmit(evt) {}

  render() {
    const userFavorites = this.state.favorites || [];
    let counter = 0;
    console.log("THESE ARE THE USERS FAVORITE PLACES:", userFavorites);
    console.log("THESE ARE THE USERS FAVORITE PLACES:", userFavorites);
    if (this.props.user.uid && userFavorites.length) {
      return (
        <SafeAreaView style={userFave.safeArea}>
          <ScrollView>
            <View>
              <Text style={userFave.subtitle}>
                These are Your Favorite Locations
              </Text>
            </View>

            {userFavorites.map((place) => {
              return (
                <View key={counter++} style={userFave.place}>
                  <Text style={userFave.text}>{Object.keys(place)}</Text>
                  <View style={userFave.capacityCircle}>
                    {CapacityCircle(
                      Math.floor(Number(Object.values(place)[0]))
                    )}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={userFave.safeArea}>
          <Text style={userFave.subtitle}>Login to see your favorites</Text>
        </SafeAreaView>
      );
    }
  }
}

const mapState = (state) => ({
  user: state.user,
});

export default connect(mapState)(UserFavesScreen);

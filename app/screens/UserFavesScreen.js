import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
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
import { singlePlace } from "./styles";
import { homeStyleSheet } from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
//import { useNavigation } from "@react-navigation/native";

// importing fbFuncs
import { getOrAddPlace, addCapacity } from "../funcs/placesFuncs";

import { addFave, updateFave, removeFave, getFave } from "../funcs/userFuncs";

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

  handleChange(capacityPercent) {}

  // grab capacity and write to the db
  async handleSubmit(evt) {}

  render() {
    const userFavorites = this.state.favorites || [];
    console.log("THESE ARE THE USERS FAVORITE PLACES:", userFavorites);
    console.log("THESE ARE THE USERS FAVORITE PLACES:", userFavorites);
    if (this.props.user.uid && userFavorites.length) {
      return (
        <SafeAreaView style={singlePlace.safeArea}>
          <View>
            <Text style={singlePlace.subtitle}>
              These are your favorite locations {userFavorites.length}
            </Text>
          </View>

          {userFavorites.map((place) => {
            return (
              <View key={id}>
                <Text>
                  {Object.keys(place)} : {Object.values(place)}
                </Text>
                {/* <Text>{Object.values(place)}</Text> */}
              </View>
            );
          })}
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={singlePlace.safeArea}>
          <Text style={singlePlace.subtitle}>Login to see your favorites</Text>
        </SafeAreaView>
      );
    }
  }
}

const mapState = (state) => ({
  user: state.user,
});

export default connect(mapState)(UserFavesScreen);

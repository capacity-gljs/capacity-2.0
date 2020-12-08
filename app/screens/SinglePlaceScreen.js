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
import {
  getOrAddPlace,
  addCapacity,
} from "../funcs/placesFuncs";

import { 
  addFave,
  updateFave,
  removeFave,
  getFave,
} from '../funcs/userFuncs';

class SinglePlaceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      capacityPercent: 0,
      capacities: [
        { label: "Empty", value: 0 },
        { label: "A Few People", value: 25 },
        { label: "Half Full", value: 50 },
        { label: "Full", value: 75 },
        { label: "Crowded", value: 100 },
      ],
      initialRadioPos: -1,
      formLabel: 0,
      favorited: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const favorited = await updateFave(
      this.props.user.uid,
      this.props.route.params.id
    );
    this.setState({ favorited });
  }

  handleChange(capacityPercent) {
    this.setState({ capacityPercent });
  }

  // grab capacity and write to the db
  async handleSubmit(evt) {
    await getOrAddPlace(
      this.props.route.params.id,
      this.props.route.params.placeLat,
      this.props.route.params.placeLng,
      this.props.route.params.name
    );
    alert("Thanks for rating!");
    console.log("place created");
    addCapacity(this.props.route.params.id, this.state.capacityPercent);
  }

  render() {
    // console.log('PROPS IN SINGLE COMP', this.props); // FIND THE PLACE ID
    // console.log('STATE IN SINGLE COMP', this.state); // FIND THE PLACE ID

    return (
      <SafeAreaView style={singlePlace.safeArea}>
        <View>
          <Ionicons
            style={singlePlace.starIcon}
            name={this.state.favorited ? "ios-star" : "ios-star-outline"}
            size={32}
            onPress={() => {
              if (this.props.user.email) {
                if (this.state.favorited) {
                  removeFave(this.props.user.uid, this.props.route.params.id);
                } else {
                  addFave(
                    this.props.user.uid,
                    this.props.route.params.id,
                    this.props.route.params.name,
                    this.props.route.params.placeLat,
                    this.props.route.params.placeLng
                  );
                  //getFave(this.props.user.uid);
                }
                this.setState({ favorited: !this.state.favorited });
              } else {
                alert("create account to favorite");
                this.props.navigation.navigate("SignUp");
              }
            }}
          />
          <Text style={singlePlace.title}>{this.props.route.params.name}</Text>
          <Text style={singlePlace.subtitle}>
            This location is at {this.state.capacityPercent}% capacity
          </Text>
        </View>
        <View>
          <Text>
            {Array(this.state.capacityPercent)
              .fill()
              .map((_, index) => (
                <React.Fragment key={index}>
                  <Ionicons
                    key={index}
                    style={singlePlace.icon}
                    name="md-person"
                    size={32}
                    color="black"
                  />
                  {"  "}
                </React.Fragment>
              ))}
            {Array(100 - this.state.capacityPercent)
              .fill()
              .map((_, index) => (
                <React.Fragment key={index}>
                  <Ionicons
                    key={index}
                    style={singlePlace.icon}
                    name="md-person"
                    size={32}
                    color="grey"
                  />
                  {"  "}
                </React.Fragment>
              ))}
          </Text>
        </View>
        <Button
          title="Leave Feedback"
          onPress={() => this.props.navigation.navigate("UserFeedback", {placeId: this.props.route.params.id})}
        />
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={homeStyleSheet.button}
            onPress={() => this.props.navigation.navigate("Camera")} //open the camera component
          >
            <Text style={homeStyleSheet.buttonText}>Take a Live Photo</Text>
          </TouchableOpacity>
        </View>

        {this.props.route.params.isHere && (
          <View style={{ alignItems: "center" }}>
            <Text style={singlePlace.subtitle}>How Crowded Was It?</Text>
            <RadioForm
              key={this.state.formLabel}
              radio_props={this.state.capacities}
              initial={this.state.initialRadioPos}
              onPress={this.handleChange}
              formHorizontal={true}
              labelHorizontal={false}
              style={{ textAlign: "center" }}
            />
            <Button title="Submit" onPress={this.handleSubmit} />
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
});

export default connect(mapState)(SinglePlaceScreen);

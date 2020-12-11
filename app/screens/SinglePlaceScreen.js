import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { singlePlace, homeStyleSheet, screenWidth } from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import Slider from "@react-native-community/slider";
import { getOrAddPlace, addCapacity } from "../funcs/placesFuncs";
import { addFave, updateFave, removeFave, getFave } from "../funcs/userFuncs";

class SinglePlaceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      capacityRating: 0,
      formLabel: 0,
      favorited: false,
    };

    this.state = {
      capacityNum: Math.floor(this.props.route.params.capacityNum)
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const favorited = await updateFave(
      this.props.user.uid,
      this.props.route.params.id
    );
    this.setState({ favorited });
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
    addCapacity(this.props.route.params.id, this.state.capacityRating);
  }

  render() {
    const colors = this.props.route.params.color;   

    if (Number.isNaN(this.state.capacityNum)) this.state.capacityNum = 0
  
    let capacityMessage = "";

    if (this.state.capacityRating === -1) capacityMessage = "";
    else if (this.state.capacityRating < 25) capacityMessage = "Empty";
    else if (this.state.capacityRating < 50) capacityMessage = "A Few People";
    else if (this.state.capacityRating < 75) capacityMessage = "Half Full";
    else if (this.state.capacityRating < 100) capacityMessage = "Crowded";
    else if (this.state.capacityRating === 100) capacityMessage = "Super Crowded";

    return (
      <SafeAreaView style={singlePlace.safeArea}>
        <ScrollView>
          <View>
            <Ionicons
              style={[singlePlace.starIcon, { color: colors.text }]}
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
                    getFave(this.props.user.uid);
                  }
                  this.setState({ favorited: !this.state.favorited });
                } else {
                  alert("create account to favorite");
                  this.props.navigation.navigate("SignUp");
                }
              }}
            />
            <Text style={[singlePlace.title, { color: colors.text }]}>
              {this.props.route.params.name}
            </Text>
            <Text style={[singlePlace.subtitle, { color: colors.text }]}>
              This location is at {this.props.route.params.capacity}
            </Text>
          </View>
          <View>
            <Text>
              {Array(this.state.capacityNum)
                .fill()
                .map((_, index) => (
                  <React.Fragment key={index}>
                    <Ionicons
                      key={index}
                      style={(singlePlace.icon, { color: colors.text })}
                      name="md-person"
                      size={32}
                      color="black"
                    />
                    {"  "}
                  </React.Fragment>
                ))}
              {Array(100 - this.state.capacityNum)
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
            onPress={() =>
              this.props.navigation.navigate("UserFeedback", {
                placeId: this.props.route.params.id,
                color: colors,
              })
            }
          />

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={homeStyleSheet.button}
              onPress={() => this.props.navigation.navigate("Camera")} //open the camera component
            >
              <Text style={[homeStyleSheet.buttonText, { color: colors.text }]}>
                Take a Live Photo
              </Text>
            </TouchableOpacity>
          </View>

          {this.props.route.params.isHere && (
            <View style={[{ alignItems: "center", color: colors.text }]}>
              <Text style={[singlePlace.subtitle, { color: colors.text }]}>
                How Crowded Was It?
              </Text>
              <Text style={{ color: colors.text }}>{capacityMessage}</Text>
              <Slider

                style={{ width: "50%", height: 40}}

                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(val) => {
                  this.setState({ capacityRating: val, capacityNum: val });
                }}
                step={25}
              />
           
              <Button title="Submit" onPress={this.handleSubmit} />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
});

export default connect(mapState)(SinglePlaceScreen);

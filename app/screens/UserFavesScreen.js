import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import { connect } from "react-redux";
import { userFave } from "./styles";

import { getFave } from "../funcs/userFuncs";
//import CapacityCircle from "./CapacityCircle";

class UserFavesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      favorites: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.refreshControl = this.refreshControl.bind(this);
    this.refreshScrollView = this.refreshScrollView.bind(this);
  }

  async componentDidMount() {
    const favorited = await getFave(this.props.user.uid);
    this.setState({ favorites: favorited });
  }

  handleChange(capacityPercent) {}

  // grab capacity and write to the db
  async handleSubmit(evt) {}

  refreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={() => this.refreshScrollView()}
      />
    );
  }

  async refreshScrollView() {
    //Start Rendering Spinner
    this.setState({ refreshing: true });
    const favorited = await getFave(this.props.user.uid);
    this.setState({ favorites: favorited });
    //Updating the dataSource with new data
    this.setState({ refreshing: false }); //Stop Rendering Spinner
  }

  render() {
    const colors = this.props.route.params;
    const userFavorites = this.state.favorites || [];
    let counter = 0;

    if (this.props.user.uid && userFavorites.length) {
      return (
        <SafeAreaView style={userFave.safeArea}>
          <ScrollView refreshControl={this.refreshControl()}>
            <View>
              <Text style={[userFave.subtitle]}>Your Places</Text>
            </View>

            {userFavorites.map((place) => {
              return (
                <View key={counter++} style={userFave.place}>
                  <Text style={[userFave.text, { color: colors.text }]}>
                    {Object.keys(place)}
                  </Text>
                  {/* <View style={[userFave.capacityCircle]}>
                    {CapacityCircle(
                      Math.floor(Number(Object.values(place)[0]))
                    )}
                  </View> */}
                  <View style={[userFave.capacityCircle]}>
                    {Math.floor(Number(Object.values(place)[0])) ? (
                      <Text style={userFave.capacityCircle}>
                        {Math.floor(Number(Object.values(place)[0]))} %
                      </Text>
                    ) : (
                      <Text style={userFave.capacityCircleNo}>
                        No Capacity Info
                      </Text>
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
          <Text style={userFave.subtitle}>Please Login</Text>
        </SafeAreaView>
      );
    }
  }
}

const mapState = (state) => ({
  user: state.user,
});

export default connect(mapState)(UserFavesScreen);

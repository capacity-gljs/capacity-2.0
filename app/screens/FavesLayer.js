import React from "react";
import { Marker } from "react-native-maps";
import { getFave } from "../funcs/userFuncs";
import { View } from "react-native";
import { connect } from "react-redux";

class FavesLayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favePlaces: null,
    };
  }

  async componentDidMount() {
    const locations = await getFave(this.props.user.uid);
    this.setState({
      favePlaces: locations,
    });
  }

  render() {
    //console.log("THE PROPS: ", this.props.user.uid);
    const favorites = this.state.favePlaces;
    console.log("THIS Is THE FAVORITES INFORMATION: ", favorites);
    return (
      <>
        {/* {favorites.map((place) => {
          const placePosition = [
            place.coordinates.latitude,
            place.coordinates.longitude,
          ];
          return <Marker coordinate={placePosition} />;
        })} */}
      </>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
});

export default connect(mapState)(FavesLayer);

import React from "react";
import { getFave } from "../funcs/userFuncs";
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
    const favorites = this.state.favePlaces;
    return (
      <>
      </>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
});

export default connect(mapState)(FavesLayer);

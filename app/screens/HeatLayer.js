import React from "react";
import { Heatmap } from "react-native-maps";
import { getHeat } from "./fbFuncs";

export default class HeatLayer extends React.Component {
  constructor() {
    super();
    this.state = {
      places: null,
    };
  }

  async componentDidMount() {
    const locations = await getHeat();
    this.setState({
      places: locations,
    });
  }

  render() {
    return (
      <Heatmap
        points={this.state.places}
        opacity={1}
        radius={100}
        maxIntensity={100}
      />
    );
  }
}

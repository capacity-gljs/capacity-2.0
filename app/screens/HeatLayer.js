import React from 'react';
import { Heatmap } from 'react-native-maps';
import { getHeat } from '../funcs/placesFuncs';

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
        gradient={{colors: ["#EC3254", "#F58FA2"], startPoints: [0.1, 0.25], colorMapSize: 256}}
        radius={100}
        maxIntensity={100}
      />
    );
  }
}

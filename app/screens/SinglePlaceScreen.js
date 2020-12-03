import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import { singlePlace } from './styles';
import { render } from 'react-dom';
import { addCapacity } from './fbFuncs';
import App from '../../App'

// need onPress to call change to db
// will need to reafctor into a handleSubmit method
class SinglePlaceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      capacityPercent: 0,
      capacities: [
        { label: 'Empty', value: 0 },
        { label: 'A Few People', value: 25 },
        { label: 'Half Full', value: 50 },
        { label: 'Full', value: 75 },
        { label: 'Crowded', value: 100 },
      ],
      initialRadioPos: -1,
      formLabel: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(capacityPercent) {
    this.setState({ capacityPercent });
    console.log('PROPS IN SINGLE COMP', this.props.id) // FIND THE PLACE ID
    // this.props.onPlaceSelection(this.state)
  }

  // grab capacity and write to the db
  handleSubmit() {
    // console.log('HANDLE SUBMIT', evt); // NEED TO FIND EVENT CAPACITY
    // this.setState({capacityPercent})
  }

  render() {
    // console.log('PROPS ROUTE', this.props.route) // THIS GETS THE NAME
    // console.log('PLACE PARAMS', this.props.route.params) // THIS GETS THE NAME
    console.log('PROPS IN SINGLE COMP', this.props) // FIND THE PLACE ID
    console.log('STATE IN SINGLE COMP', this.state) // FIND THE PLACE ID

    return (
      <SafeAreaView style={singlePlace.safeArea}>
        <View>
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
                  {'  '}
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
                  {'  '}
                </React.Fragment>
              ))}
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={singlePlace.subtitle}>How Crowded Was It?</Text>
          <RadioForm
            key={this.state.formLabel}
            radio_props={this.state.capacities}
            initial={this.state.initialRadioPos}
            onPress={this.handleChange}
            formHorizontal={true}
            labelHorizontal={false}
            style={{ textAlign: 'center' }}
          />
          <Button title="Submit" onPress={this.handleSubmit} />
        </View>
      </SafeAreaView>
    );
  }
}

export default SinglePlaceScreen;

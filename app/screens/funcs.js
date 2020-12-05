import { guidelines } from '../../data/guidelines';
import { locations } from '../../data/heatmap';
import * as Linking from 'expo-linking';
import { Alert } from 'react-native';

//grabs users current location
export function getCurrentLocation() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition((position) => {
      let region = {
        latitude: parseFloat(position.coords.latitude),
        longitude: parseFloat(position.coords.longitude),
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      };
      resolve(region);
    }, reject);
  });
}
//Gets whether a location is open || closed
export const isOpen = (hours) => {
  return hours['open_now'] ? 'Open' : 'Closed';
};

//Sets color of text whether location is open || closed
export const getColor = (hours) => {
  return hours['open_now'] ? 'green' : 'red';
};

//Gets the type of establishment(restaurant, grocer etc.)
export const getType = (types) => {
  let type = [];

  for (let i = 0; i < types.length; i++) {
    type.push(types[i].split('_').join(' '));
  }
  return type[0];
};

//Sets dollar sign amount as to how expensive establishment is
export const dollarSign = (num) => {
  return num == 1
    ? '$'
    : num == 2
    ? '$$'
    : num == 3
    ? '$$$'
    : num == 4
    ? '$$$$'
    : '';
};

export const getGuidelines = (state) => {
  if (state) {
    let currentState = state[3].value; //gets short state abbrev. from googlePlaces API
    for (let i = 0; i < guidelines.length; i++) {
      if (guidelines[i].state == currentState) {
        return Linking.openURL(guidelines[i].link);
      } else if (guidelines[i].state == state[2].value) {
        return Linking.openURL(guidelines[i].link);
      }
    }
    Alert.alert('Site not found');
  }
}


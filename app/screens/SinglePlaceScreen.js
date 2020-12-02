import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { singlePlace } from './styles';

function SinglePlaceScreen(props) {
  let capacityPercent = 77;
  return (
    <SafeAreaView style={singlePlace.safeArea}>
      <View>
        <Text style={singlePlace.title}>{props.route.params.name}</Text>
        <Text style={singlePlace.subtitle}>
          This location is at {capacityPercent}% capacity
        </Text>
      </View>
      <View>
        <Text>
          {Array(capacityPercent)
            .fill()
            .map((_, index) => (
              <Ionicons
                key={index}
                style={singlePlace.icon}
                name="md-person"
                size={32}
                color="black"
              />
            ))}
        </Text>
      </View>
      <View>
        <Text style={singlePlace.subtitle}>Are you here now?  Leave a review!</Text>
        <Button title="OK" style={singlePlace.button} />
      </View>
    </SafeAreaView>
  );
}


export default SinglePlaceScreen;

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

function SinglePlaceScreen(props) {
  let capacityPercent = 77;
  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Text style={styles.title}>{props.route.params.name}</Text>
        <Text style={styles.subtitle}>
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
                style={styles.icon}
                name="md-person"
                size={32}
                color="black"
              />
            ))}
        </Text>
      </View>
      <View>
        <Text style={styles.subtitle}>Are you here now? Leave a review!</Text>
        <Button title="OK" style={styles.button} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 50,
    marginTop: 35,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    marginBottom: 20
  },
  subtitle: {
    textAlign: "center",
    fontSize: 20,
  },
  button: {
    margin: 20,
  },
  icon: {
    textAlign: "center",
  },
});

export default SinglePlaceScreen;

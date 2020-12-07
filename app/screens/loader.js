import React from "react";
import { Text, View, Button } from "react-native";
import { WaveIndicator } from "react-native-indicators";
import { FadeInView } from "./fader";

export default class Loader extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <WaveIndicator
          style={{ position: "absolute" }}
          size={400}
          color={"#788eec"}
          animationDuration={4000}
          waveFactor={0.6}
        />
        <Button
          title="Get Started"
          style={{
            alignSelf: "flexend",
          }}
          onPress={() => {
            this.props.navigation.navigate("Home");
          }}
        />

        <View style={{ margin: -250 }}>
          <FadeInView>
            <Text
              style={{
                fontSize: 70,
                textAlign: "center",
                margin: 10,
                alignSelf: "center",
                marginTop: -70,
                position: "absolute",
              }}
            >
              Capacity
            </Text>
          </FadeInView>
        </View>
      </View>
    );
  }
}

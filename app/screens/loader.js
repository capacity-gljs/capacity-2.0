import React from "react";
import { Text, View, Button } from "react-native";
import { WaveIndicator } from "react-native-indicators";
import { FadeInView } from "./fader";
import { useTheme } from "@react-navigation/native";

export const Loader = ({ ...props }) => {
  const { colors } = useTheme();

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
          props.navigation.navigate("Home", { color: colors });
        }}
      />

      <View style={{ margin: -250 }}>
        <FadeInView>
          <Text
            style={{
              color: colors.text,
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
};

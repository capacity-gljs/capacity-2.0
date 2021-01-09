import React from "react";
import { View, Text } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { CameraScreenSheet } from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert } from "react-native";

export default class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
    };
    this.camera = null;
    this.takePicture = this.takePicture.bind(this);
  }

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const hasCameraPermission =
      camera.status === "granted" && audio.status === "granted";

    this.setState({ hasCameraPermission });
  }

  async takePicture() {
    if (!this.camera) return;
    Alert.alert("PICTURE TAKEN");
    const photo = await this.camera.takePictureAsync();
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    return (
      <View>
        <View>
          <Camera
            style={CameraScreenSheet.preview}
            ref={(camera) => (this.camera = camera)}
          >
            <View
              style={{
                alignSelf: "center",
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-end",
                marginBottom: 150,
              }}
            >
              <TouchableOpacity
                onPress={this.takePicture}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 50,
                  backgroundColor: "#fff",
                }}
              />
            </View>
          </Camera>
        </View>
      </View>
    );
  }
}

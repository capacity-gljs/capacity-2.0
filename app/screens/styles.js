import { StyleSheet, Dimensions } from "react-native";
import { useTheme }from 'react'

const { width: winWidth, height: winHeight } = Dimensions.get("window");
const screen = Dimensions.get("screen");

export const homeStyleSheet = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "grey",
    width: "100%",
    height: "100%",
  },
  input: {
    borderRadius: 4,
    margin: 5,
  },
  modalView: {
    flex: 0,
    width: screen.width,
    height: 350,
    alignSelf: "center",
    position: "absolute",
    bottom: 12,
    // backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    alignSelf: "flex-end",
    position: "absolute",
    marginTop: 10,
    width: 22,
    height: 22,
    backgroundColor: "#F194FF",
    borderRadius: 50,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 3,
    marginTop: 2,
  },
  modalText: {
    marginBottom: 5,
    fontSize: 15,
  },
  modalName: {
    marginBottom: 10,
    fontSize: 30,
  },
  modalType: {
    marginLeft: -4,
    marginBottom: 5,
    fontSize: 15,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 10,
  },
  buttonSideBySide: {
    alignItems: "center",
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    flexGrow: 1,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
  },

  buttonStyle: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    //borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export const singlePlace = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center"
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    marginBottom: 20,
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
  starIcon: {
    textAlign: "right",
    margin: 10,
  },
});

export const SignUpLogin = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {},
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    margin: 30,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
    backgroundColor: "#788eec",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export const CameraScreenSheet = StyleSheet.create({
  preview: {
    height: winHeight,
    width: winWidth,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    flex: 1,
  },
});
export const UserFeedback = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {},
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    margin: 30,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
    backgroundColor: "#788eec",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16,
  },
  titleStyle: {
    fontSize: 30,
    fontWeight: "500",
    margin: 20,
    paddingTop: 20,
  },
});

import { StyleSheet } from 'react-native'

export const homeStyleSheet = StyleSheet.create({
    container: {
      flex: 1
     },
     safeArea: {
       flex: 1,
       backgroundColor: 'grey'
     },
     input : {
       borderRadius: 4,
       margin: 5
      
     },
    modalView: {
      flex: 0,
      width: 400,
      height: 350,
      alignSelf: "center",
      position: "absolute",
      bottom: 12,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      alignSelf: 'flex-end',
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
      marginTop: 2
    },
    modalText: {
      marginBottom: 5, 
      fontSize: 15
    }, 
    modalName: {
      marginBottom: 10, 
      fontSize: 30
    }, 
    modalType: {
      marginLeft: -4,
      marginBottom: 5, 
      fontSize: 15
    },
    button: {
      alignItems: 'center',
      backgroundColor: "#2196F3",
      padding: 10,
      borderRadius: 10,
      marginTop: 40
    },
    buttonText : {
      color: 'white'
    }
   
  });

export const singlePlace = StyleSheet.create({
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
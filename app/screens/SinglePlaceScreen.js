import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';

function SinglePlaceScreen(props) {
  return (
    <SafeAreaView>
      <Text>{props.route.params.name}</Text>
      <Text>This location is at 77% capacity</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    
   }
});

export default SinglePlaceScreen;
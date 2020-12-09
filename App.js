import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import HomeScreen from './app/screens/HomeScreen';
import SinglePlaceScreen from './app/screens/SinglePlaceScreen';
import SignUpScreen from './app/screens/SignUpScreen';
import LoginScreen from './app/screens/LoginScreen';
import UserFeedbackScreen from './app/screens/UserFeedbackScreen';
import store from './app/store';
import CameraScreen from './app/screens/CameraScreen';
import Loader from './app/screens/loader';
import { logoutUser } from './app/funcs/userFuncs';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} >
      <DrawerItemList {...props} />
      <DrawerItem label="Log out" onPress={() => logoutUser()} />
    </DrawerContentScrollView>
  );
}

function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} />} >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Sign up" component={SignUpScreen} />
      <Drawer.Screen name="Log in" component={LoginScreen} />
      <Drawer.Screen name="Camera" component={CameraScreen} />
      <Drawer.Screen name="Leave Feedback" component={UserFeedbackScreen} />
    </Drawer.Navigator>
  );
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Getting Started">
            <Stack.Screen 
              name="Getting Started"
              component={Loader}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Home"
              component={DrawerRoutes}
              options={({ navigation, route }) => ({
                headerLeft: () => (
                  <Ionicons
                    name="md-menu"
                    size={24}
                    color="black"
                    // onPress={() => navigation.toggleDrawer()}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="SinglePlace"
              component={SinglePlaceScreen}
              options={({ navigation, route }) => ({
                title: 'Location Details',
                headerLeft: () => (
                  <Ionicons
                    name="md-menu"
                    size={24}
                    color="black"
                    // onPress={() => navigation.toggleDrawer()}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={({ navigation, route }) => ({
                title: 'Sign Up',
                headerLeft: () => (
                  <Ionicons
                    name="md-menu"
                    size={24}
                    color="black"
                    // onPress={() => navigation.toggleDrawer()}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={({ navigation, route }) => ({
                title: 'Log in',
                headerLeft: () => (
                  <Ionicons
                    name="md-menu"
                    size={24}
                    color="black"
                    // onPress={() => navigation.toggleDrawer()}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="Camera"
              component={CameraScreen}
              options={({ navigation, route }) => ({
                title: 'Add a Photo',
                headerLeft: () => (
                  <Ionicons
                    name="md-menu"
                    size={24}
                    color="black"
                    // onPress={() => navigation.toggleDrawer()}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="UserFeedback"
              component={UserFeedbackScreen}
              options={({ navigation, route }) => ({
                title: 'Leave Feedback',
                headerLeft: () => (
                  <Ionicons
                    name="md-menu"
                    size={24}
                    color="black"
                    onPress={() => navigation.toggleDrawer()}
                  />
                ),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
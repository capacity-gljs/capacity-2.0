import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { DrawerActions } from '@react-navigation/native';
import { useColorScheme } from 'react-native-appearance';
import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import SinglePlaceScreen from './SinglePlaceScreen';
import SignUpScreen from './SignUpScreen';
import LoginScreen from './LoginScreen';
import UserFeedbackScreen from './UserFeedbackScreen';
import CameraScreen from './CameraScreen';
import UserFavesScreen from './UserFavesScreen';
import { logoutUser } from '../store/user';
import { DrawerStyle } from './styles';
import { Loader } from './loader';
import { Ionicons } from '@expo/vector-icons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import * as Linking from 'expo-linking';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContentDisconnected(props) {
  const { state, ...rest } = props;
  const newState = { ...state };
  newState.routes = newState.routes.filter(
    (item) => item.name !== 'SinglePlace' && item.name !== 'UserFeedback'
  );

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...rest} state={newState} />
      <DrawerItem label="Log out" onPress={() => props.logoutUser()} />
      <View style={DrawerStyle.bottomDrawerSection}>
        <DrawerItem label="Creators" labelStyle={{ fontSize: 13 }} />
        <DrawerItem
          label="Samantha Jardanowski"
          labelStyle={DrawerStyle.labelStyle}
          icon={() => (
            <AntDesign name="linkedin-square" size={20} color="black" />
          )}
          onPress={() =>
            Linking.openURL('https://www.linkedin.com/in/samantha-jardanowski/')
          }
        />
        <DrawerItem
          label="Laura Maranto"
          labelStyle={DrawerStyle.labelStyle}
          icon={() => <FontAwesome name="github" size={24} color="black" />}
          onPress={() => Linking.openURL('https://github.com/lwmaranto')}
        />
        <DrawerItem
          label="Jennifer Rafael"
          labelStyle={DrawerStyle.labelStyle}
          icon={() => <FontAwesome name="github" size={24} color="black" />}
          onPress={() => Linking.openURL('https://github.com/JenniferR326')}
        />
        <DrawerItem
          label="Groana Melendez"
          labelStyle={DrawerStyle.labelStyle}
          icon={() => (
            <AntDesign name="linkedin-square" size={20} color="black" />
          )}
          onPress={() => Linking.openURL('https://www.linkedin.com/in/groana/')}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const CustomDrawerContent = connect(null, (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
}))(CustomDrawerContentDisconnected);

function DrawerRoutes() {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      initialRouteName="Capacity"
      // this goes into Drawer Items List, expect with what we're filtering (state)
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Capacity"
        component={HomeScreen}
        initialParams={colors}
        options={{
          // drawerIcon: (config) => (
          //   <AntDesign name="linkedin-square" size={20} color="black" />
          // ),
          drawerLabel: "Home",
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={UserFavesScreen}
        initialParams={colors}
      />
      <Drawer.Screen name="Camera" component={CameraScreen} />
      <Drawer.Screen name="Sign up" component={SignUpScreen} />
      <Drawer.Screen name="Log in" component={LoginScreen} />
      <Drawer.Screen name="SinglePlace" component={SinglePlaceScreen} />
      <Drawer.Screen name="UserFeedback" component={UserFeedbackScreen} />
    </Drawer.Navigator>
  );
}

function RoutesUnconnected({ user }) {
  const { colors } = useTheme();

  return (
    <Stack.Navigator initialRouteName="Getting Started">
      <Stack.Screen
        name="Getting Started"
        component={Loader}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Capacity"
        component={DrawerRoutes}
        options={({ navigation, route }) => ({
          headerLeft: () => (
            <Ionicons
              name="md-menu"
              size={24}
              color={colors.background}
              style={{ margin: 10 }}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
          headerRight: () => (
            <View>
              {user.uid && (
                <AntDesign name="user" size={24} color={colors.background} style={{ margin: 10 }} />
              )}
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="SinglePlace"
        component={SinglePlaceScreen}
        options={() => ({
          title: 'Location Details',
        })}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={() => ({
          title: 'Sign Up',
        })}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={() => ({
          title: 'Log in',
        })}
      />
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={() => ({
          title: 'Add a Photo',
        })}
      />
      <Stack.Screen
        name="UserFeedback"
        component={UserFeedbackScreen}
        options={() => ({
          title: 'Leave Feedback',
        })}
      />
    </Stack.Navigator>
  );
}

const mapState = (state) => ({
  user: state.user,
});

export default connect(mapState)(RoutesUnconnected);

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator, createSwitchNavigator, createAppContainer,} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
 
import WelcomeLoginScreen from './WelcomeLoginScreen';
import VerificationScreen from './VerificationScreen';
import SettingsScreen from './SettingsScreen';
import DashboardStackScreen from './DashboardStackScreen';

class NavigationScreen extends Component{
  constructor(){
    super();
  }

    render() {
      return (
          <Application />
      );
    }
}

export default NavigationScreen;


const AppStack = createStackNavigator(
{
  Login: {screen: WelcomeLoginScreen},
  Verify: {screen: VerificationScreen},
},{
  defaultNavigationOptions: {
    header: null,
  } 
}
);


const Appswitch = createSwitchNavigator({
    Onload: {screen: AppStack}, 
    Login: {screen: WelcomeLoginScreen},
    Verify: {screen: VerificationScreen},
    Settings: {screen: SettingsScreen},
    Dashboard: {screen: DashboardStackScreen}
})

const Application = createAppContainer(Appswitch);
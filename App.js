import React, {Component} from 'react';
import {Platform, YellowBox, StyleSheet, Text, View} from 'react-native';

import {icon, Spinner} from 'native-base';
import SplashScreen from 'react-native-splash-screen'

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

YellowBox.ignoreWarnings(['Warning: componentWill'])
console.disableYellowBox = true;


import NavigationScreen from './components/NavigationScreen';
import DashboardStackScreen from './components/DashboardStackScreen';

class App extends Component {
  constructor(){
      super();
      this.unsubscriber = null;
      this.state = {
        user: null,
      }
  }

  componentDidMount() {
      this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
          this.setState({ user });
      });
      SplashScreen.hide();
  }

  componentWillUnmount() {
      if (this.unsubscriber) {
          this.unsubscriber();
      }
    }

  render() {
      if (!this.state.user) {
          return <NavigationScreen />;
      }
      return <DashboardStackScreen />;
    }

}

export default App;
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator, createSwitchNavigator, createAppContainer,} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
 
import SettingsScreen from './SettingsScreen';
import DashboardScreen from './DashboardScreen';

import InvoiceScreenOne from './invoice/InvoiceScreenOne';
import InvoiceScreenTwo from './invoice/InvoiceScreenTwo';
import InvoiceScreenThree from './invoice/InvoiceScreenThree';

import ReceiptScreenOne from './receipt/ReceiptScreenOne';
import ReceiptScreenTwo from './receipt/ReceiptScreenTwo';
import ReceiptScreenThree from './receipt/ReceiptScreenThree';

import ProformaScreenOne from './proforma/ProformaScreenOne';
import ProformaScreenTwo from './proforma/ProformaScreenTwo';
import ProformaScreenThree from './proforma/ProformaScreenThree';

import DeliveryScreenOne from './delivery/DeliveryScreenOne';
import DeliveryScreenTwo from './delivery/DeliveryScreenTwo';
import DeliveryScreenThree from './delivery/DeliveryScreenThree';

class DashboardStackScreen extends Component{
  constructor(){
    super();
  }

    render() {
      return (
          <Application />
      );
    }
}

export default DashboardStackScreen;

const DashboardAppStack = createStackNavigator(
{
  Dashboard: {screen: DashboardScreen},
  Settings: {screen: SettingsScreen},

  InvoiceOne: {screen: InvoiceScreenOne},
  InvoiceTwo: {screen: InvoiceScreenTwo},
  InvoiceThree: {screen: InvoiceScreenThree},

  ReceiptOne: {screen: ReceiptScreenOne},
  ReceiptTwo: {screen: ReceiptScreenTwo},
  ReceiptThree: {screen: ReceiptScreenThree},

  ProformaOne: {screen: ProformaScreenOne},
  ProformaTwo: {screen: ProformaScreenTwo},
  ProformaThree: {screen: ProformaScreenThree},

  DeliveryOne: {screen: DeliveryScreenOne},
  DeliveryTwo: {screen: DeliveryScreenTwo},
  DeliveryThree: {screen: DeliveryScreenThree}
  

},{
  defaultNavigationOptions: {
    header: null,
  } 
}
);

const Appswitch = createSwitchNavigator({
    Dashboard: {screen: DashboardAppStack},
    Settings: {screen: SettingsScreen},
    InvoiceOne: {screen: InvoiceScreenOne},
    InvoiceTwo: {screen: InvoiceScreenTwo},
    InvoiceThree: {screen: InvoiceScreenThree},
    ReceiptOne: {screen: ReceiptScreenOne},
    ReceiptTwo: {screen: ReceiptScreenTwo},
    ReceiptThree: {screen: ReceiptScreenThree},
    ProformaOne: {screen: ProformaScreenOne},
    ProformaTwo: {screen: ProformaScreenTwo},
    ProformaThree: {screen: ProformaScreenThree},
    DeliveryOne: {screen: DeliveryScreenOne},
    DeliveryTwo: {screen: DeliveryScreenTwo},
    DeliveryThree: {screen: DeliveryScreenThree}
})

const Application = createAppContainer(Appswitch);
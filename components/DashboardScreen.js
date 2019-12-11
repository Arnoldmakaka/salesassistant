import React, {Component} from 'react';
import {Platform, AsyncStorage, Dimensions, YellowBox, ImageBackground, Button, Alert, ScrollView, StyleSheet, Share, Text, Modal, View, StatusBar, Picker, TextInput, Image, TouchableHighlight, TouchableOpacity, Linking} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon, Spinner, Container, Header, Content, Form, Item, Input, Label } from 'native-base';

let {height, width} = Dimensions.get('window');

export default class DashboardScreen extends Component{

	constructor(props){
    	super(props);
    	this.state={
      	myheight: height,
    	}
  	}

  	render() {
  		let {myheight,} = this.state
    	let mypadding = Math.floor(myheight/23)
      let myheader = Math.floor(myheight/10)
      let mytab = Math.floor(myheight/4)

      //alert(mytab);
      return(
        <ImageBackground source={require('../assets/salesassistantbackground.jpeg')} style={{flex: 1,}}>
          <View style={{flex: 1,}}>
            <View>
              <StatusBar barStyle = "light-content" hidden = {false} backgroundColor={'#2581bc'} translucent = {false}/>
            </View>

            <View style={{flex: 1,}}>

              <View style={{width: '100%', height: myheader, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',  }}>
                    <Text style={{textAlign: 'center', color: '#000000', fontSize: 23, fontWeight: '500', }}>Sales Assistant</Text>
                  </View>
                  
                  <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
                      <Icon name="settings" style={{paddingRight: 15, color: '#2581bc'}} size={36} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={{flex: 1, paddingTop: 10,}}>

                <Text style={{textAlign: 'center', marginTop: 10, marginBottom: 15, fontSize: 23, fontWeight: 'bold', color: '#fff' }}>Select Option</Text>
                
                <View style={styles.mid}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('InvoiceOne')} style={[styles.buttoncontainer, styles.buttonpressone]}>
                    <Text style={styles.buttontext}>Create Invoice</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ReceiptOne')} style={[styles.buttoncontainer, styles.buttonpresstwo]}>
                    <Text style={styles.buttontext}>Create Receipt</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ProformaOne')} style={[styles.buttoncontainer, styles.buttonpressthree]}>
                    <Text style={styles.buttontext}>Create Proformal Invoice</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.props.navigation.navigate('DeliveryOne')} style={[styles.buttoncontainer, styles.buttonpressfour]}>
                    <Text style={styles.buttontext}>Create Delivery Note</Text>
                  </TouchableOpacity>

                </View>

          		</View>	
				    </View>
			    </View>
			  </ImageBackground>
		  );
	  }
}

const styles = StyleSheet.create({
  mid: {
    flex: 1,
    paddingHorizontal: 20,
    
  },
  buttoncontainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 7,
    paddingVertical: 16,
    marginTop: 23,
  },
  buttontext: {
    textAlign: 'center',
    color: '#ffffff', 
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    fontSize: 16,
  },
  buttonpressone: {
    backgroundColor: '#218c74',
  },
  buttonpresstwo: {
    backgroundColor: '#cc8e35',
  },
  buttonpressthree: {
    backgroundColor: '#b33939',
  },
  buttonpressfour: {
    backgroundColor: '#cd6133',
  },
  buttonpressfive: {
    backgroundColor: '#34495e',
  }
  
});
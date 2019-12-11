import React, {Component} from 'react';
import {Platform, AsyncStorage, Dimensions, YellowBox, ImageBackground, Button, Alert, ScrollView, StyleSheet, Share, Text, Modal, View, StatusBar, Picker, TextInput, Image, TouchableHighlight, TouchableOpacity, Linking} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon, Spinner, Container, Header, Content, Form, Item, Input, Label } from 'native-base';

let {height, width} = Dimensions.get('window');

export default class ReceiptScreenOne extends Component {

  constructor(props){
    super(props);
    this.state={
      rfrom: '',
      payfor: '',
      campname: '',
      rby: '',
      myheight: height,
    }
  }

  _storeData = async () => {
    var clientData = {
      rfrom: this.state.rfrom,
      payfor: this.state.payfor,
      campname: this.state.campname,
      rby: this.state.rby
    }
  if (this.state.rfrom != '' && this.state.payfor != '' && this.state.campname != '' && this.state.rby != '') {
    try {
      await AsyncStorage.setItem('@key_rclient', JSON.stringify(clientData));
      console.log("client data captured")
      this.props.navigation.navigate('ReceiptTwo')
    } catch (error) {
      alert(error)
    }
  }
  else{
    Alert.alert("Missing Fields", "Please fill in all missing fields");
  }
}

  render() {
    let {myheight,} = this.state
    let mypadding = Math.floor(myheight/23)
    let myheader = Math.floor(myheight/10)
    let mytab = Math.floor(myheight/4)

    return (
      <ImageBackground source={require('../../assets/salesassistantbackground.jpeg')} style={{flex: 1,}}>
        <View style={{flex: 1,}}>
          <View>
            <StatusBar barStyle = "light-content" hidden = {false} backgroundColor={'#2581bc'} translucent = {false}/>
          </View>

          <View style={{flex: 1,}}>

            <View style={{width: '100%', height: myheader, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5}}>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                <View>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')}>
                    <Icon name="arrow-back" style={{paddingLeft: 15, color: '#2581bc'}} size={36} />
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',  }}>
                  <Text style={{textAlign: 'center', color: '#000000', fontSize: 23, fontWeight: '500', }}>Client Details</Text>
                </View>
              </View>
            </View>

            <View style={{flex: 1,}}>
              <ScrollView style={{flex: 1, paddingTop: 10,}}>
                <KeyboardAwareScrollView style={{flex: 1,}}>
                  <View style={{paddingHorizontal: 16,}}>
                    <Text style={{textAlign: 'center', fontSize: 18, fontStyle: 'normal', fontWeight: '400', color: '#ffffff', paddingVertical: 10,}}>Enter Client Details</Text>
                    
                    <View style={{flex: 1, marginBottom: 15,}}>
                      <TextInput onChangeText={(rfrom)=>this.setState({rfrom})} autoFocus keyboardType = 'default' placeholder="Received From" style={{backgroundColor: 'rgba(255,255,255,0.8)', textAlign: 'left', fontSize: 15, color: '#000000', height: 50, borderColor: '#ffffff', borderRadius: 4, borderWidth: 2, marginVertical: 10}}/>
                      <TextInput onChangeText={(campname)=>this.setState({campname})} keyboardType = 'default' placeholder="Company Name" style={{backgroundColor: 'rgba(255,255,255,0.8)', textAlign: 'left', height: 50, fontSize: 15, color: '#000000', borderColor: '#ffffff', borderWidth: 2, borderRadius: 4, marginVertical: 10}}/>
                      <TextInput onChangeText={(rby)=>this.setState({rby})} autoFocus keyboardType = 'default' placeholder="Received By" style={{backgroundColor: 'rgba(255,255,255,0.8)', textAlign: 'left', fontSize: 15, color: '#000000', height: 50, borderColor: '#ffffff', borderRadius: 4, borderWidth: 2, marginVertical: 10}}/>
                      <TextInput onChangeText={(payfor)=>this.setState({payfor})} keyboardType = 'default' placeholder="Payment For" style={{backgroundColor: 'rgba(255,255,255,0.8)', textAlign: 'left', height: 50, fontSize: 15, color: '#000000', borderColor: '#ffffff', borderRadius: 4, borderWidth: 2, marginVertical: 10}}/>
                    </View>
                  </View>  
                </KeyboardAwareScrollView>  
              </ScrollView>
              <View>
                <TouchableOpacity onPress={() => this._storeData()} style={{backgroundColor: '#fff',}}>
                  <Text style={{textAlign: 'center', fontSize: 16, color: '#2581bc', paddingVertical: 10, paddingHorizontal: 70,}}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          
          </View> 
        </View>
      </ImageBackground>
    );
  }
}
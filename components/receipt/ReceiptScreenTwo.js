import React, {Component} from 'react';
import {Platform, AsyncStorage, Dimensions, YellowBox, ImageBackground, Button, Alert, ScrollView, StyleSheet, Share, Text, Modal, View, StatusBar, Picker, TextInput, Image, TouchableHighlight, TouchableOpacity, Linking} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon, Spinner, Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import DatePicker from 'react-native-datepicker';
var moment = require('moment')

let {height, width} = Dimensions.get('window');
let mydate = moment().format("Do/MM/YYYY")

export default class ReceiptScreenTwo extends Component {

  constructor(props){
    super(props)
    this.state = {
      receiptnumber: '',
      mount: '',
      mountwords: '',
      balance: '',
      Receiptdate: mydate,
      myheight: height,
    }
  }

  _kipData = async () => {
      var tableData = {
        receiptnumber: this.state.receiptnumber,
        Receiptdate: this.state.Receiptdate,
        mount: this.state.mount,
        mountwords: this.state.mountwords,
        balance: this.state.balance
      }
      if (this.state.balance != '' && this.state.mountwords != '' && this.state.mount != '' && this.state.receiptnumber != '') {
        try {
          await AsyncStorage.setItem('@key_receipt', JSON.stringify(tableData));
          //console.log("invoice data captured")
          this.props.navigation.navigate('ReceiptThree')
          alert(this.state.Receiptdate);
        }catch (error) {
          // Error saving data
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
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ReceiptOne')}>
                    <Icon name="arrow-back" style={{paddingLeft: 15, color: '#2581bc'}} size={36} />
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',  }}>
                  <Text style={{textAlign: 'center', color: '#000000', fontSize: 23, fontWeight: '500', }}>Receipt Details</Text>
                </View>
              </View>
            </View>

            <View style={{flex: 1,}}>
              <ScrollView style={{flex: 1, paddingTop: 10,}}>
                <KeyboardAwareScrollView style={{flex: 1,}}>
                  <View style={{paddingHorizontal: 16,}}>
                    <View style={{flex: 1, marginBottom: 15,}}>
                      <Text style={{textAlign: 'center', fontSize: 18, fontStyle: 'normal', fontWeight: '400', color: '#ffffff', paddingVertical: 10,}} >Enter new Receipt Details</Text>
                      <TextInput onChangeText={(receiptnumber)=>this.setState({receiptnumber})} autoFocus keyboardType = 'phone-pad' placeholder="Receipt Number(001)" style={{backgroundColor: 'rgba(255,255,255,0.8)', textAlign: 'left', fontSize: 15, color: '#000000', height: 50, borderRadius: 4, borderColor: '#ffffff', borderWidth: 2, marginVertical: 7}}/>
                      <Text style={{fontSize: 18, fontStyle: 'normal', fontWeight: '400', color: '#ffffff', paddingVertical: 5,}}>Choose Date:</Text>
                      <View>
                        <DatePicker
                          style={{width: 200}}
                          date={this.state.Receiptdate}
                          mode="date"
                          placeholder="select date"
                          format="DD/MM/YYYY"
                          minDate="20/09/1997"
                          maxDate="20/09/2030"
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          showIcon= {true}
                          customStyles={{
                            dateIcon: {
                              position: 'absolute',
                              left: 0,
                              top: 4,
                              marginLeft: 0
                            },
                            dateInput: {
                              marginLeft: 36,
                              backgroundColor: 'rgba(255,255,255,0.8)',
                              color: '#000000',
                            }
                            // ... You can check the source to find the other keys.
                          }}
                          onDateChange={(date) => {this.setState({Receiptdate: date})}}
                        />
                        </View>
                        <TextInput onChangeText={(mount)=>this.setState({mount})} keyboardType = 'phone-pad' placeholder="Amount" style={{backgroundColor: 'rgba(255,255,255,0.8)', textAlign: 'left', height: 50, fontSize: 15, color: '#000000', borderRadius: 4, borderColor: '#ffffff', borderWidth: 2, marginVertical: 7}}/>
                        <TextInput onChangeText={(mountwords)=>this.setState({mountwords})} keyboardType = 'default' placeholder="Amount in Words" style={{backgroundColor: 'rgba(255,255,255,0.8)', textAlign: 'left', fontSize: 15, color: '#000000', borderRadius: 4, height: 50, borderColor: '#ffffff', borderWidth: 2, marginVertical: 7}}/>
                        <TextInput onChangeText={(balance)=>this.setState({balance})} keyboardType = 'phone-pad' placeholder="Balance" style={{backgroundColor: 'rgba(255,255,255,0.8)', textAlign: 'left', height: 50, fontSize: 15, color: '#000000', borderColor: '#ffffff', borderRadius: 4, borderWidth: 2, marginVertical: 7}}/>
                    </View>
                  </View>  
                </KeyboardAwareScrollView>  
              </ScrollView>
              <View>
                <TouchableOpacity onPress={() => this._kipData()} style={{backgroundColor: '#fff',}}>
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
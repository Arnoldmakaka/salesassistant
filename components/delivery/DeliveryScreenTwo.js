import React, {Component} from 'react';
import {Platform, AsyncStorage, Dimensions, YellowBox, ImageBackground, Button, Alert, ScrollView, StyleSheet, Share, Text, Modal, View, StatusBar, Picker, TextInput, Image, TouchableHighlight, TouchableOpacity, Linking} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon, Spinner, Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import DatePicker from 'react-native-datepicker';

var moment = require('moment')

let {height, width} = Dimensions.get('window');
let mydate = moment().format("Do/MM/YYYY")

var dfirst_id = Date.now()

export default class DeliveryScreenTwo extends Component {

  constructor(props){
    super(props)
    this.state = {
      delivernumber: '',
      ddescription: [],
      ditem: [],
      dorder: [],
      dbox_ids: ["dfirst_id"],
      ddeliver: [],
      Deliverydate: mydate,
      myheight: height,
    }
  }

  _kipData = async () => {
      var tableData = {
        delivernumber: this.state.delivernumber,
        Deliverydate: this.state.Deliverydate,
        ddescription: this.state.ddescription,
        ditem: this.state.ditem,
        dorder: this.state.dorder,
        ddeliver: this.state.ddeliver
      }
      if(this.state.delivernumber != '') {
        try {
          await AsyncStorage.setItem('@key_deliver', JSON.stringify(tableData));
          //console.log("delivery data captured")
          this.props.navigation.navigate('DeliveryThree')
        }catch (error) {}
      }
      else{
        Alert.alert("Missing Fields", "Please fill in all missing fields");
      }
  }

  _newItem = () => {
    var dnew_box_id = Date.now()
    console.log(dnew_box_id)
    var dbox_ids = this.state.dbox_ids
    dbox_ids.push(dnew_box_id); 
    this.setState({dbox_ids}) 
  }

  _removeItem = (i,j) => {
    console.log("done");
    var dbox_ids = this.state.dbox_ids
    var ddescription = this.state.ddescription
    var ditem = this.state.ditem
    var dorder = this.state.dorder
    var ddeliver = this.state.ddeliver
    ddescription.splice(j,1)
    ditem.splice(j,1)
    dorder.splice(j,1)
    ddeliver.splice(j,1)
    dbox_ids.splice(i,1)
    this.setState({dbox_ids, ddeliver, ddescription, ditem, dorder})
  }

  _newView = () => {
    var dloopbox = this.state.dbox_ids
    console.log("dloopbox being stated")

    return dloopbox.map((i,j) => (
      <View key={i} style={styles.foot}>

        <TextInput placeholder="Description" style={styles.inputs} returnKeyType='next' onChangeText={
          (ddscr)=>{
            var ddescription = this.state.ddescription
            ddescription[j] = ddscr
            this.setState({ddescription})
        }} />

        <TextInput placeholder="Item Number" style={styles.inputs} returnKeyType='next' keyboardType='phone-pad' onChangeText={
          (tem)=>{
            var ditem = this.state.ditem
            ditem[j] = tem
            this.setState({ditem})
        }} />

        <TextInput placeholder="Ordered" style={styles.inputs} keyboardType='phone-pad' returnKeyType='next' onChangeText={
          (ord)=>{
            var dorder = this.state.dorder
            dorder[j] = ord
            this.setState({dorder})
        }} />

        <TextInput placeholder="Delivered" style={styles.inputs} autoCapitalize='false' keyboardType='phone-pad' returnKeyType='done' onChangeText={
          (del)=>{
            var ddeliver = this.state.ddeliver
            ddeliver[j] = del
            this.setState({ddeliver})
        }} />

        <TouchableOpacity style={styles.zaharacont} onPress={()=>this._removeItem(j)}>
          <Text style={styles.zaharatext}>- Del</Text>
        </TouchableOpacity>

      </View>    
      )
    )
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
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('DeliveryOne')}>
                    <Icon name="arrow-back" style={{paddingLeft: 15, color: '#2581bc'}} size={36} />
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',  }}>
                  <Text style={{textAlign: 'center', color: '#000000', fontSize: 23, fontWeight: '500', }}>Delivery Details</Text>
                </View>
              </View>
            </View>

            <View style={{flex: 1,}}>
              <ScrollView style={{flex: 1, paddingTop: 10,}}>
                <KeyboardAwareScrollView style={{flex: 1,}}>
                  <View style={{paddingHorizontal: 16,}}>
                    <View style={{paddingVertical: 10,}}>
                      <TextInput onChangeText={(delivernumber)=>this.setState({delivernumber})} autoFocus keyboardType = 'phone-pad' placeholder="Delivery Number(001)" style={{backgroundColor: 'rgba(255,255,255,0.8)', textAlign: 'left', fontSize: 15, color: '#000000', height: 50, borderRadius: 4, borderColor: '#ffffff', borderWidth: 2, marginVertical: 7}}/>
                      <Text style={{fontSize: 18, fontStyle: 'normal', fontWeight: '400', color: '#ffffff', paddingVertical: 5,}}>Choose Date:</Text>
                      <View>
                        <DatePicker
                          style={{width: 200}}
                          date={this.state.Deliverydate}
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
                          onDateChange={(date) => {this.setState({Deliverydate: date})}}
                        />
                      </View>

                      {this._newView()}

                      <View style={{justifyContent: 'center', alignItems: 'flex-start', }}>
                        <TouchableOpacity onPress={()=>this._newItem()} style={{marginVertical: 10, backgroundColor: '#ffffff', borderRadius: 4,}}>
                          <Text style={{textAlign: 'center', paddingHorizontal: 20, fontSize: 15, color: '#00528e', fontWeight: '700', paddingVertical: 10,}}>+ Add Item</Text>
                        </TouchableOpacity>
                      </View>
                  
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

const styles = StyleSheet.create({
  stretch: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  fullscreen: {
    paddingHorizontal: 30,
  },
  mid: {
    marginBottom: 5,
    marginTop: 20,
  },
  foot: {
    backgroundColor: '#ffffff',
    marginVertical: 7,
    paddingVertical: 5,
    borderRadius: 6,
  },
  inputs: {
    fontSize: 17,
    color: '#000000',
    height: 40,
    paddingHorizontal: 5,
    marginHorizontal: 7,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: '#ecf0f1',
  },
  input: {
    height: 50,
    backgroundColor: '#ffffff',
    marginBottom: 7,
    color: '#2a2a2a',
    borderRadius: 4, 
    paddingHorizontal: 7,
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  inputed: {
    height: 40,
    backgroundColor: '#ffffff',
    marginBottom: 7,
    color: '#2a2a2a',
    borderRadius: 4, 
    paddingHorizontal: 18,
  },

  buttoncontainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 20,
    borderRadius: 4,
    paddingVertical: 10,
    marginHorizontal: 60,
    marginBottom: 5,
  },
  buttontext: {
    textAlign: 'center',
    color: '#2980b9', 
    fontWeight: '700',
  },
  buttontexts: {
    textAlign: 'center',
    color: '#ffffff', 
    fontWeight: '700',
    fontSize: 16,
    marginVertical: 5,
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: '#ffffff',
  },
  textStyles: {
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: '#ffffff',
  },
  largeText: {
    fontSize: 27,
  },
  smallText: {
    fontSize: 20,
  },
  midText: {
    fontSize: 18,
    alignItems: 'flex-start',
  },

  lowerbutton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  lowercontainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 4, 
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  lowertext: {
    textAlign: 'center',
    color: '#2980b9', 
    fontWeight: '700',
  },
  lowertwo: {
    marginLeft: 5,
  },

  zaharacont: {
    alignItems: 'flex-end',
    marginHorizontal: 7,
    marginVertical: 5,
    
  },
  zaharatext: {
    fontSize: 17,
    color: '#ffffff', 
    paddingHorizontal: 5,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#ecf0f1',
    backgroundColor: '#2980b9',
  },

});

                
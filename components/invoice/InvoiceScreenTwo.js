import React, {Component} from 'react';
import {Platform, AsyncStorage, Dimensions, YellowBox, ImageBackground, Button, Alert, ScrollView, StyleSheet, Share, Text, Modal, View, StatusBar, Picker, TextInput, Image, TouchableHighlight, TouchableOpacity, Linking} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon, Spinner, Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import DatePicker from 'react-native-datepicker';

var moment = require('moment')

let {height, width} = Dimensions.get('window');
let mydate = moment().format("Do/MM/YYYY")

var amounts = []
var first_id = Date.now()

export default class InvoiceScreenTwo extends Component {

  constructor(props){
    super(props);
    this.state = {
      invoicenumber: '',
      description: [],
      qty: [],
      unitPrice: [],
      amount: [],
      box_ids: ["first_id"],
      totamount: '',
      Invoicedate: mydate,
      myheight: height,
    }
  }

  _kipData = async () => {
      var tableData = {
        invoicenumber: this.state.invoicenumber,
        Invoicedate: this.state.Invoicedate,
        description: this.state.description,
        qty: this.state.qty,
        unitPrice: this.state.unitPrice,
        amount: amounts,
        totamount: this.state.totamount,
      }
      if(this.state.invoicenumber != ''){
        try {
          await AsyncStorage.setItem('@key_invoice', JSON.stringify(tableData));
          this.props.navigation.navigate('InvoiceThree')
        }catch (error) {}
      }
      else{
        Alert.alert("Missing Fields", "Please fill in all missing fields");
      }
  }

  _newItem = () => {
    var new_box_id = Date.now()
    console.log(new_box_id)
    var box_ids = this.state.box_ids
    box_ids.push(new_box_id); 
    this.setState({box_ids}) 
  }

  _removeItem = (i,j) => {
    console.log("done");
    var box_ids = this.state.box_ids
    //var check_index = box_ids.indexOf(j)
    var qty = this.state.qty
    var description = this.state.description
    var amount = this.state.amount
    var unitPrice = this.state.unitPrice
    qty.splice(j,1)
    description.splice(j,1)
    amount.splice(j,1)
    unitPrice.splice(j,1)
    box_ids.splice(i,1)
    this.setState({box_ids,qty,description,amount,unitPrice})
  }

  getValue(j){
    console.log('j:'+j)
    let { qty, unitPrice} = this.state 
    amounts[j] = qty[j] * unitPrice[j]
    return this.state.unitPrice[j] == null ? "Amount" : JSON.stringify(this.state.qty[j]*this.state.unitPrice[j])
  }

  _newView = () => {
    var loopbox = this.state.box_ids
    console.log("loopbox being stated")

    return loopbox.map((i,j) => (
      <View key={i} style={styles.foot}>

        <TextInput placeholder="Description" style={styles.inputs} returnKeyType='next' onChangeText={
          (dscr)=>{
            var description = this.state.description
            description[j] = dscr
            this.setState({description})
        }} />

        <TextInput placeholder="QTY" style={styles.inputs} returnKeyType='next' keyboardType='phone-pad' onChangeText={
          (qt)=>{
            var qty = this.state.qty
            qty[j] = qt
            this.setState({qty})
        }} />

        <TextInput placeholder="Unit Price"
         //value = {this.state.unitPrice[j] == null ? 0 : this.formatNumber(this.state.unitPrice[j])}
         style={styles.inputs} keyboardType='phone-pad' returnKeyType='next' onChangeText={
          (up)=>{
            var unitPrice = this.state.unitPrice
            unitPrice[j] = up
            this.setState({unitPrice})
        }} />

        <TextInput 
        value={this.getValue(j) } 
        style={styles.inputs} editable={false} 
         />

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
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('InvoiceOne')}>
                    <Icon name="arrow-back" style={{paddingLeft: 15, color: '#2581bc'}} size={36} />
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',  }}>
                  <Text style={{textAlign: 'center', color: '#000000', fontSize: 23, fontWeight: '500', }}>Invoice Details</Text>
                </View>
              </View>
            </View>

            <View style={{flex: 1,}}>
              <ScrollView style={{flex: 1, paddingTop: 10,}}>
                <KeyboardAwareScrollView style={{flex: 1,}}>
                  <View style={{paddingHorizontal: 16,}}>
                    <View style={{flex: 1, marginBottom: 15,}}>
                      <Text style={{textAlign: 'center', fontSize: 18, fontStyle: 'normal', fontWeight: '400', color: '#ffffff', paddingVertical: 10,}} >Enter new Invoice Details</Text>
                        <TextInput onChangeText={(invoicenumber)=>this.setState({invoicenumber})} autoFocus keyboardType = 'phone-pad' placeholder="Invoice Number(001)" style={{backgroundColor: 'rgba(255,255,255,0.8)', textAlign: 'left', fontSize: 15, color: '#000000', height: 50, borderRadius: 4, borderColor: '#ffffff', borderWidth: 2, marginVertical: 7}}/>
                        <Text style={{fontSize: 18, fontStyle: 'normal', fontWeight: '400', color: '#ffffff', paddingVertical: 5,}}>Choose Date:</Text>
                        <View style={{marginVertical: 5,}}>
                        <DatePicker
                          style={{width: 200}}
                          date={this.state.Invoicedate}
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
                          onDateChange={(date) => {this.setState({Invoicedate: date})}}
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
    )
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
  top: {
    justifyContent:'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 5,
    marginTop: 10,
  },
  foot: {
    backgroundColor: '#ffffff',
    marginVertical: 5,
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
    marginBottom: 5,
    marginVertical: 15,
    color: '#2a2a2a',
    borderRadius: 4, 
    paddingHorizontal: 7,
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
  },
  inputed: {
    height: 40,
    backgroundColor: '#ffffff',
    marginBottom: 5,
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
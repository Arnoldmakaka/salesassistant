import React, {Component} from 'react';
import {Platform, AsyncStorage, Dimensions, YellowBox, ImageBackground, Button, Alert, ScrollView, StyleSheet, Share, Text, Modal, View, StatusBar, Picker, TextInput, Image, TouchableHighlight, TouchableOpacity, Linking} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon, Spinner, Container, Header, Content, Form, Item, Input, Label } from 'native-base';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';

let {height, width} = Dimensions.get('window');

export default class ReceiptScreenThree extends Component {

  constructor(props){
    super(props);
    this.state= {
      myheight: height,

      rfrom: '',
      payfor: '',
      campname: '',
      rby: '',
    
      compname: '',
      compemail: '',
      compadd: '',
      city: '',
      country: '',
      comptel: '',
      curr: '',
      pic: '',
      picTwo: '',

      receiptnumber: '',
      Receiptdate: '',
      mount: '',
      mountwords: '',
      balance: ''
    }
  }

  componentDidMount(){
    console.log('componentDidMount')
    AsyncStorage.getItem("@key_rclient").then((r)=>{
      var retrievedData = JSON.parse(r)
      console.log('r:'+r)
     
     this.setState({rfrom: retrievedData.rfrom}),
     this.setState({payfor: retrievedData.payfor}),
     this.setState({campname: retrievedData.campname}),
     this.setState({rby: retrievedData.rby})
    })

    AsyncStorage.getItem("@key_comp").then((r)=>{
      var retrieveduserData = JSON.parse(r)
      console.log('r:'+r)

     this.setState({compname: retrieveduserData.compname}),
     this.setState({compemail: retrieveduserData.compemail}),
     this.setState({compadd: retrieveduserData.compadd}),
     this.setState({city: retrieveduserData.city}),
     this.setState({country: retrieveduserData.country}),
     this.setState({comptel: retrieveduserData.comptel}),
     this.setState({curr: retrieveduserData.curr}),
     this.setState({pic: retrieveduserData.pic}),
     this.setState({picTwo: retrieveduserData.picTwo})
    })

    AsyncStorage.getItem("@key_sha").then((r)=>{
     this.setState(image)
    })

    AsyncStorage.getItem("@key_receipt").then((r)=>{
      var retrievedreceiptData = JSON.parse(r)
      console.log('r:'+r)
     this.setState({receiptnumber: retrievedreceiptData.receiptnumber}),
     this.setState({Receiptdate: retrievedreceiptData.Receiptdate}),
     this.setState({mount: retrievedreceiptData.mount}),
     this.setState({mountwords: retrievedreceiptData.mountwords}),
     this.setState({balance: retrievedreceiptData.balance})
    })
  }

  save(){
    let { rfrom, payfor, campname, rby, compname, compemail, compadd, city, country, comptel, signpic, pic, picTwo, receiptnumber, Receiptdate, mount, mountwords, balance } = this.state    
  
    //Expo.Print.printAsync({
    RNPrint.print({
      html: '<body style="width: 100%; padding: 0px; margin: 0px; height: 792px;"><div style="background-color: rgba(255,255,255,0.7); height: 100%;"><div style="height: 692px; overflow: hidden;"><div style="border-top: 4px solid #000; border-bottom: 4px solid #000;"><div style="height: 200px; width: 94%; margin: 0 auto; "><div style="display: inline; "><div style="width: 30%; float: left; height: 200px;"><ul style="list-style: none;"><li style="font-size: 16px; padding: 7px 0px 0px 10px;">'+compname +'</li><li style="font-size: 16px; padding: 5px 0px 0px 10px;">'+compadd +'</li><li style="font-size: 16px; padding: 5px 0px 0px 10px;">'+city +'</li><li style="font-size: 16px; padding: 5px 0px 0px 10px;">'+country +'</li></ul></div><div style="width: 40%; float: left; height: 200px; text-align: center;"><img style="padding: 5px 0px 0px 0px; border: 0px; margin: 10px 0px 15px 0px; width: 180px; height: 180px;" src="data:image/jpeg;base64,'+pic +'" /></div><div style="width: 30%; float: left; height: 200px;"><ul style="list-style: none;"><li style="font-size: 16px; padding: 7px 0px 0px 10px;"><strong>Tel/Mobile:</strong> '+comptel +'</li><li style="font-size: 16px; padding: 5px 0px 0px 10px;"><strong>Email:</strong> '+compemail +'</li></ul></div></div></div></div><div style="width: 94%; margin: 0 auto;"><div style="text-align: center;"><p style="font-size: 35px; padding: 10px 0px; margin-top: 0px; margin-bottom: 0px;">RECEIPT</p></div><div style="margin:0 auto; display: -ms-flexbox; display: flex; -ms-flex-wrap: wrap; flex-wrap: wrap;"><div style="position: relative; width: 100%; min-height: 1px; padding-right: 10px; -ms-flex: 0 0 47%; flex: 0 0 47%; margin-top: 5px;"><div style="width: 100%; display: inline-block;"><p>Date: </strong>'+Receiptdate+'</p></div></div><div style="position: relative; width: 100%; min-height: 1px; padding-right: 15px; padding-left: 15px; -ms-flex: 0 0 47%; flex: 0 0 47%; text-align: right; margin: 15px 0;"><p style="padding: 7px 0px 0px 10px; margin-top: -20px; font-size: 16px; font-weight: bold;">No: <strong style="font-size: 24px; color: #FF0000;">#'+ receiptnumber +'</strong></p></div></div><div><p>Received with thanks from : <strong style="border-bottom: 1px solid #000; font-size: 20px; padding: 0 20px;">'+ rfrom +'</strong></p></div><div><p>Amount in words : <strong style="border-bottom: 1px solid #000; font-size: 20px; padding: 0 20px;">'+ mountwords +'</strong></p></div><div style="display: inline-block; width: 100%;"><div style="float: left; width: 50%;"><p>Amount :    <strong style="border: 2px solid #000; background-color: #fff; padding: 5px 25px; font-size: 20px; margin-left: 15px;">'+ mount +'</strong></p></div><div style="float: right; width: 50%;"><p>Balance :  <strong style="border: 2px solid #000; background-color: #fff; padding: 5px 25px; font-size: 20px; margin-left: 15px;">'+ balance +'</strong></p></div></div><div><p>For Payment of : <strong style="border-bottom: 1px solid #000; font-size: 20px; padding: 0 20px;">'+ payfor +'</strong></p></div><div><p>Name/Company : <strong style="border-bottom: 1px solid #000; font-size: 20px; padding: 0 20px;">'+ campname +'</strong></p></div><div><p>Received by : <strong style="border-bottom: 1px solid #000; font-size: 20px; padding: 0 20px;">'+ rby +'</strong></p></div><div><p>Sign : <img style=" vertical-align: middle; margin: 10px 0px 0px 0px; max-height: 90px; max-width: 100px; padding: 5px 0px 0px 0px; border: 0px;" src="data:image/jpeg;base64,'+picTwo +'" /></p></div></div></div><div><div style="flex-direction: column; display: flex; align-content: flex-end; background-color: rgba(255,255,255,0.7);"><div style="width: 94%; margin: 0 auto; "><div style="text-align: center;"><p style="color: #2980b9; font-size: 14px;">PDF Generated by SalesAssistant App<br>Powered by YoungTreps</p></div></div></div></div></div></body>' 
      }).then(()=>{
      alert('created pdf')
    }
    )
  }

  render() {
    let {myheight,} = this.state
    let mypadding = Math.floor(myheight/23)
    let myheader = Math.floor(myheight/10)
    let mytab = Math.floor(myheight/3)

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
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ReceiptTwo')}>
                    <Icon name="arrow-back" style={{paddingLeft: 15, color: '#2581bc'}} size={36} />
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',  }}>
                  <Text style={{textAlign: 'center', color: '#000000', fontSize: 23, fontWeight: '500', }}>Save and Download</Text>
                </View>
              </View>
            </View>

            <View style={{flex: 1, paddingHorizontal: 16,}}>
              {/*<View style={{marginVertical: 20, paddingVertical: 10, paddingHorizontal: 10, borderRadius: 7, height: mytab, width: '100%', backgroundColor: '#fff'}}>
                <Text style={{color: '#2581bc', fontSize: 20,}}>YOUNGTREPS Services</Text>
                <View style={{paddingHorizontal: 5,}}>
                  <Text style={{color: '#000', fontSize: 14,}}>-> Business Formation & Registration</Text>
                  <Text style={{color: '#000', fontSize: 14,}}>-> Business Management & Advisory</Text>
                  <Text style={{color: '#000', fontSize: 14,}}>-> Business Documentation & Proposals</Text>
                  <Text style={{color: '#000', fontSize: 14,}}>-> Tax & Accountancy Services</Text>
                  <Text style={{color: '#000', fontSize: 14,}}>-> Project & Investment Financing</Text>
                  <Text style={{color: '#000', fontSize: 14,}}>-> Marketing & Cooperate Image</Text>
                </View>
              </View>*/}
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                <TouchableOpacity onPress={() => this.save()} style={{backgroundColor: '#ffffff', borderWidth: 1, borderRadius: 4, borderColor: '#ffffff',}}>
                  <Text style={{textAlign: 'center', fontSize: 18, color: '#00528e', paddingVertical: 10, paddingHorizontal: 70,}}>Print to PDF</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View> 
        </View>
      </ImageBackground>
    );
  }
}
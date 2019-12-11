import React, {Component} from 'react';
import {Platform, AsyncStorage, Dimensions, YellowBox, ImageBackground, Button, Alert, ScrollView, StyleSheet, Share, Text, Modal, View, StatusBar, Picker, TextInput, Image, TouchableHighlight, TouchableOpacity, Linking} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon, Spinner, Container, Header, Content, Form, Item, Input, Label } from 'native-base';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';

let {height, width} = Dimensions.get('window');

export default class ProformaScreenThree extends React.Component {

  constructor(props){
    super(props);
    this.state={
      myheight: height,

      proformname: '',
      proname: '',
      proemail: '',
      proadd: '',
      protel: '',
      
      compname: '',
      compemail: '',
      compadd: '',
      city: '',
      country: '',
      comptel: '',
      curr: '',
      pic: '',

      proformnumber: '',
      proformadate: '',
      prodescription: [],
      proqty: [],
      prounitPrice: [],
      proamount: []
    }
  }  

  componentDidMount(){
    console.log('componentDidMount')
    AsyncStorage.getItem("@key_proclient").then((r)=>{
      var retrievedproData = JSON.parse(r)
      console.log('r:'+r)
     
     this.setState({proformname: retrievedproData.proformname}),
     this.setState({proname: retrievedproData.proname}),
     this.setState({proemail: retrievedproData.proemail}),
     this.setState({proadd: retrievedproData.proadd}),
     this.setState({protel: retrievedproData.protel})
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
     this.setState({pic: retrieveduserData.pic})
    })

    AsyncStorage.getItem("@key_sha").then((r)=>{
     this.setState(image)
    })

    AsyncStorage.getItem("@key_proform").then((r)=>{
      var retrievedproformData = JSON.parse(r)
      console.log('r:'+r)
     this.setState({proformnumber: retrievedproformData.proformnumber}),
     this.setState({proformadate: retrievedproformData.proformadate}),
     this.setState({prodescription: retrievedproformData.prodescription}),
     this.setState({proqty: retrievedproformData.proqty}),
     this.setState({prounitPrice: retrievedproformData.prounitPrice}),
     this.setState({proamount: retrievedproformData.proamount})
    })
  }

  save(){
    let {compname, compemail, compadd, city, country, comptel, curr, pic, proformname, proname, proemail, proadd, protel, proformnumber, proformadate, prodescription, proqty, prounitPrice, proamount } = this.state
    var prosalesleng = prodescription.length;
    var k, tabled, totamount = 0;
    console.log(prosalesleng)
    console.log('description:', prodescription[0])
    tabled = "<tbody>";
    for (k = 0; k < prosalesleng; k++) {
      tabled += "<tr>";
      tabled += "<td>"  +  prodescription[k]  + "</td>"+  "<td>" + proqty[k] + "</td>" + "<td>" + prounitPrice[k] +  "</td>" + "<td>" + proamount[k] + "</td>" ;
      tabled += "</tr>";
      totamount += Number(proamount[k]);
    }
    tabled += "</tbody>";

    //Expo.Print.printAsync({
    RNPrint.print({
      html: '<body style="width: 100%; padding: 0px; margin: 0px; height: 100%;"><div style="background-color: rgba(255,255,255,0.7); height: 100%;"><div style="flex-direction: column; display: flex; flex-wrap: wrap;"><div style="flex-direction: column; display: flex; align-content: flex-start;"><div style="border-top: 4px solid #000; border-bottom: 4px solid #000;"><div style="height: 200px; width: 94%; margin: 0 auto; "><div style="display: inline; "><div style="width: 30%; float: left; height: 200px;"><ul style="list-style: none;"><li style="font-size: 16px; padding: 7px 0px 0px 10px;">'+compname +'</li><li style="font-size: 16px; padding: 5px 0px 0px 10px;">'+compadd +'</li><li style="font-size: 16px; padding: 5px 0px 0px 10px;">'+city +'</li><li style="font-size: 16px; padding: 5px 0px 0px 10px;">'+country +'</li></ul></div><div style="width: 40%; float: left; height: 200px; text-align: center;"><img style="padding: 5px 0px 0px 0px; border: 0px; margin: 10px 0px 15px 0px; width: 180px; height: 180px;" src="data:image/jpeg;base64,'+pic +'" /></div><div style="width: 30%; float: left; height: 200px;"><ul style="list-style: none;"><li style="font-size: 16px; padding: 7px 0px 0px 10px;"><strong>Tel/Mobile:</strong> '+comptel +'</li><li style="font-size: 16px; padding: 5px 0px 0px 10px;"><strong>Email:</strong> '+compemail +'</li></ul></div></div></div></div><div style="width: 94%; margin: 0 auto;"><div style="text-align: center;"><p style="font-size: 35px; padding: 15px 0px; margin-top: 0px; margin-bottom: 0px;">PROFORMA INVOICE</p></div><div style="margin:0 auto; display: -ms-flexbox; display: flex; -ms-flex-wrap: wrap; flex-wrap: wrap;"><div style="position: relative; width: 100%; min-height: 1px; padding-right: 10px; -ms-flex: 0 0 47%; flex: 0 0 47%; margin-top: 5px;"><div style="width: 100%; display: inline-block;"><p style="width:100%; padding: 10px 10px 10px 10px; background-color: #2980b9; font-size: 20px; font-weight: normal; color: #fff; border-radius: 7px;">BILL TO<strong> '+proformname +'</strong></p><p style="padding: 7px 0px 0px 10px; margin-top: -20px; font-size: 16px; font-weight: bold;">'+proname +'</p><p style="padding: 7px 0px 0px 10px; margin-top: -20px; font-size: 16px; font-weight: bold;">'+proemail +'</p><p style="padding: 7px 0px 0px 10px; margin-top: -20px; font-size: 16px; font-weight: bold;">'+proadd +'</p><p style="padding: 7px 0px 0px 10px; margin-top: -20px; font-size: 16px; font-weight: bold;"><strong>Tel/Mobile:</strong> '+protel +'</p></div></div><div style="position: relative; width: 100%; min-height: 1px; padding-right: 15px; padding-left: 15px; -ms-flex: 0 0 47%; flex: 0 0 47%; text-align: right; margin: 15px 0;"><p style="padding: 7px 0px 0px 10px; margin-top: -20px; font-size: 16px; font-weight: bold;"><strong>Invoice No:</strong><strong style="font-size: 24px; color: #FF0000;"> #'+proformnumber +'</strong></p><p style="padding: 7px 0px 0px 10px; margin-top: -20px; font-size: 16px; font-weight: bold;"><strong>Date:</strong> '+proformadate+'</p></div></div><table style="width: 100%; overflow: hidden;"><tr style="width: 100%; background-color: #fff;"><th style="width: 30%; text-align: left; font-size: 20px; font-weight: normal; color: #fff; background-color: #2980b9; padding: 10px; border-right: 1px #fff solid;">DESCRIPTION</th><th style="width: 20%; text-align: left; font-size: 20px; font-weight: normal; color: #fff; background-color: #2980b9; padding: 10px; border-right: 1px #fff solid;">QTY</th><th style="width: 25%; text-align: left; font-size: 20px; font-weight: normal; color: #fff; background-color: #2980b9; padding: 10px; border-right: 1px #fff solid;">UNIT PRICE</th><th style="width: 25%; text-align: left; font-size: 20px; font-weight: normal; color: #fff; background-color: #2980b9; padding: 10px; border-right: 1px #fff solid;">AMOUNT</th><th style="width: 30%; font-size: 20px; font-weight: normal; color: #fff; background-color: #fff; padding-top: 10px; padding-bottom: 10px;"></th></tr> '+ tabled +'<tr><tbody style="margin-top: 15px;"><td></td><td></td><td style="width: 25%; font-size: 20px; font-weight: normal; color: #fff; background-color: #2980b9; padding-top: 10px; padding-bottom: 10px; text-align: center;">Total</td><td><center>' +curr +' '+totamount +'</center></td></tr></table></div></div><div style="flex-direction: column; display: flex; align-content: end; background-color: rgba(255,255,255,0.7);"><div style="width: 94%; margin: 0 auto; "><div style="text-align: center;"><p style="color: #2980b9; font-size: 14px;">PDF Generated by SalesAssistant App<br>Powered by YoungTreps</p></div></div></div></div></div></body>'
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
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ProformaTwo')}>
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
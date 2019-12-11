import React, {Component} from 'react';
import {Platform, AsyncStorage, Dimensions, YellowBox, ImageBackground, Button, Alert, ScrollView, StyleSheet, Share, Text, Modal, View, StatusBar, Picker, TextInput, Image, TouchableHighlight, TouchableOpacity, Linking} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Spinner, Container, Header, Content, Form, Item, Input, Label } from 'native-base';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

let {height, width} = Dimensions.get('window');

export default class WelcomeLoginScreen extends Component{

	constructor(props){
    	super(props);
    	this.state={
      	myheight: height,
        name: '',
        email: '',
        phoneNumber: '+256',
        loading: false,
        message: '',
    	}
  	}

    signIn = () => {
      const {name, email, phoneNumber} = this.state
      if (this.state.email != '' && this.state.phoneNumber != '' && this.state.name != ''){
        this.setState({
          loading: true,
          message: '' 
        });
        auth().signInWithPhoneNumber(phoneNumber)
        .then(confirmRes => { 
          this.props.navigation.navigate("Verify", {
            confirmRes: confirmRes
          })
        })
        .catch((error) => {
          this.setState({
            loading:false,
            message: err.message
          })
        })

      }else{
        Alert.alert('Missing Fields', 'Please fill in all the required fields');
      }
    };

  	render() {
  		let {myheight, message, loading, phoneNumber,} = this.state
    	let mypadding = Math.floor(myheight/23)
		
		//alert(mypadding);
		return(
			<ImageBackground source={require('../assets/salesassistantbackgroundimage.jpg')} style={{flex: 1,}}>
			<View style={{flex: 1,}}>
				<View>
					<StatusBar barStyle = "light-content" hidden = {false} backgroundColor={'transparent'} translucent = {true}/>
				</View>
				
				<View style={{flex: 1, marginTop: mypadding, backgroundColor: 'rgba(255,255,255,0.4)' }}>
					<ScrollView style={{flex: 1, paddingTop: 10,}}>
            			<KeyboardAwareScrollView style={{flex: 1,}}>
            				<View style={{flex: 1, paddingHorizontal: 16,}}>
            					<View style={{marginVertical: 5,}}>
            						{loading ? <Spinner color="blue" /> : <Text style={{color: '#000000', fontSize: 16, textAlign: 'center', }}>{message}</Text>}
            					</View>
            					<View style={{padding: 0,}}>
            						<Image source={require('../assets/salesassistantlogo.png')} style={{marginVertical: 7, rezise: 'contain',}} />
            						<Text style={{fontWeight: 'bold', fontSize: 25, padding: 0, }}>Welcome,</Text>
            						<Text style={{fontSize: 19, fontWeight: '300', padding: 0,}}>Sign in to continue</Text>
            					</View>

            					<View style={{padding: 0,}}>
            						<View style={{flex: 1, marginBottom: 10,}}>
            							<Content>
								        	<Form>
								            	<Item floatingLabel>
								              		<Label>Username</Label>
								            		<Input onChangeText={(name)=>this.setState({name})} />
								            	</Item>
								            	<Item floatingLabel>
								             		<Label>Email</Label>
								              		<Input onChangeText={(email)=>this.setState({email})} />
								            	</Item>
								            	<Item floatingLabel>
								              		<Label>Phone Number</Label>
								              		<Input onChangeText={value => this.setState({ phoneNumber: value })} />
								            	</Item>
								          	</Form>
								        </Content>
            						</View>

							        <View style={{marginBottom: 10, marginTop: 20,}}>
							        	<TouchableOpacity onPress={()=> this.signIn()} style={{backgroundColor: '#2581bc', borderRadius: 7,}}>
							        		<Text style={{textAlign: 'center', paddingVertical: 14, fontSize: 16, color: '#fff', }}>Continue</Text>
							        	</TouchableOpacity>
							        </View>

            					</View>
            				</View>

            				<View style={{ justifyContent:'center', alignItems: 'center', marginVertical: 14,}}>
                      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                        <Text style={[styles.midText, styles.textStylesd]}>Powered by </Text>
                        <Text style={[styles.midText, styles.textStyles]} onPress={() => Linking.openURL('http://www.theyoungtreps.com/')} >YoungTreps</Text>
                      </View>
                      <Text style={[styles.smallText, styles.textStyl]}>YoungTreps{'\u00A9'}copyright 2019</Text>
                    </View>

            			</KeyboardAwareScrollView>
          			</ScrollView>	
				</View>
			</View>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: '#2980b9',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  textStyles: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: '#2980b9',
  },
  textStylesd: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: '#000000',
  },
  textStyled: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: '#34495E',
  },
  textStyl: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: '#000000',
    marginTop: 5,
  },
  largeText: {
    fontSize: 35,
  },
  midText: {
    fontSize: 14,
  },
  smallText: {
    fontSize: 10,
  }
});
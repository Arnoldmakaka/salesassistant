import React, {Component} from 'react';
import {Platform, AsyncStorage, Dimensions, YellowBox, ImageBackground, Button, Alert, ScrollView, StyleSheet, Share, Text, Modal, View, StatusBar, Picker, TextInput, Image, TouchableHighlight, TouchableOpacity, Linking} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon, Spinner, Container, Header, Content, Form, Item, Input, Label } from 'native-base';

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

let {height, width} = Dimensions.get('window');

export default class VerificationScreen extends Component{

	constructor(props) {
    	super(props);
    	this.state = {
    		myheight: height,
	      	code: "",
      		loading: false,
      		message: ""
    	};
  	}

  	verify = () => {
    	const { code } = this.state;
    	if (this.state.code != ''){
      		this.setState({
          		loading:true,
          		message: '' 
        	});
      		const confirmRes = this.props.navigation.getParam("confirmRes");
      		confirmRes
      		.confirm(code)
      		.then(user => {
        		this._userid(user)
        		this.props.navigation.navigate('Settings')
      		})
      		.catch(err => {
      			this.setState({ 
      				loading: false, 
      				message: err.message 
      			})
      		});
    	}
    	else{
      		Alert.alert('Missing Field', 'Please fill in the required field');
    	}
  	}

  	_userid = async (user) => {
    	var ids = {user: user}
    	await AsyncStorage.setItem('@userid', JSON.stringify(ids));
	}

  	render() {
    	let {myheight, message, loading} = this.state
    	let mypadding = Math.floor(myheight/23)
		
		//alert(mypadding);
		return(
			<ImageBackground source={require('../assets/salesassistantbackground.jpeg')} style={{flex: 1,}}>
				<View style={{flex: 1,}}>
					<View>
						<StatusBar barStyle = "light-content" hidden = {false} backgroundColor={'#2581bc'} translucent = {false}/>
					</View>
				
					<View style={{flex: 1, backgroundColor: 'rgba(255,255,255,0.4)' }}>
						<ScrollView style={{flex: 1, paddingTop: 10,}}>
            				<KeyboardAwareScrollView style={{flex: 1,}}>
            					<View style={{alignItems: 'flex-start', justifyContent: 'center', paddingVertical: 10,}}>
              						<TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                						<Icon name="arrow-back" style={{paddingLeft: 15, paddingRight: 25, color: '#fff'}} size={35} />
              						</TouchableOpacity>
            					</View>
            					<View style={{flex: 1, paddingHorizontal: 16,}}>
            						<View style={{marginVertical: 5,}}>
            							{loading ? <Spinner color="blue" /> : <Text style={{color: '#000000', fontSize: 16, textAlign: 'center', }}>{message}</Text>}
            						</View>
	            					<View style={{padding: 0,}}>
	            						<Text style={{textAlign: 'center', fontSize: 18, fontStyle: 'italic', color: '#fff', paddingTop: 7,}}>A code has been sent to your mobile number for verification.</Text>
                						<TextInput keyboardType="numeric" maxLength={6} onChangeText={code => this.setState({ code })} autoFocus placeholder="Enter verification code" style={{textAlign: 'center', fontSize: 16, height: 40, color: '#fff', borderBottomColor: '#2581bc', borderBottomWidth: 2, marginVertical: 7}}/>
	            					</View>

	            					<View style={{marginBottom: 10, marginTop: 20,}}>
							        	<TouchableOpacity onPress={()=> this.verify()} style={{backgroundColor: '#fff', borderRadius: 7,}}>
							        		<Text style={{textAlign: 'center', paddingVertical: 14, fontSize: 16, color: '#2581bc', }}>Continue</Text>
							        	</TouchableOpacity>
							        </View>

	            				</View>	
            				</KeyboardAwareScrollView>	
            			</ScrollView>
            		</View>	
				</View>	
			</ImageBackground>
		);	
	}		
}
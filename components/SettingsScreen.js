import React, {Component} from 'react';
import {Platform, AsyncStorage, Dimensions, YellowBox, ImageBackground, Button, Alert, ScrollView, StyleSheet, Share, Text, Modal, View, StatusBar, Picker, TextInput, Image, TouchableHighlight, TouchableOpacity, Linking} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon, Spinner, Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import ImagePicker from 'react-native-image-picker';

let {height, width} = Dimensions.get('window');

export default class SettingsScreen extends Component{

	constructor(props) {
    	super(props);
    	this.state = {
    		myheight: height,
	      	compname: '',
		    compemail: '',
		    compadd: '',
		    city: '',
		    country: '',
		    comptel: '',
		    curr: '',
		    filePath: {},
		    pic: '',
      		picTwo: '',
      		localimageuri: null,
      		localsignuri: null
    	};
  	}

  	componentDidMount(){
  		AsyncStorage.getItem("@key_comp").then((r)=>{
  			var retrieveduserData = JSON.parse(r)
		    this.setState({compname: retrieveduserData.compname}),
		    this.setState({compemail: retrieveduserData.compemail}),
		    this.setState({compadd: retrieveduserData.compadd}),
		    this.setState({city: retrieveduserData.city}),
		    this.setState({country: retrieveduserData.country}),
	     	this.setState({comptel: retrieveduserData.comptel}),
	     	this.setState({curr: retrieveduserData.curr}),
		    this.setState({pic: retrieveduserData.pic}),
		    this.setState({localimageuri: retrieveduserData.localimageuri}),
		    this.setState({picTwo: retrieveduserData.picTwo}),
		    this.setState({localsignuri: retrieveduserData.localsignuri})
    	}) 
  	}
  	
  	_storeData = async () => {
      	var clientData = {
	        compname: this.state.compname,
	        compemail: this.state.compemail,
	        compadd: this.state.compadd,
	        city: this.state.city,
	        country: this.state.country,
	        comptel: this.state.comptel,
	        curr: this.state.curr,
	        pic: this.state.pic,
	        localimageuri: this.state.localimageuri,
	        picTwo: this.state.picTwo,
	        localsignuri: this.state.localsignuri    
	      }
      	if (this.state.compname != '' && this.state.compemail != '' && this.state.compadd != '' && this.state.comptel != ''  ) {
        	try {
          	await AsyncStorage.setItem('@key_comp', JSON.stringify(clientData));
          		this.props.navigation.navigate('Dashboard')
        	}catch (error) {
          		Alert.alert("Saving Information", error);
       		}
      	}
      	else{
      		Alert.alert('Missing Fields', 'Please fill in all the required fields');
    	}  
  	}

  	_signImage = async () => {
  		var options = {
      		title: 'Select Image',
      		customButtons: [
        		{ name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      		],
      		storageOptions: {
        		skipBackup: true,
        		path: 'images',
      		},
    	};
      	
      	ImagePicker.showImagePicker(options, response => {
        	
        	if (response.didCancel) {
        		console.log('User cancelled image picker');
      		} else if (response.error) {
        		console.log('ImagePicker Error: ', response.error);
      		} else if (response.customButton) {
        		console.log('User tapped custom button: ', response.customButton);
      		} else {
      			let pic = response;
        		this.setState({ picTwo: pic.data, localsignuri: pic.uri });
      		}
    	});
    };

    _pickImage = async () => {
  		var options = {
      		title: 'Select Image',
      		customButtons: [
        		{ name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      		],
      		storageOptions: {
        		skipBackup: true,
        		path: 'images',
      		},
    	};
      	
      	ImagePicker.showImagePicker(options, response => {
        	
        	if (response.didCancel) {
        		console.log('User cancelled image picker');
      		} else if (response.error) {
        		console.log('ImagePicker Error: ', response.error);
      		} else if (response.customButton) {
        		console.log('User tapped custom button: ', response.customButton);
      		} else {
      			let result = response;
        		this.setState({ pic: result.data, localimageuri: result.uri });
      		}
    	});
    };

  	

  	render() {
    	let {myheight} = this.state
    	let mypadding = Math.floor(myheight/23)
    	let myheader = Math.floor(myheight/10)
		
		//alert(myheader);
		return(
			<ImageBackground source={require('../assets/salesassistantbackground.jpeg')} style={{flex: 1,}}>
				<View style={{flex: 1,}}>
					<View>
						<StatusBar barStyle = "light-content" hidden = {false} backgroundColor={'#2581bc'} translucent = {false}/>
					</View>
				
					<View style={{flex: 1,}}>
						<View style={{width: '100%', height: myheader, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5}}>
							<View style={{flex: 1, flexDirection: 'row',}}>
								<View style={{flex: 1, justifyContent: 'center', alignItems: 'center',  }}>
									<Text style={{textAlign: 'center', color: '#000000', fontSize: 23, fontWeight: '500', }}>User Settings</Text>
								</View>
							</View>
						</View>

						<ScrollView style={{flex: 1, paddingTop: 10,}}>
            				<KeyboardAwareScrollView style={{flex: 1,}}>
            					<View style={{flex: 1, paddingHorizontal: 16, paddingVertical: 10,}}>

            						<View style={{flexDirection: 'row', marginVertical: 14,}}>
	                					<View style={{flex: 1,}}>
	                						<View style={{height: 120, marginRight: 10, borderWidth: 2, borderColor: '#fff', }}>
	                							<ImageBackground source={{uri: 'data:image/jpeg;base64,' + this.state.pic}} style={{flex: 1, resize: 'cover', }}>
	                								<View style={{flex: 1, height: 120, justifyContent: 'center', alignItems: 'center',}}>
	                									<TouchableOpacity onPress={this._pickImage.bind(this)} style={{backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center', height: 60, width: 60, borderRadius: 60,}}>
	                										<Text style={{color: '#fff', textAlign: 'center' }}>Upload</Text>
	                									</TouchableOpacity>
	                								</View>
	                							</ImageBackground>	
	                						</View>
	                						<Text style={{textAlign: 'center', color: '#fff', fontSize: 16,}}>Logo</Text>
	                					</View>

	                					<View style={{flex: 1,}}>
	                						<View style={{height: 120, marginLeft: 10, borderWidth: 2, borderColor: '#fff', }}>
	                							<ImageBackground source={{uri: 'data:image/jpeg;base64,' + this.state.picTwo}} style={{flex: 1, resize: 'cover', }}>
	                								<View style={{flex: 1, height: 120, justifyContent: 'center', alignItems: 'center',}}>
	                									<TouchableOpacity onPress={this._signImage.bind(this)} style={{backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center', height: 60, width: 60, borderRadius: 60,}}>
	                										<Text style={{color: '#fff', textAlign: 'center' }}>Upload</Text>
	                									</TouchableOpacity>
	                								</View>
	                							</ImageBackground>	
	                						</View>
	                						<Text style={{textAlign: 'center', color: '#fff', fontSize: 16,}}>Signature</Text>
	                					</View>
	                				</View>	 


            						<TextInput placeholder="Company Name**" style={styles.input} onChangeText={(compname)=>this.setState({compname})} returnKeyType='next'>{this.state.compname}</TextInput>
						            <TextInput placeholder="Company Email**" style={styles.input} onChangeText={(compemail)=>this.setState({compemail})} autoCapitalize='false' keyboardType='email-address' returnKeyType='next'>{this.state.compemail}</TextInput>
						            <TextInput placeholder="Building, Plot, Street" style={styles.input} onChangeText={(compadd)=>this.setState({compadd})} returnKeyType='next'>{this.state.compadd}</TextInput>
						            <TextInput placeholder="City/Town" style={styles.input} onChangeText={(city)=>this.setState({city})} returnKeyType='next'>{this.state.city}</TextInput>
						            <TextInput placeholder="Country**" style={styles.input} onChangeText={(country)=>this.setState({country})} returnKeyType='next'>{this.state.country}</TextInput>
						            <TextInput placeholder="Company Tel**" style={styles.input} onChangeText={(comptel)=>this.setState({comptel})} autoCapitalize='false' keyboardType='phone-pad'  returnKeyType='done'>{this.state.comptel}</TextInput>
						            <TextInput placeholder="Currency(eg shs,$)" style={styles.input} onChangeText={(curr)=>this.setState({curr})} autoCapitalize='false' returnKeyType='done'>{this.state.curr}</TextInput>
						            {/*<Picker
						            	selectedValue={this.state.language}
									  	style={[{height: 50, width: 100, color: '#000'}, styles.pickerinput]}
									  	onValueChange={(itemValue, itemIndex) =>
									    	this.setState({language: itemValue})
									  	}>
									  	<Picker.Item label="Java" value="java" />
									  	<Picker.Item label="JavaScript" value="js" />
									</Picker>*/}

            					</View>
            				</KeyboardAwareScrollView>	
            			</ScrollView>
            			<View>
	            			<TouchableOpacity onPress={() => this._storeData()} style={{backgroundColor: '#fff',}}>
	              				<Text style={{textAlign: 'center', fontSize: 16, color: '#2581bc', paddingVertical: 10, paddingHorizontal: 70,}}>Done</Text>
	            			</TouchableOpacity>
	          			</View>
            		</View>	
				</View>	
			</ImageBackground>
		);	
	}		
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 15,
    color: '#2a2a2a',
    borderRadius: 4, 
    paddingHorizontal: 7,
  },
  pickerinput: {
    height: 40,
    //backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 15,
    color: '#2a2a2a',
    borderRadius: 4, 
    paddingHorizontal: 7,
  },
});

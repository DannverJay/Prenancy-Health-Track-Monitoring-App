import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image } from 'react-native';


import { setStorage, getStorage } from '../helper/storage';
import { UserApi } from '../api/user';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    error: false
  }
  
  constructor() {
    super();
    this.init();
}

async init() {
	let user = await getStorage('user');
	if (user) {
	   this.props.navigation.navigate('Home');
	}
}

async login() {
	this.setState({ error: false });
	let [res,  err] = await UserApi.login(this.state.email, this.state.password);
	if (err) {
	   this.setState({ error: true });
	}
	
	if (res) {
	  await setStorage('user', res);
	  this.props.navigation.navigate('Home');
	}
}

render() {
  return (
    <View style={style.container}>
      {this.state.error ?
        <View style={style.errorMessage}><Text style={style.errorTxt}>Invalid Credentials</Text></View>
	:null}

	<Image style={style.logo} source={require('../assets/TechTalk-logos.jpeg')} />
	<TextInput placeholder="Email" style={style.input} autoCompleteType="email" onChangeText={email => this.setState({email})}/>
	<TextInput placeholder="Password" style={style.input} secureTextEntry={true} onChangeText={password => this.setState({password})}/>
	<TouchableOpacity style={style.login} onPress={() => this.login()}>
	  <Text style={style.loginTxt}>Log in</Text>
	</TouchableOpacity>


	  <Text style={style.signupTxt}>
	    {"Don't have an account?"}
	  </Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
        <Text style={style.signUp}>Sign Up</Text></TouchableOpacity>
     </View>
   );
 }
}

const style = {
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  errorMessage: {
    backgroundColor: '#f8d7da',
    width: '100%',
    padding: 10,
    textAlign: 'center'
  },
  errorTxt: {
    textAlign: 'center',
    color: '#721c24',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 70,
    resizeMode: 'contain',
  },
  input: {
    margin: 5,
    height: 40,
    width: '80%',
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: '#fa8072',
    borderWidth: 2,
    borderRadius: 15
  },
  login: {
    backgroundColor: '#fa8072',
    padding: 10,
    width: '80%',
    borderRadius: 15,
    marginTop: 10,
  },
  loginTxt: {
    color: '#ffffff',
    textAlign: 'center'
  },
  signUp: {
    bottom: 0,
    width: '100%',
    color: '#ffa500',
    borderColor: '#e0e0e0',
    borderTopWidth: 1,
    paddingTop: 10,
    alignItems: 'center'
  },
  singUpTxt: {
    color: '#fa8072',
    textAlign: 'center'
  },
  singUpLink: {
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center'
  }
}
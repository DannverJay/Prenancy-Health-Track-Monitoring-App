import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import Constants from 'expo-constants';

import { setStorage, getStorage } from '../helper/storage';
import { UserApi } from '../api/user';

export default class Register extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    error: false,
  };

  async register() {
    this.setState({ error: false });
    let [res, err] = await UserApi.register(
      this.state.firstname,
      this.state.lastname,
      this.state.email,
      this.state.password
    );
    if (err) {
      this.setState({ error: true });
    }

    if (res) {
      await setStorage('user', res);
      this.props.navigation.navigate('Login');
    }
  }

  render() {
    return (
      <View style={style.container}>
        <Image style={style.logo} source={require('../assets/TechTalk-logos.jpeg')} />
        <TextInput
          placeholder="Firstname"
          style={style.textInput}
          autoCompleteType="firstname"
          onChangeText={(firstname) => this.setState({ firstname })}
        />
        <TextInput
          placeholder="Lastname"
          style={style.textInput}
          autoCompleteType="lastname"
          onChangeText={(lastname) => this.setState({ lastname })}
        />
        <TextInput
          placeholder="Email"
          style={style.textInput}
          autoCompleteType="email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="Password"
          style={style.textInput}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <TouchableOpacity
          style={style.registerButton}
          onPress={() => this.register()}>
          <Text style={style.registerText}>Register</Text>
        </TouchableOpacity>


        <View style={style.signUp}>
	        <Text style={style.signupTxt}>
            {"Already have account?"}
	        </Text>
	        <View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={style.signUp}>Login</Text></TouchableOpacity>
          </View>
        </View>
      </View>
      
    );
  }
}

const style = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 70,
    resizeMode: 'contain',
  },
  textInput: {
    margin: 5,
    height: 40,
    width: '80%',
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: '#fa8072',
    borderWidth: 2,
    borderRadius: 15
  },
  registerButton: {
    backgroundColor: '#fa8072',
    padding: 10,
    width: '80%',
    borderRadius: 15,
    marginTop: 10,
  },
  registerText: {
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
};

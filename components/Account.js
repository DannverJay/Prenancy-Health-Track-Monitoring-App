import React, { Component } from 'react';
import { Text, View, Button, Image, TouchableOpacity } from 'react-native';

import { setStorage, getStorage } from '../helper/storage';

import Constants from "expo-constants";

export default class Account extends Component {

  state = {
    user: null
  };

  async componentDidMount() {
    this.loadUser();
  }

  async loadUser() {
    let user = await getStorage('user');
    if (user) {
      this.setState({ user });
    }
  }

  async logout() {
    await setStorage('user', null);
    this.props.navigation.navigate('Login');
  }


  render() {
    let user = this.state.user;
    let name = user ? `${user.firstname} ${user.lastname}` : '';
    let email = user ? user.email : '';
    return (
      <View style={style.container}>
        <View style={style.profile}>
          <Image style={style.profileImg} source={require('../assets/Profile-pic.png')} />
        </View>

        <View  style={style.info}>
          <View style={style.infoLine}>
            <Text style={style.left}>Name</Text>
            <Text style={style.right}>{ name }</Text>
          </View>

          <View style={style.infoLine}>
            <Text style={style.left}>Email</Text>
            <Text style={style.right}>{ email }</Text>
          </View>

        </View>

        <TouchableOpacity style={style.logout} onPress={() => this.logout()}>
          <Text style={style.logoutTxt}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const style = {
  container: {
    flex: 1, 
    alignItems: 'center',
    padding: 20,
    paddingTop: Constants.statusBarHeight,
  },
  profile: {
    marginTop: 10
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  info: {
    width: '100%',
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  infoLine: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  left: {
    flex: 1,
    color: '#000',
    marginBottom: 10,
  },
  right: {
    flex: 2,
    color: '#000',
  },
  logout: {
    marginTop: 50,
    height: 40,
    width: 120,
    paddingTop: 10,
    backgroundColor: '#dc3545',
    borderRadius: 5,
  },
  logoutTxt: {
    textAlign: 'center',
    color: '#fff'
  }
}
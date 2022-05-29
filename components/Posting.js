import React, { Component } from 'react';
import { View, TouchableOpacity, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { EventRegister } from 'react-native-event-listeners'

import { setStorage, getStorage } from '../helper/storage';

import { PostApi } from '../api/post';

export default class CreatePost extends Component {
  state={
    post: '',
    user: null,
    error: false
  }

  async componentDidMount() {
    this.loadUser();
  }

  async loadUser() {
    let user = await getStorage('user');
    if (user) {
      this.setState({ user });
    }
  }

  async post() {
    this.setState({ error: false });
    let [res, err] = await PostApi.makePost(this.state.post);
    if (err) {
      this.setState({ error: true });
    }

    if (res) {
      this.setState({ post: ""}, () => {
        this.props.navigation.navigate('Posts');
        EventRegister.emit('makePost', 'done');
      });
    }
  }

  render() {
    let user = this.state.user;
    let name = user ? `${user.firstname} ${user.lastname}` : '';
    let email = user ? user.email : '';
    
    return(
       <View style={style.container}>   
        <TextInput
          style={style.postingInput}
          value={this.state.post}
          placeholder="What's on your mind?"
          onChangeText={ (post) => {this.setState({post})}}
        />

        <TouchableOpacity
          style={style.postingButton}
          onPress={( () => { this.post();} )} >
          <Text style={style.buttonText}> Post </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const style = {
  container: {
    alignItems: 'center',
    paddingTop: 50,
  },
  postingInput: {
    height: 75,
    padding: 20,
    margin: 15,
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: '#e0ffff'
  },
    text: {
    fontSize: 20
  },
  postingButton: { 
    backgroundColor: '#fa8072',
    padding: 10,
    width: '15%',
    borderRadius: 15,
  },
  buttonText: {
    color: 'white'
  }
}

import React, { Component } from 'react';
import { Text, View, Button, ScrollView, Image } from 'react-native';

import { PostApi } from '../api/post';

import Constants from "expo-constants";

export default class Post extends Component {
  state = {
    posts: []
  }

  async componentDidMount() {
    this.loadPosts();
  }

  async loadPosts() {
    let [posts, err] = await PostApi.posts();
    if (posts) {
      this.setState({ posts });
    }
  }

  render() {
    return (
      <View style={style.container}>
        <View style={style.header}>
          <Image style={style.logo} source={require('../assets/TechTalk-logos.jpeg')}/>
        </View>
        <ScrollView style={style.content}>
          {this.state.posts.map((post) => {
            let user = post.user || null;
            let name = user ? `${user.firstname} ${user.lastname}` : '-------';
            return (
              <View style={style.post}>
                <View style={style.postHead}>
                  <Image style={style.profile} source={require('../assets/Profile.jpg')} />
                  <Text style={style.name}>{name}</Text>
                </View>
                <Text style={style.postText}>{post.post}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const style = {
  container: {
    backgroundColor:'white',
    paddingTop: 50
  },
  header: {
    backgroundColor: 'white',
    width: '100%'
  },
  post: {
    width: '100%',
    padding: 15,
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  },
  content: {
    width: '100%',
  },
  logo: {
    left: 80, 
    height: 50,
    resizeMode: 'contain'
  },
  profile: {
    width: 20,
    height: 20
  },
  name: {
    paddingTop: 5
  },
  postHead: {
    flexDirection: 'row'
  },
  postText: {
    marginTop: 10,
    marginLeft: 40
  },
}
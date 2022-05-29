import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Account from '../components/Account';
import Post from '../components/Post';
import Posting from '../components/Posting';

const Tab = createBottomTabNavigator();

export default class Home extends Component {
  render() {
    return (
      <Tab.Navigator 
        initialRouteName="Post"
        screenOptions={
          ({ route }) => ({ 
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Post') {
              return (
                <Ionicons name='ios-home' size="12" color={color}/>
              );
            } else if (route.name === 'Account') {
              return (
                <Ionicons name='md-person' size="12" color={color} />
              );
            }
          },
          headerShown: false
        })}
        tabBarOptions={{
          activeTintColor: '#4868af',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Post" component={Post} />
        <Tab.Screen name="Posting" component={Posting} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
    );
  }
}
import React, {Component} from 'react';

import {
    ActivityIndicator,
    StatusBar,
    View,
  } from 'react-native';

  import AsyncStorage from '@react-native-community/async-storage';
  
  export default class AppLoading extends Component {
    constructor(props) {
      super(props);
      this._bootstrapAsync();
    }
  
  
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
     
  
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    
    };
  
    // Render any loading content that you like here
    render() {
      return (
        <View style={{flex:1, justifyContent:"center"}}>
          <ActivityIndicator size="large" color="#20383a" />
          <StatusBar backgroundColor="#20383a" barStyle="light-content" />
        </View>
      );
    }
  }
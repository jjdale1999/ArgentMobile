import React, {Component} from 'react';


import {Text,Header, Left, Right} from 'native-base';
import Icon from './Icon';
import {TouchableHighlight, AsyncStorage} from 'react-native';

export default class HeaderComponent extends Component {
  logoutUser = () => {
    AsyncStorage.clear();
    this.props.navigation.navigate('Auth')
  }
  render(){
    return(
        <Header style={{backgroundColor: "#20383a"}}>
          <Left>
            <Icon size={25} style={{color: "#fff"}} name='menu' />
          </Left>
          <Right>
            <TouchableHighlight onPress={this.logoutUser}> 
              <Text style={{fontFamily:"Montserrat-SemiBold",color: "#fff", textDecorationLine: 'underline'}}>Logout</Text>
            </TouchableHighlight>
            
            
          </Right>
        </Header>
    )
  }
}


import React, {Component} from 'react'
import { Footer, View, FooterTab, Text, Button } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from './Icon';
import { Grid, Col } from 'react-native-easy-grid';

 export default class FooterComponent extends Component{
   constructor(props){
     super(props);
     this.goTo = this.goTo.bind(this);
   }
   
  logoutUser = () => {
    AsyncStorage.clear();
    this.props.navigation.navigate('Auth')
  }
  goTo = () => {
    this.props.navigation.navigate('Scan')
  }

   render(){
    
    return (
      <Footer>
      <FooterTab style={{backgroundColor:"#20383a"}}>
        <Button vertical onPress={() => this.navigation.navigate('Home')}>
          <Icon size={25} color="#fff" name="home" />
          <Text style={{fontFamily:"Montserrat-SemiBold", fontSize:10, color:"#FFF"}}>Home</Text>
        </Button>
        <Button vertical onPress={() => this.props.navigation.navigate('Scan')}>
          <Icon size={25} color="#fff" name="qr-scanner" />
          <Text style={{fontFamily:"Montserrat-SemiBold", fontSize:10, color:"#FFF"}}>Scan</Text>
        </Button>
        <Button vertical onPress={this.logoutUser}>
          <Icon size={25} color="#fff" name="log-out" />
          <Text style={{fontFamily:"Montserrat-SemiBold", fontSize:10, color:"#FFF"}}>Logout</Text>
        </Button>
      </FooterTab>
      </Footer>
    ) 
  }
 }


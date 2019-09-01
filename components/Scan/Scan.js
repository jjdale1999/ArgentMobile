import React, {Component, Fragment} from 'react';
import {RNCamera} from 'react-native-camera';
import HeaderComponent from '../HeaderComponent';
import FooterComponent from '../FooterComponent';
import { Text, Alert } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import Modal from 'react-native-modal';
import { Card, CardItem, Body, Item, Input, Button } from 'native-base';
import Icon from '../Icon';
import AsyncStorage from '@react-native-community/async-storage';
export default class Scan extends Component{
    static navigationOptions = {
        headerStyle: {
          backgroundColor: "#20383a",
        },
        headerTintColor:"#fff"
      };
    
    state = {
        modalVisible: false,
        camera:{
            type: RNCamera.Constants.Type.back,
            flashMode: RNCamera.Constants.FlashMode.auto
        },
        amount: null,
        URL:  ""
    }
    backDropAction = () => this.setState({modalVisible: !this.state.modalVisible})
    barcodeRecognized = (barcode) => {
        const URL = barcode.data;
       if(URL.includes('argent-api')){
        this.setState({URL})
       
        this.setState({modalVisible:true})
       
       }else{
           Alert.alert(
               'Unrecognized barcode',
               'Please ensure that the barcode being scanned is registered with Argent',
               [{text: "OK"}]
           )
       }
        
    }

    submitAttendance = async() =>{
        const params = new URLSearchParams();
         
            params.append('first_name', await AsyncStorage.getItem('fname') )
            params.append('last_name', await AsyncStorage.getItem('lname'))
            params.append('amount', this.state.amount)
            const strAmt = await AsyncStorage.getItem('amount');
            const oldAmt = parseInt(strAmt);
            const newAmt = oldAmt + parseInt(this.state.amount);
            AsyncStorage.setItem('amount',newAmt.toString())
            params.append('date', moment().format('DD/MM/YYYY'))
        
         axios.post(this.state.URL, params)
         Alert.alert(
             'Atendance taken!',
             `You have contributed $${this.state.amount}. Press refresh button to see update`,
             [{
                 text: "OK", onPress: () => {
                     this.setState({modalVisible:false})
                     this.props.navigation.navigate('Home')
                 }
             }]
         )
    }
    

    render(){
        return(
            <Fragment>
                    <RNCamera
                    style={{width: '100%', flex: 1}}
                    ref={ref => {this.camera=ref}}
                    onBarCodeRead={this.barcodeRecognized}
                
                    />
                    <Modal 
                    avoidKeyboard 
                    isVisible={this.state.modalVisible}
                    onBackdropPress={this.backDropAction}
                    >  
                        <Card>
                            <CardItem header>
                                <Text style={{fontFamily:"Montserrat-SemiBold"}}>Enter the amount you are contributing</Text>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Item>
                                        <Input style={{fontFamily:"SourceSansPro-Regular"}} onChangeText={text => this.setState({amount: text})} placeholder="Amount" keyboardType="numeric" />
                                    </Item>
                                    <Button onPress={this.submitAttendance} style={{backgroundColor:"#20383a", marginLeft:"auto",marginTop:20, marginRight:"auto", width: "100%",textAlign: "center"}} primary>

                                        <Text style={{fontSize:13,marginLeft:"auto",marginRight:"auto",fontFamily:"Montserrat-SemiBold", color:"#fff"}}>SUBMIT</Text>
                                    </Button>
                                </Body>
                            </CardItem>
                        </Card>  
                    </Modal>           
            </Fragment>
                
        )
    }
}
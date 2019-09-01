import React, {Component, Fragment} from 'react';
import { Content, Card, View, Button, Fab, Body, CardItem, Item, Input } from 'native-base';
import {Text, Dimensions, Alert} from 'react-native';
import Modal from 'react-native-modal';
import FooterComponent from './../FooterComponent';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from '../Icon';
import axios from 'axios';
import validator from 'validator';


const style = {
  container: {
    paddingLeft:15,
    paddingRight:15

  },
  card: {
    shadowColor: "rgba(0,0,0, .4)",
    shadowOffset: {height: 1, width: 1},
    shadowRadius:1,
    elevation:4,
    borderRadius:6 ,
    margin:10,
    padding: 20, 
    backgroundColor: "#5dbcd2"
  },
  icon: {
    marginLeft:"auto",
    marginTop:"auto"
  },
  circle: {
    width:Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width *0.5, 
    borderRadius:Math.round(Dimensions.get('window').width + Dimensions.get('window').height)/2,
    marginLeft:"auto",
    marginRight:"auto",
    borderWidth:5,
    marginTop:10,
    borderColor:"#20383a",
    }
}
export default class Home extends Component{
  constructor(props){
    super(props);
   
  }
  componentDidMount(){
    this._getDataAsync();
  }

  _getDataAsync = async () => {
    this.setState(
      {
        year: await AsyncStorage.getItem('year'),
        degree: await AsyncStorage.getItem('degree') ,
        sig : await AsyncStorage.getItem('sig'),
        name: await AsyncStorage.getItem('name'),
        amount: await AsyncStorage.getItem('amount')
        
    })


  }
  

                 
  state = {
    active: false,
    sig:'',
    degree:'',
    year:''
    
  }

  
  
  static navigationOptions = {
    header:null
  };

  updateDetails = async () =>{
    this.setState({amount: await AsyncStorage.getItem('amount')})
    this.props.navigation.navigate('Home');
  }

  close = () =>{
    this.setState({active: false})
  }

  saveChanges = async () =>{
     const params = new URLSearchParams();
     const fname = await AsyncStorage.getItem('fname');
     const lname = await AsyncStorage.getItem('lname')
      params.append('first_name',fname );
      params.append('last_name', lname);
      params.append('sig', this.state.sig==""? await AsyncStorage.getItem('sig'):this.state.sig);
      params.append('degree', this.state.degree,this.state.degree==""? await AsyncStorage.getItem('degree'):this.state.sig);
      params.append('year', this.state.year,this.state.year==""? await AsyncStorage.getItem('year'):this.state.sig)
      this.setState({active:false})
      axios.post('https://argent-api.herokuapp.com/auth/change', params)
      .then(() => {
        Alert.alert('Change successful!','Changes were made and profile is now updated',[{
          text:"Ok"
        }])
      })
      .catch(err => {
        Alert.alert('Error','Check your internet connection and try again',[{
          text:"Ok"
        }])
      })
  }

     
    
  

    render(){
      state = {
        active: false
      }
     
        return(
          <Fragment>
            <Content stlye={style.container}>
            <Modal 
                    avoidKeyboard 
                    isVisible={this.state.active}
                    >  
                        <Card>
                            <CardItem header>
                              <Text>My Details</Text>
                                <Icon onPress={this.close} size={25} style={{marginLeft: "auto"}} name="close" color="#000" />
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Item>
                                        <Input style={{fontFamily:"SourceSansPro-Regular"}} onChangeText={text => this.setState({degree: text})} placeholder="Change SIG"  />
                                    </Item>
                                    <Item>
                                        <Input style={{fontFamily:"SourceSansPro-Regular"}} onChangeText={text => this.setState({sig: text})} placeholder="Change Degree"  />
                                    </Item>
                                    <Item>
                                        <Input style={{fontFamily:"SourceSansPro-Regular"}} onChangeText={text => this.setState({year: text})} placeholder="Change Year" keyboardType="numeric" />
                                    </Item>
                                    <Button onPress={this.saveChanges} style={{backgroundColor:"#20383a", marginLeft:"auto",marginTop:20, marginRight:"auto", width: "100%",textAlign: "center"}} primary>

                                        <Text style={{fontSize:13,marginLeft:"auto",marginRight:"auto",fontFamily:"Montserrat-SemiBold", color:"#fff"}}>SAVE CHANGES</Text>
                                    </Button>
                                </Body>
                            </CardItem>
                        </Card>  
                    </Modal>       
                <View style={{padding:20,}}>
                  <View size={1} style={style.circle}>
                    <Text style={{
                      color: "#20383a", 
                      fontSize:40, 
                      padding:10,
                      fontFamily:"Montserrat-SemiBold",
                      fontWeight:"100",
                      marginLeft:"auto",
                      marginRight:"auto",
                      marginTop:"auto", 
                      marginBottom:"auto"}}>${this.state.amount}</Text>
                  </View>
                  </View>
                  <View style={{ marginLeft:"auto",marginRight:"auto"}}>
                    <Card style={style.card}>
                        <Text style={{marginTop:30,fontSize:28, color:"#fff",fontFamily:"Montserrat-Bold",fontWeight:"100"}}>{this.state.name}</Text>
                      
                          <Text style={{marginTop:10,fontSize:16, color:"#fff",fontFamily:"SourceSansPro-Light",fontWeight:"100"}}>{this.state.degree}</Text>
                        <Text style={{marginTop:10,fontSize:16, color:"#fff",fontFamily:"SourceSansPro-Light",fontWeight:"100"}}>{this.state.sig}</Text>
                        <Text style={{marginTop: 10, fontSize:16, color:"#fff",fontFamily:"SourceSansPro-Light",fontWeight:"100"}}>{this.state.year}</Text>
                    </Card>
                    <Button onPress={this.updateDetails} iconLeft style={{marginLeft:"auto", marginRight:"auto",padding:20,marginTop:10, backgroundColor:"#20383a", width:'75%'}}>
                      <Text style={{color:"#fff", fontFamily:"Montserrat-SemiBold"}}>Refresh</Text>
                    </Button>
                  </View>
                  <View style={{marginTop:40}}>
                  <Fab
                      style={{ backgroundColor: '#5dbcd2', marginTop:20 }}
                      position="bottomRight"
                      onPress={() => this.setState({ active: !this.state.active })}>
                      <Icon name="create" />
                    </Fab>
                    </View>  
            </Content>
            
            <FooterComponent navigation={this.props.navigation} />
            </Fragment>
        )
    }
}
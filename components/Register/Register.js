import React, {Component} from 'react';
import {Link} from 'react-router-native';
import {Alert} from 'react-native';

import axios from 'axios';
import validator from 'validator';
import {
  Text,
  Container,
  Button,
  Form, 
  Icon,
  Item, 
  Input, 
  Content,
  Card,
  CardItem,
  Body,
  View
} from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native-gesture-handler';

const style ={
  signup:{
    fontFamily:"Montserrat-SemiBold",
    fontWeight: "300",
    color: '#fff',
    marginLeft: "auto", 
    marginRight: "auto",
    marginBottom: "auto",
    marginTop: "auto",
   
  },
  icon:{
    color:"#fff",
    fontSize:30,
  },
  

  login:{
    color: '#fff',
    fontSize:13,
    fontFamily:"Montserrat-Regular",
    marginTop: "auto",
    marginBottom:"auto",
    opacity: 0.6,
    marginLeft: "auto", 
    marginRight: "auto"
  },
  loginmod:{
      marginLeft: "auto",
      marginTop:20,
      fontFamily:"Montserrat-Bold",
      borderRadius: 2
  },
  input: {
    fontFamily:"Montserrat-Regular",
     opacity: 0.7, 
     fontSize: 13,
     color: "#fff"
  },
  error:{
    borderBottomColor:"#D8000C"
  },
  title: {
    fontSize: 36,
    color: "#fff",
    opacity: 0.5,
    fontFamily: "SourceSansPro-Light",
    fontWeight:"thin",
    marginBottom: 5,
    fontWeight: "200",
    marginLeft: "auto",
    marginRight: "auto",

  },
  picker:{
     color: "#fff",
     opacity: 0.7,
    transform: [
      {scaleX: 0.9},
      {scaleY: 0.9}
    ],
  }

}

class Register extends Component{

  state = {
    text: '',
    fname: '',
    lname:'',
    username: '',
    password:'',
    confirm: '',
    uniqueName:true,
    validPassword:true,
    visible: false
  }
  //Methods
  isValidUsername = () => {
    const params = new URLSearchParams();
    params.append('username', this.state.username);
    axios.post('https://argent-api.herokuapp.com/auth/isUsername', params)
    .then(res => res.data?this.setState({uniqueName: false}):this.setState({uniqueName: true}) )
  }
  isValidPassword = () =>{
    validator.isLength(this.state.password,{min:6,max:20})? this.setState({validPassword:true}):this.setState({validPassword:false})
  }
      

  
  stopMod = () => {
    this.setState({visible: !this.state.visible})
    this.props.navigation.navigate('Login');
  }

  isEmptyInput = () =>{
    if(validator.isEmpty(this.state.fname)|| validator.isEmpty(this.state.lname)||validator.isEmpty(this.state.username)|| validator.isEmpty(this.state.password)|| validator.isEmpty(this.state.confirm)){
      return true;
  }else{return false}}
  onSubmitData = (e) => {
    if(this.state.uniqueName === false){
     e.preventDefault();
     Alert.alert(
      'Username Taken!',
      'Sorry this username is already taken, choose another',
      [
        {
          text: "Ok"
        }
      ]
    ) 
    }if(this.state.validPassword === false){
      Alert.alert(
        'Incorrect password format',
        'Password is too short please add more characters!',
        [
          {
            text: "Ok"
          }
        ]
      ) 
    }
    else if(validator.equals(this.state.password,this.state.confirm) && this.isEmptyInput() === false){
      const params = new URLSearchParams();
      params.append('first_name',this.state.fname)
      params.append('last_name',this.state.lname)
      params.append('username',this.state.username)
      params.append('password',this.state.password)

      axios.post('https://argent-api.herokuapp.com/auth/register', params)
      this.setState({
        fname: '',
        lname:'',
        username: '',
        password:'',
        confirm: ''
      })
      this.setState({visible: !this.state.visible})
    }
    else{
      Alert.alert(
        'Error',
        'Passwords do not match and/or field is left empty',
        [{
          text: 'Ok'
        }]
      )
    }
  }
  
  render(){
    return(
      <Container>
        <Modal onBackButtonPress={this.stopMod} isVisible={this.state.visible}>
          <Card>
            <CardItem header>
              <Text style={{fontFamily:"Montserrat-SemiBold"}}>Account Created!</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={{fontFamily:"SourceSansPro-Regular"}}>Your account has been created.  Go ahead and login</Text>
                <Text onPress={ this.stopMod} style={[style.loginmod,{color:"#20383a", fontFamily:"Montserrat-SemiBold", marginTop:20}]}>Login</Text>
              </Body>
            </CardItem>
          </Card>
        </Modal>
        <Content style={{paddingRight: 20, paddingLeft: 20, paddingTop: 15, backgroundColor:"#34465c"}}>
        <Text style={style.title}>Sign Up</Text>  
        <Form>
          <Item  style={{margin: 5}}>
            <Input onChangeText={text=>this.setState({fname:text})}  placeholderTextColor="#fff" style={style.input} 
            value={this.state.fname}
            placeholder='First Name' />
          </Item>
          <Item  style={{margin: 5}}>
            <Input onChangeText={text=>this.setState({lname:text})} placeholderTextColor="#fff" style={style.input} placeholder='Last Name' value={this.state.lname} />
          </Item>
          <Item  style={[{margin: 5},  this.state.uniqueName === false?style.error:null]}>
            <Input onChangeText={text => this.setState({username:text}, this.isValidUsername)}  placeholderTextColor="#fff" style={style.input} placeholder='Username' value={this.state.username} />  
          </Item>
          {this.state.uniqueName === false?
            (
            <Text style={{fontFamily:"Montserrat-Regular", fontSize:12, marginLeft:15, color: "#D8000C"}}>Username already taken</Text>
            )
          :(<View />)}
          <Item   style={[{margin: 5},this.state.validPassword === false?style.error:null]}>
            <Input onChangeText={text=>{this.setState({password:text}); this.isValidPassword()}}  placeholderTextColor="#fff" secureTextEntry style={style.input} placeholder='Password' value={this.state.password} />
          </Item>
          {this.state.validPassword === false?
            (
            <Text style={{fontFamily:"Montserrat-Regular", fontSize:12, marginLeft:15, color: "#D8000C"}}>Password needs to be at least 6 characters</Text>
            )
          :(<View />)}
          <Item   style={{margin: 5}}>
            <Input onChangeText={text=>this.setState({confirm:text})}  placeholderTextColor="#fff" secureTextEntry style={style.input} placeholder='Confirm Password' value={this.state.confirm}/>
          </Item>
        </Form>
        <Grid>
            <Row style={{marginTop:20}} size={100}>
              <Button onPress={(e) =>{this.isEmptyInput;this.onSubmitData(e);}} style={{backgroundColor:"#5dbcd2", marginLeft:"auto",marginTop:20, marginRight:"auto", width: "90%",textAlign: "center"}} primary>
                <Text style={style.signup}> Register</Text>
              </Button>
            </Row>
          </Grid>
          {/* <Grid>
            <Row size={100}>
              <Button iconLeft style={{backgroundColor:"#385998", marginLeft:"auto",marginTop:20, marginRight:"auto", width: "90%",textAlign: "center"}} primary>
                  <Icon style={style.icon} name="logo-facebook"/>
                  <Text style={{marginRight:"auto",marginLeft:"auto",fontFamily:"Montserrat-SemiBold", color:"#fff"}}>SIGN UP WITH FACEBOOK</Text>
                </Button>
            </Row>
          </Grid>
          <Grid>
            <Row size={100}>
              <Button iconLeft style={{backgroundColor:"#db4437", marginLeft:"auto",marginTop:20, marginRight:"auto", width: "90%",textAlign: "center"}} primary>
                  <Icon style={style.icon} name="logo-google" />
                  <Text style={{marginRight:"auto",marginLeft:"auto",fontFamily:"Montserrat-SemiBold", color:"#fff"}}>SIGN UP WITH GOOGLE</Text>
                </Button>
            </Row>
          </Grid> */}

          <Col style={{marginTop:20}} size={50}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={{marginTop:"auto"}}>
                 <Text style={style.login}>Already a member </Text>
              </TouchableOpacity>    
            </Col>
        </Content>
      </Container>
      )
    }
}

export default Register;
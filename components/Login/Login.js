import React,{Component} from 'react';
import validator from 'validator';
import axios from 'axios';
import {StyleSheet, Image, Alert} from 'react-native';
import { Container, Icon, Content, Form, Item, Input, Button, Text} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';


const style = StyleSheet.create({
    
    iconFacebook: {
        fontSize: 30,
        borderRadius:2,
        color:"#fff",
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop:"auto",
        marginBottom:"auto",

    },
    iconGoogle:{
        fontSize: 30,
        borderRadius:2,
        color:"#fff",
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop:"auto",
        marginBottom:"auto"
        
    },
    login: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: 15,
        paddingRight: 15
    },
    img:{
    
        marginTop: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        width:"100%",
        borderColor:"#fff",
        height: 10,
        padding: 32,
        marginBottom: "auto"
    },
    btn:{
        backgroundColor:"#20383a",
        marginTop: 30,
        marginBottom: 10,
        width: '100%',
        marginLeft: "auto",
        marginRight: "auto"
       
    },
    regBtn: {
        padding: 20,
        height: 45,
        borderColor: "#fff",
        width: '100%',
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom:"auto",
        marginTop:20,
    
    },

    btnText:{
        color: "#fff",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "auto",
        marginTop: "auto",
        fontSize:13,
        fontFamily:"Montserrat-SemiBold"
    },
    
    input:{
        marginTop: 40,
        marginBottom:40,
    },
    inputText:{
        fontFamily:"Montserrat-Regular",
        fontSize:13,
        color:"#fff",
    },
    error:{
        borderBottomColor:"#D8000C"
    },
})
export default class Login extends Component{
    static navigationOptions ={
        header: null
    }
    state= {
        notVisible: true,
        inputUsername: "",
        inputPassword:"",
        wrongVal: false,
        user: null
    }
    changeVisibility = () => {
        this.setState({
            notVisible: !this.state.notVisible
        })
    }

    tryLogin =  () => {
            const params = new URLSearchParams();
            params.append('username', this.state.inputUsername);
            params.append('password', this.state.inputPassword);

            axios.post('https://argent-api.herokuapp.com/auth/login',params)
            .then(async res => {
                if(res.data.passwordValidation) {
                    AsyncStorage.setItem('userToken', res.data.token)
                    AsyncStorage.setItem('name', res.data.user.first_name +" "+ res.data.user.last_name)
                    AsyncStorage.setItem('sig', res.data.user.sig)
                    AsyncStorage.setItem('degree', res.data.user.degree)
                    AsyncStorage.setItem('year', res.data.user.year.toString())
                    AsyncStorage.setItem('fname', res.data.user.first_name);
                    AsyncStorage.setItem('lname', res.data.user.last_name)
                    const amount = res.data.user.amount;
                    AsyncStorage.setItem('amount', amount.toString())
                    this.props.navigation.navigate('Home');
                }else{
                    console.warn(res.status)
                }
            })
            .catch(err => {
                Alert.alert('Incorrect Cedentials!',
                'Username or Password is incorrect',[
                    {
                        text:"Try Again"
                    }
                ])
            })

        }
        finalLogin = () => {
            if(validator.isEmpty(this.state.inputUsername) || validator.isEmpty(this.state.inputPassword)){
                this.setState({wrongVal: !this.state.wrongVal})
                Alert.alert('Error', 'Ensure that fields are not empty',
                [
                    {
                        text:"Ok"
                    }
                ]
             )
            }else{
                this.setState({wrongVal: false})
                // this.tryLogin = this.tryLogin.bind(this)
                this.tryLogin()
            }
        }
    render(){
        return(
            <Container> 
            <LinearGradient 
            style={{flex:1 ,paddingLeft: 15, paddingRight: 15}}
            start={{x:1, y:0}} 
            end={{x:0, y:1}} 
            colors={["#5dbcd2", "#20383a"]}>
                <Content style={style.login}>
                <Image
                style={style.img}
                resizeMode="cover"
                source={require('./../../img/app-logo.png')} />
            
                    <Form>
                        <Item style={[{marginLeft:0,marginTop:40},this.state.wrongVal?style.error:{}]}>
                        <Input 
                        style={style.inputText}
                            placeholder="Username"
                            placeholderTextColor="#FFF" 
                            onChangeText={text => this.setState({inputUsername:text})}
                            value={this.state.inputUsername}  /> 
                        </Item>
                        <Item style={[{marginLeft:0,marginTop:20, marginBottom: 40},this.state.wrongVal?style.error:{}]}> 
                            <Input 
                            style={style.inputText}
                                placeholder="Password"
                                placeholderTextColor="#FFF" 
                                secureTextEntry={this.state.notVisible} 
                                onChangeText={text => this.setState({inputPassword:text})}
                                value={this.state.inputPassword} /> 
                            <Icon onPress={this.changeVisibility} size={25} style={{marginRight: 15}}  name={this.state.notVisible?"eye-off":"eye"} />
                        </Item>
                        <Button onPress={this.finalLogin} style={style.btn}>
                            <Text allowFontScaling={true} style={style.btnText}>LOGIN</Text>
                        </Button>
                        {/* <Grid>
                            <Col>
                            <View style={{
                                borderBottomColor:"#fff",
                                borderBottomWidth:1,
                                marginTop:"auto",
                                marginBottom:"auto"
                            }}
                            /> 
                            </Col>
                            <Col>
                                <Text style={{fontSize:13,marginTop:10,marginBottom:10,marginLeft:"auto",  marginRight:"auto",color:"#fff", fontFamily:"Montserrat-Regular"}}>OR</Text>
                            </Col>
                            <Col>
                            <View style={{
                                borderBottomColor:"#fff",
                                borderBottomWidth:1,
                                marginTop:"auto",
                                marginBottom:"auto"
                            }}
                            />  
                            </Col>
                        </Grid> */}
                        
                        {/* <Grid style={{marginTop:10, marginBottom: 10}}>
                            <Col on style={{elevation: 3,backgroundColor:"#3c5a99", width:100, height:"auto",marginLeft:"auto", marginRight:"auto"}}>
                                <Icon style={style.iconFacebook} name="logo-facebook"/>
                            </Col>
                            <Col style={{elevation: 3,backgroundColor:"#db4437", width:100, marginLeft:"auto", marginRight:"auto"}}>
                                <Icon style={style.iconGoogle} name="logo-google" />
                            </Col>
                        </Grid>         */}
                        <Button bordered onPress={() => this.props.navigation.navigate('Register')} style={style.regBtn}><Text allowFontScaling={false} style={style.btnText}>SIGN UP</Text></Button>
                    </Form>
                </Content>

            </LinearGradient>
            </Container>
        )
    }
}
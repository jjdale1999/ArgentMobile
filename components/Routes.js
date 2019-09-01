import Home from './Home/Home';
import Scan from './Scan/Scan';
import Register from './Register/Register'
import Login from './Login/Login';
import { 
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer, 
    } from 'react-navigation';
import AppLoading from './AppLoading';
import FooterComponent from './FooterComponent';




const AppStack = createStackNavigator({
    Home: Home,
    Scan: Scan,  
})
const AuthStack = createStackNavigator({Login: Login})


const AppContainer = createAppContainer(createSwitchNavigator(
   {
       AuthLoading:AppLoading,
       App: AppStack,
       Auth: AuthStack,
       Register:Register
   },
   {
       initialRouteName:"AuthLoading"
   }
));


module.exports = {
    AppContainer
}
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Basic from './app/components/identity/Basic';
import Login from './app/components/identity/Login';
import Register from './app/components/identity/Register';


import Home from './app/components/home/Home';
import FireBase from './app/components/identity/FireBase';


const RootStack = StackNavigator(
    {
        Basic: {
            screen: Basic,
        },
        FireBase: {
            screen: FireBase,
        },
        Login: {
            Name: 'Login',
            screen: Login,
        },
        Home:{
            screen: Home,
        },
        Register:{
            screen:Register,
        }
    },
    {
        initialRouteName: 'Basic',
    }


);
AppRegistry.registerComponent('arefinfirebase', () => RootStack);

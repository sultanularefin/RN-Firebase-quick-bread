import React, { Component } from 'react';
import { Dimensions, Platform,Button, Text, View  } from 'react-native';

import { Icon2} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import React from 'react';

// import { Ionicons } from '@expo/vector-icons';
import {
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator} from 'react-navigation';
// import Bookcase from './screens/Bookcase';
// import Explore from './screens/Explore';
// import AddBook from './screens/AddBook';
// import Lists from './screens/Lists';
// import Profile from './screens/Profile';
// import EditBook from './screens/EditBook';

let screen = Dimensions.get('window');

const myIcon = (<Icon name="rocket" size={30} color="#900" />)


const myButton = (
    <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
        Login with Facebook
    </Icon.Button>
);

const customTextButton = (
    <Icon.Button name="facebook" backgroundColor="#3b5998">
        <Text style={{fontFamily: 'Arial', fontSize: 15}}>Login with Facebook</Text>
    </Icon.Button>
);

function ExampleView(props) {
    return (<Text>Lorem <Icon name="ios-book" color="#4F8EF7" /> Ipsum</Text>);
}

/*
export const Tabs = createBottomTabNavigator({
    'Bookcase': {
        screen: Bookcase,
        navigationOptions: {
            tabBarLabel: 'Bookcase',
            tabBarIcon: ({ tintColor }) => <Icon name="open-book" type="entypo" size={28} color={tintColor} />
        },
    },
    'Explore': {
        screen: Explore,
        navigationOptions: {
            tabBarLabel: 'Explore',
            tabBarIcon: ({ tintColor }) => <Icon name="ios-map-outline" type="ionicon" size={28} color={tintColor} />
        },
    },
    'Add Book': {
        screen: AddBook,
        navigationOptions: {
            tabBarLabel: 'Add Book',
            tabBarIcon: ({ tintColor }) => <Icon name="ios-add-circle-outline" type="ionicon" size={28} color={tintColor} />
        },
    },
    'Lists': {
        screen: Lists,
        navigationOptions: {
            tabBarLabel: 'Lists',
            tabBarIcon: ({ tintColor }) => <Icon name="list" type="entypo" size={28} color={tintColor} />
        },
    },
    'My Profile': {
        screen: Profile,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor }) => <Icon name="ios-person-outline" type="ionicon" size={28} color={tintColor} />
        },
    },
});



export const BookcaseStack = createStackNavigator({
    Bookcase: {
        screen: Bookcase,
        navigationOptions: ({navigation}) => ({
            header: null,
        }),
    },
    EditBook: {
        screen: EditBook,
        navigationOptions: ({navigation}) => ({
            header: null,
            tabBarVisible: false,
            gesturesEnabled: false
        }),
    },
});



// export const createRootNavigator = () => {

const AppNavigator = createStackNavigator(
    // return createStackNavigator(
        {
            BookcaseStack: {
                screen: BookcaseStack,
                navigationOptions: {
                    gesturesEnabled: false
                }
            },
            Tabs: {
                screen: Tabs,
                navigationOptions: {
                    gesturesEnabled: false
                }
            }
        },
        {
            headerMode: "none",
            mode: "modal"
        }
    );
// };

export default createAppContainer(AppNavigator);

*/



class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
                <Button
                    title="Go to Settings"
                    onPress={() => this.props.navigation.navigate('Settings')}
                />
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
            </View>
        );
    }
}

class SettingsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Settings!</Text>
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
            </View>
        );
    }
}

class DetailsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Details!</Text>
            </View>
        );
    }
}

const HomeStack = createStackNavigator({
    Home: { screen: HomeScreen },
    Details: { screen: DetailsScreen },
});

const SettingsStack = createStackNavigator({
    Settings: { screen: SettingsScreen },
    Details: { screen: DetailsScreen },
});

export default createAppContainer(createBottomTabNavigator(
    {
        Home: { screen: HomeStack },
        Settings: { screen: SettingsStack },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                } else if (routeName === 'Settings') {
                    iconName = `ios-options${focused ? '' : '-outline'}`;
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }
));


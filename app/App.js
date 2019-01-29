


import React, { Component } from 'react';
import { Dimensions, Platform } from 'react-native';
import { StackNavigator, TabNavigator,TabBarBottom } from 'react-navigation';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import Bookcase from './screens/Bookcase';
import Explore from './screens/Explore';
import AddBook from './screens/AddBook';
import Lists1 from './screens/Lists1';
import Profile from './screens/Profile';


let screen = Dimensions.get('window');

export default TabNavigator ({
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
            // tabBarIcon: ({ tintColor }) => <Icon name="ios-map-outline" type="ionicon" size={28} color={tintColor} />
            tabBarIcon: ({ tintColor }) => <Icon name="map-outline" type="ionicon" size={28} color={tintColor} />
        },
    },
    'Add Book': {
        screen: AddBook,
        navigationOptions: {
            tabBarLabel: 'Add Book',
            tabBarIcon: ({ tintColor }) => <Icon name="ios-add-circle-outline" type="ionicon" size={28} color={tintColor} />
        },
    },
    'Lists1': {
        // screen: ReadingListStack,
        screen: Lists1,
        navigationOptions: {
            tabBarLabel: 'ReadingListStack',
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

export const createRootNavigator = () => {
    return StackNavigator(
        {
            Tabs: {
                screen: TabNavigator,
                navigationOptions: {
                    // gesturesEnabled: false,

                    // R-Navigation 1.0 ;
                    // Whether you can use gestures to dismiss
                    // this screen. Defaults to true on iOS,
                    // false on Android.
                    // tabBarPosition: 'bottom',
                    // animationEnabled: false,
                    // swipeEnabled: false,

                    tabBarComponent: TabBarBottom,
                    tabBarPosition: 'bottom',
                    tabBarOptions: {
                        activeTintColor: 'deeppink',
                        inactiveTintColor: 'brown',
                    },
                    animationEnabled: false,
                    swipeEnabled: false,
                }
            }
        },
    );
};
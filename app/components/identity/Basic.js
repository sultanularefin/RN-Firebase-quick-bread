import React, { Component } from 'react';
import {
    View,
    Image,
    AsyncStorage,
    ActivityIndicator, Dimensions, Platform, Text, StyleSheet
} from 'react-native';


import { NavigationActions } from 'react-navigation';

import PropTypes from "prop-types";
import ExtraDimensions from "react-native-extra-dimensions-android";
import Snackbar from "react-native-snackbar";


export default class Basic extends Component {
    constructor(props) {
        super(props);
        this.unsubscriber = null;
        this.state = {
            user: null,
        };

    }

    static navigationOptions = {
        header: null,
        drawerLockMode: 'locked-closed',
    };

    componentDidMount() {


        this.checkUserSignedIn();


    }

    async checkUserSignedIn() {
        console.log('checking signin status [checkUserSignedIn]...... [in Basic Screen]');
        let context = this;
        try {
            let value = await AsyncStorage.getItem('user');
            console.log("value: [in Basic] ", value);

            console.log("this.state: [in Basic] : ", this.state);


            // if (this.state.openning) return;
            if (value != null) {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({
                        routeName: 'Home',
                        From_Login_Screen: false,
                    })],
                });
                this.props.navigation.dispatch(resetAction);
            }

            else
            {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({routeName: 'Login'})],
                });
                this.props.navigation.dispatch(resetAction);
            }
        }
        catch(error)
        {

            Snackbar.show({
                title: 'Something went wrong and not handled gracefully.',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'blue',
            });

        }
    }

    render()
    {

        const deviceWidth = Dimensions.get("window").width;
        const deviceHeight = Platform.OS === "ios"
            ? Dimensions.get("window").height
            : ExtraDimensions.get("REAL_WINDOW_HEIGHT");

        return (

            <View style={styles.container}>
                <Image
                    source={require('../../../sunrise-logo.jpg')}
                    style={styles.image} />
                <Text style={styles.text}>R N Firebase</Text>

                <View style={{position: 'absolute',
                    bottom: 150,
                    marginLeft: deviceWidth *0.5 - 20,}}>


                    <ActivityIndicator
                        size="large"
                        color="blue"
                    />

                </View>
            </View>
        );
    }

}

Basic.propTypes = {
    navigation:PropTypes.object,
};
Basic.defaultProps = {

};


const styles = StyleSheet.create({
    container: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 80,
        height: 80,
    },
    text: {
        color: 'crimson',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        marginTop: 20,
    },
});

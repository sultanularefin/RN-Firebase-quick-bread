import React, { Component } from 'react';
import {

    View,

    Text,
    TouchableOpacity,
    Dimensions,
    Platform,
    BackHandler

} from 'react-native';
import {
    Container,

} from "native-base";
import PropTypes from "prop-types";

import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import ExtraDimensions from "react-native-extra-dimensions-android";

export default class Register extends Component {


    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    }

    onBackButtonPressAndroid = () => {

        //let a=true;

        console.log("onBackButtonPressAndroid");
        return this.props.navigation.navigate('Login');
    };


    render() {

        const deviceWidth = Dimensions.get("window").width;
        const deviceHeight = Platform.OS === "ios"
            ? Dimensions.get("window").height
            : ExtraDimensions.get("REAL_WINDOW_HEIGHT");
        console.log("Arefin you are in home:");


        console.log(this.props.navigation);




        return (
            <Container style={{backgroundColor: 'white'}}>

                <KeyboardAwareScrollView>

                    <View>
                        <View style={{flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignContent: 'center',}}
                              key={'fwerwerwertqewrtqwerArefin'}>

                            <Text>Not implemented, please click the hardware back button to navigate to Login Screen</Text>
                        </View>

                    </View>

                    <View style={{justifyContent: 'center',flex:1,
                        marginBottom: 15,
                        marginTop: 30,
                    }}>
                        <TouchableOpacity
                            onPress={this.onBackButtonPressAndroid.bind(this)}>
                            <View style={{ height: 40,
                                backgroundColor: '#fa5656',
                                alignItems: 'center',
                                width:deviceWidth,
                                flexDirection:'column',
                            }}>
                                <Text style={{ color: 'white',
                                    fontSize: 20, fontWeight: 'bold',
                                    padding: 5,
                                }}>
                                    Go Back!
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                </KeyboardAwareScrollView>

            </Container>

        );

    }
}


Register.propTypes = {

    navigation:PropTypes.object,
};
Register.defaultProps = {

};
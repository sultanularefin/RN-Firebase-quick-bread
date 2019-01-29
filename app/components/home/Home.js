import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Platform,
} from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';

import {
    Container,
    Card,
    CardItem,
} from "native-base";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Snackbar from "react-native-snackbar";
import PropTypes from "prop-types";
// import Login from "../identity/Login";
import firebase from "react-native-firebase";

class Home extends Component {


    componentDidMount(){

    }
    componentWillUnmount() {
        // NetInfo.isConnected.removeEventListener('connectionChange', this.handleFirstConnectivityChange);
        // OneSignal.removeEventListener('ids', this.onIds);
    }
    flushMe(){

        console.log("AT flushMe ");

        let signingOutResult = firebase.auth().signOut();

        console.log("signingOutResult: ",signingOutResult);



        signingOutResult.then(
            result =>{
                console.log("result: ",result);
                return this.props.navigation.navigate("Login");
            },
            error => {

                console.log("error: ",error);

                Snackbar.show({
                    title: 'Signout unsuccessful.',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: 'blue',
                });

            }
        );
    }
    render() {

        const deviceWidth = Dimensions.get("window").width;
        const deviceHeight = Platform.OS === "ios"
            ? Dimensions.get("window").height
            : ExtraDimensions.get("REAL_WINDOW_HEIGHT");
        console.log("Arefin you are in home:");


        const People = [
            {
                id: 1,
                name: 'Md. Sultanul Arefin',
                profession: 'Software Development Engineer',
            },
            {
                id: 2,
                name: 'Abraham Lincoln',
                profession: 'U.S. statesman and lawyer',
            },
            {
                id: 3,
                name: 'Sir Isaac Newton',
                profession: 'mathematician, physicist, astronomer, theologian,' +
                    ' and author. ',
            },

        ];

        let HomeCards = [];


        People.map((onePerson, index) => {

                HomeCards[index] = (


                    <Card key={onePerson.id} id={onePerson.id} style={{
                        paddingTop: '-2%',
                        paddingBottom: '-2%'
                    }}>

                        <CardItem>

                            <View style={{
                                flex: 1,
                                flexDirection: 'column'
                            }}>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}
                                >
                                    <View>
                                        <Text
                                            style={{fontWeight: 'bold'}}
                                        >
                                            {onePerson.name}
                                        </Text>
                                    </View>

                                </View>

                                <View style={{flexDirection: 'row', padding: 4}}>
                                    <Text>
                                        Profession:
                                    </Text>
                                    <Text style={{fontWeight: 'bold', paddingLeft: 4}}>
                                        {onePerson.profession}
                                    </Text>
                                </View>


                            </View>
                        </CardItem>


                    </Card>
                );
            }
        );


        const { params } = this.props.navigation.state;

        let autheticatedUser = params ? params.autheticatedUser : null;

        if(autheticatedUser) {

            Snackbar.show({
                title: 'Welcome ' + autheticatedUser + ', to our Home',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'orange',

            });
        }
        return (
            <Container style={{backgroundColor: 'white'}}>
                {/*<Header headerText={'Bills'} navigation={this.props.navigation}/>*/}

                <KeyboardAwareScrollView>

                    <View>{HomeCards}</View>

                    <View style={{justifyContent: 'center',flex:1,
                        marginBottom: 15,
                        marginTop: 30,
                    }}>
                        <TouchableOpacity
                            onPress={this.flushMe.bind(this)}>
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
                                    SignOut!
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </KeyboardAwareScrollView>

            </Container>

        );



    }
    // else{
    //
    //     return (
    //
    //
    //         <Container style={{backgroundColor: 'white'}}>
    //             {/*<Header headerText={'Bills'} navigation={this.props.navigation}/>*/}
    //
    //             <KeyboardAwareScrollView>
    //
    //                 <View>{HomeCards}</View>
    //             </KeyboardAwareScrollView>
    //
    //         </Container>
    //
    //     );
    //
    //
    // }


    // }

}

export default Home;

Home.propTypes = {

    navigation:PropTypes.object,
};
Home.defaultProps = {

};

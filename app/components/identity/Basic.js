import React, { Component } from 'react';
import {
  View,
  Image,
  ActivityIndicator, Dimensions, Platform, Text, StyleSheet
} from 'react-native';

import { NavigationActions } from 'react-navigation';

import PropTypes from "prop-types";

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

    // --------------IMP --------------
    //code for asyncStorage user data handling
    // else{ below codes}
    console.log('checking status ...... [in Basic Screen]');

    // const {navigate} = this.props.navigation;
    const navigateAction = NavigationActions.navigate({
      routeName: 'Login',
      params: {},
      action: NavigationActions.navigate({ routeName: 'Login' }),
    });

    setTimeout(() => {
      this.props.navigation.dispatch(navigateAction);
    }, 200);

  }


  render() {
    const deviceWidth = Dimensions.get("window").width;
    return (
      <View style={styles.container}>
        <Image
          source={require('../../../sunrise-logo.jpg')}
          style={styles.image} />
        <Text style={styles.text}>R N ARefin </Text>

        <View style={{position: 'absolute',
          bottom: 200,
          marginLeft: deviceWidth *0.5 - 20,}}>

          <ActivityIndicator size="large" color="#00FF65" />
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

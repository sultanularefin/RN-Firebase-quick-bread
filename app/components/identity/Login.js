import React, {Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ToastAndroid,
  AsyncStorage,
  TextInput,

  ActivityIndicator,
  TouchableOpacity,
  NetInfo
} from "react-native";
import OfflineNoticeLogin from "../general/OfflineNoticeLogin";
import Snackbar from 'react-native-snackbar';
import {NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Icon,
} from 'native-base';

import firebase from 'react-native-firebase';


export default class Login extends Component {

  constructor(props) {
    super(props);
    this.handleFirstConnectivityChange=this.handleFirstConnectivityChange.bind(this);
    this.state = {
      email: null,
      password: null,
      loading: false,
      // playerId: null,
      connectionStatus: true,
      phone:null,
    };
  }
  handleFirstConnectivityChange(connectionInfo){

    console.log("i am at handleFirstConnectivityChange! line #: (111)");
    const currentTime = new Date();
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log("What is inside connectionInfo",connectionInfo);

    });
    console.log('Change occurred at '+currentTime.toLocaleTimeString()+ ' this time, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    console.log("NetInfo.isConnected.fetch()",NetInfo.isConnected.fetch());

    console.log("NetInfo.isConnected",NetInfo.isConnected);
    NetInfo.isConnected.fetch().then(isConnected => {
      console.log("____isConnected____: ",isConnected);

      this.setState({
        connectionStatus: isConnected
      });
    });

    NetInfo.removeEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange
    );
  }

  // componentDidUpdate(prevProps, prevState, snapshot){
  //     console.log("At componentDidUpdate: ");
  //
  //     console.log("this.state.connectionStatus: ",this.state.connectionStatus);
  //
  //     if (this.state.connectionStatus !== prevState.connectionStatus) {
  //         console.log("connectoin Status changed! ");
  //     }
  //     NetInfo.addEventListener(
  //         'connectionChange',
  //         this.handleFirstConnectivityChange
  //     );
  // }


  componentDidMount() {

    console.log("At componentDidMount() ");
    NetInfo.isConnected.fetch().then(isConnected => {
      console.log('First,connection is: ' + (isConnected ? 'online' : 'offline'));
      if(!isConnected){
        this.setState({
          connectionStatus: isConnected
        });

      }

    });


    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log("connectionInfo is ",connectionInfo);
      console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    });

    NetInfo.isConnectionExpensive()
      .then(isConnectionExpensive => {
        console.log('Connection is ' + (isConnectionExpensive ? 'Expensive' : 'Not Expensive'));
      })
      .catch(error => {
        console.error(error);
      });

    // console.log("I am at line 154, only events are executed (when internet is off),
    // when rendered again (i.e. reload then every" +
    //   "thing will be shown");
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange
    );

  }

  static navigationOptions = {
    header: null,
    drawerLockMode: 'locked-closed',
  };

  openDrawer() {
    this.props.navigation.navigate('DrawerOpen'); // open drawer
  }



  UNSAFE_componentWillMount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleFirstConnectivityChange);
  }

  componentWillUnmount() {
    // console.log("At componentWillUnmount() of Profile");
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleFirstConnectivityChange);
  }





  validate_Email(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  validate_Password(password)
  {
    if( !password || !typeof(password) || password === "" || password.length===0  || !isNaN(password))
      return null;

    return true;
  }

  validate_phone(phone)
  {
    if( !phone || !typeof(phone) || phone === "" || phone.length===0 ) {
      return null;
    }

    let standard_phoneNumber = /\+?(88)?0?1[56789][0-9]{8}\b/g;

    if (phone.match(standard_phoneNumber)) {
      return true;
    } else {
      return null;
    }
  }

  handleLogin() {


    let data = {
      email: this.state.email,
      Password: this.state.password,
      phone: this.state.email,
    };
    let validate_Email = true;
    let validate_password = true;
    // let validate_phone = true;

    let validation_resultOfPhone = null;

    console.log("data: ", data);

    console.log("this.validate_Email(data.email): ", this.validate_Email(data.email));

    if (this.validate_Email(data.email) === false) {
      validate_Email = null;

      validation_resultOfPhone
        = this.validate_phone(data.phone);

      if ((validate_Email === null) && (this.validate_phone(data.phone) === null)) {

        ToastAndroid.show(
          'Sorry, email || phone number(11 digits) format is incorrect.',
          ToastAndroid.SHORT,
        );
        return;
      }


    }
    if (this.validate_Password(data.Password === null)) {
      validate_password = null;
      ToastAndroid.show(
        'password format is incorrect',
        ToastAndroid.SHORT,
      );
      return;
    }

    // if (this.validate_Phone(data.Phone === null)) {
    //   validate_phone = null;
    //   ToastAndroid.show(
    //     'password format is incorrect',
    //     ToastAndroid.SHORT,
    //   );
    //   return;
    // }

    const { navigate } = this.props.navigation;
    NetInfo.isConnected.fetch().then(isConnected => {
      console.log("____isConnected____: ", isConnected);

      if (!isConnected) {
        Snackbar.show({
          title: 'You Are offline!',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'orange',
        });
        navigate('Login');
      }

    });
    // this.setState({
    //     loading: true,
    // });
    console.log(
      'login button pressed...  ' +
      data.email +
      '  ' +
      data.password,
    );

    // navigate('LoginScreen');

    // firebase.auth.nativeModuleExists

    console.log("validate_Email: ", validate_Email);
    console.log("validate_password: ", validate_password);


    if (((validate_Email === null) || (validation_resultOfPhone === null)) && (validate_password === null)) {
      return;
    }


    if ((validate_Email) === true) {

      let UserCredential = firebase.auth().signInWithEmailAndPassword(data.email, data.Password);


      UserCredential.then(
        result => {
          console.log("result: ", result);
          let useremail = result.user.email;


          return this.props.navigation.navigate("Home", { autheticatedUser: useremail });


        },
        error => {
          console.log("error: ", error);

          Snackbar.show({
            title: 'Promise rejected, check credentials.',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: 'orange',
          });
          return navigate('Login');

        }
      );


    }

    // validation_resultOfPhone
    // validate with phone
    else{

      const NotImplemented=()=> (<Text>Not Implemented, please try with email and return
        password , Thanks</Text>);

      return NotImplemented;

      // let UserCredential = firebase.auth().signInWithEmailAndPassword(data.email, data.Password);
      //
      //
      // UserCredential.then(
      //   result => {
      //     console.log("result: ", result);
      //     let useremail = result.user.email;
      //
      //
      //     return this.props.navigation.navigate("Home", { autheticatedUser: useremail });
      //
      //
      //   },
      //   error => {
      //
      //     console.log("error: ", error);
      //
      //
      //     Snackbar.show({
      //       title: 'Promise rejected, check credentials.',
      //       duration: Snackbar.LENGTH_LONG,
      //       backgroundColor: 'orange',
      //     });
      //     return navigate('Login');
      //
      //   }
      // );


    }

  }



handleRegister(){

  console.log("handleRegister() at Login Class");
  const resetAction = NavigationActions.reset({
    index: 1,
    actions: [
      NavigationActions.navigate({
        routeName: 'Login'
      }),
      NavigationActions.navigate({
        routeName: 'Register'
      })],
  });
  this.props.navigation.dispatch(resetAction);
}

render() {

  if (this.state.loading) {
    return (
      <View style={[style2.container01_for_login_only]} key={'sasas1251231234123rArefin'}>
        <ActivityIndicator
          size="large"
          color="#da6a41"
        />
      </View>
    );
  }

  else if (this.state.connectionStatus!==true) {
    return (
      <Container>
        <Content>

          <View style={{justifyContent: 'center',
            alignItems: 'center',}}>
            <Image
              style={{
                width: 100,
                height: 100,
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginTop: 40,
              }}
              source={require('../../../sunrise-logo.jpg')}
            />
          </View>
          <Form>

            <Label>Email </Label>
            <TextInput
              onChangeText={email => this.setState({email:email})}
              autoCorrect={false}
              textContentType={'emailAddress'}
              autoCapitalize={'none'}
              keyboardType={'email-address'}
              returnKeyType={"next"}
              ref="Email"
              onSubmitEditing={() => {

                this.refs.Password.focus();
              }
              }

              blurOnSubmit


            />
            <Label>Password</Label>
            <TextInput
              secureTextEntry
              textContentType={'password'}
              onChangeText={password => this.setState({password})}

              ref="Password"
              blurOnSubmit
              returnKeyType={"done"}
              onSubmitEditing={() => {
                this.refs.Password.blur();
                this.handleLogin.bind(this);
              }
              }
            />

          </Form>
          <Button block success
                  onPress={() => {
                    this.refs.Password.blur();
                    this.handleLogin.bind(this);
                  }
                  }>
            <Text style={{
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: 15,
              margin: 10,
            }}>Login</Text>
          </Button>

          <View style={{
            alignItems: 'center', marginTop: 20,
            marginBottom: 10, marginRight: 10
          }}>
            <TouchableOpacity onPress={this.handleRegister.bind(this)}
            >
              <View style={style2.buttonBillsList}>
                <Text
                  style={{fontSize: 16, color: '#fa5656', fontWeight: 'bold',
                    padding: 5}}>
                  Don't have an account please register!
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <OfflineNoticeLogin/>
        </Content>
      </Container>
    );
  }
  else {
    return (
      <Container>
        <Content>


          <View style={styles.container}>
            <Image
              source={require('../../../sunrise-logo.jpg')}
              style={styles.image} />
            <Text style={styles.text}>REACT NATIVE</Text>
          </View>

          {/*<View style={{justifyContent: 'center',*/}
          {/*alignItems: 'center',}}>*/}
          {/*<Image*/}
          {/*style={{*/}
          {/*width: 100,*/}
          {/*height: 100,*/}
          {/*justifyContent: 'center',*/}
          {/*alignItems: 'flex-start',*/}
          {/*marginTop: 40,*/}
          {/*}}*/}

          {/*/>*/}
          {/*</View>*/}
          <Form>
            <Item floatingLabel>
              <Label>Email or phone Number (11 digits)</Label>
              <Input
                onChangeText={email => this.setState({email})}
                autoCorrect={false}
                textContentType={'emailAddress'}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
                returnKeyType={"next"}

                onSubmitEditing={() =>{
                  this.Password._root.focus();
                }
                }
                getRef={(c) => this.Email = c}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                secureTextEntry
                textContentType={'password'}
                onChangeText={password => this.setState({ password })}
                getRef={(c) => this.Password = c}
                onSubmitEditing={() => {

                  this.handleLogin.bind(this);
                }
                }
                blurOnSubmit
                returnKeyLabel={ "done" }
              />
            </Item>
          </Form>
          <Button block success onPress={this.handleLogin.bind(this)}>
            <Text style={{ color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: 15,
              margin: 10,}}>Login</Text>
          </Button>

          <View style={{ alignItems: 'center', marginTop: 20,
            marginBottom: 10, marginRight: 10 }}>
            <TouchableOpacity onPress={this.handleRegister.bind(this)}
            >
              <View style={style2.buttonBillsList}>
                <Text
                  style={{ fontSize: 16, color: '#fa5656', fontWeight: 'bold', padding: 5 }}>
                  Don\'t have an account please register!
                </Text>
              </View>
            </TouchableOpacity>
          </View>

        </Content>
      </Container>
    );
  }
}
}


const style2 = StyleSheet.create({

  container01_for_login_only: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonBillsList:{
    backgroundColor: "white",
    alignItems:'center',
    borderRadius: 5,
    borderColor:'#fa5656',
    borderWidth:0.5,

  },

});


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
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 20,
  },
});


Login.propTypes = {

  navigation:PropTypes.object,
};
Login.defaultProps = {

};

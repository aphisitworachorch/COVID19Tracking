import React, { Component } from 'react';
import firebase from 'firebase';
import { Image, StyleSheet, View, AsyncStorage, ActivityIndicator, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

class CheckLogin extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.disableYellowBox = true
    const config = {
        apiKey: "AIzaSyBw1Eq5cgPHZY2dyTnWghSyGmD0fdQ_7d0",
        authDomain: "covid19detector-e590e.firebaseapp.com",
        databaseURL: "https://covid19detector-e590e.firebaseio.com",
        projectId: "covid19detector-e590e",
        storageBucket: "covid19detector-e590e.appspot.com",
        messagingSenderId: "380806971238",
        appId: "1:380806971238:web:2d02c69dfef84b2d7c92a7",
        measurementId: "G-67PM71LX2C"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const { currentUser } = firebase.auth();
          try {
           AsyncStorage.setItem('uid:key', currentUser.uid);
           Actions.tabbar({type: 'reset'});
          } catch (error) {
            console.log(error);
          }
        } else {
          Actions.login({type: 'reset'});

        }
      });
    }

  render() {
    return (
      <View style={styles.spinnerStyle}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CheckLogin;
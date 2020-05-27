import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = { 
      uid: ''
    }
  }

  signOut = () => {
    auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }  

  render() {
    this.state = { 
      displayName: auth().currentUser.displayName,
      uid: auth().currentUser.uid
    }   

    
    return (
      <View style={styles.container}>
        <Text style = {styles.textStyle}>
          ยินดีต้อนรับสู่หน้าหลัก, {this.state.displayName}
        </Text>

        <Button
          color="#51DCA8"
          title="ออกจากระบบ"
          onPress={() => this.signOut()}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  }
});
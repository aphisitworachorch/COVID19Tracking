import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Alert, AppRegistry, StyleSheet, View ,Text,TextInput, Image, TouchableOpacity, Modal, ActivityIndicator} from 'react-native';
import firebase from 'firebase';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '',error: '', modalVisible: false };
  }

  componentDidMount() {}

  goMenu(){
    this.setModalVisible(false);
    Actions.tabbar({type: 'reset'});
  }

  onLogin(){
      this.setModalVisible(true);
      const { email, password } = this.state;
      this.setState({ error: '' });
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.goMenu.bind(this))
      .catch((signInError) => {
          this.setModalVisible(false);
          Alert.alert('ไม่ถูกต้อง');
        });
    }

  
  render() {
    return (
     <View style={styles.container}>
         <View >
           <Image
             source={require('../../images/logo.png') }
             style={styles.imageIcon}
           />
         </View>
         <Text style = {{paddingTop: 20 }}>Test</Text>
         <View style = {{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
           <Image
             source={require('../../images/substract.png') }
             style={{height: 3, width: 100}}
           />
           <Text style = {{color: '#000000', fontSize: 18}}> หรือ </Text>
           <Image
             source={require('../../images/substract.png') }
             style={{height: 3, width: 100}}
           />
         </View>
         <View style={styles.textbox_section}>
           <Image
             source={require('../../images/mail.png') }
             style={{ width: 27, height: 27, position: 'absolute', marginLeft: 15}}
           />
          <TextInput
            placeholder='Email'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            style={styles.textbox}
            underlineColorAndroid="transparent"
            keyboardType={'email-address'}
          />
        </View>
        <View style={styles.textbox_section}>
          <Image
            source={require('../../images/key.png') }
            style={{ width: 25, height: 25, position: 'absolute', marginLeft: 15,}}
          />
         <TextInput
           secureTextEntry = {true}
           placeholder='Password'
           value={this.state.password}
           onChangeText={password => this.setState({ password })}
           style={styles.textbox}
           underlineColorAndroid="transparent"
         />
       </View>
       <View style = {{flexDirection:'row', margin: 20 }}>
         <TouchableOpacity activeOpacity={0.7} style={styles.button_login} onPress={ () => Actions.register() }>
          <View>
           <Text style = {{color: '#ffffff', fontSize: 16}}> สร้างบัญชีผู้ใช้ </Text>
          </View>
         </TouchableOpacity>
         <TouchableOpacity activeOpacity={0.7} style={styles.button_login} onPress={ () => this.onLogin()}>
          <View>
           <Text style = {{color: '#ffffff', fontSize: 16}}> ลงชื่อเข้าใช้ </Text>
          </View>
         </TouchableOpacity>
       </View>
     <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View style={styles.loadingContainer}>
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#ffffff"/>
          </View>
        </View>
    </Modal>

    </View>

   );
  }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#ffffff',
 },

 buttonContainer: {
  margin: 20,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#ffd13b',
  borderRadius: 30,
  width: '70%',
  height: 50,
  marginTop: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.8,
  shadowRadius: 2,
  elevation: 1,
 },
 button_login: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#01d7bf', //#B7BBBB//#DADFDF//#A0C8CB//#83CCD0//#279591
  borderRadius: 10,
  width: '45%',
  height: 50,
  margin: 15,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.8,
  shadowRadius: 2,
  elevation: 1,
 }
 ,
imageIcon: {
  width: 120,
  height: 120,
  alignItems: 'center',
},
textbox_section: {
   flexDirection: 'row',
   alignItems: 'center',
   marginTop: 10,
 },
 textbox: {
   fontFamily: 'SukhumvitSet-Text',
   backgroundColor: 'rgba(255,255,255,0.2)',
   borderRadius: 10,
   fontSize: 18,
   color: '#444444',
   width: '70%',
   height: 50,
   paddingLeft: 20,
   // marginTop: 20,
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 5 },
   shadowOpacity: 0.8,
   shadowRadius: 2,
   elevation: 1,
   paddingLeft: 50,
 },
 loadingContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    width: 100,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  }
});

export default Login;

import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Alert, AppRegistry, StyleSheet, View ,Text,TextInput, Image, TouchableOpacity, Modal, ActivityIndicator} from 'react-native';
import { Container, Header, Left, Body, Right, Title, Content } from 'native-base';
import firebase from 'firebase';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { firstName: '', lastName: '', mobile: '',email: '', password: '', rePassword: '', error: '', modalVisible: false };
  }

  goBack(){
    // firebase.auth().signOut();
    // Actions.login();
    this.setModalVisible(false);
  }


  onRegister(){

    if(this.state.password == this.state.rePassword){
      this.setModalVisible(true);
      const { email, password, firstName, lastName, mobile } = this.state;
      // alert(email + password);
      this.setState({ error: '' });
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(()=> {
        const { currentUser } = firebase.auth();
        const data = firebase.database().ref(`/users/${currentUser.uid}/history`);
        data.update({
          email: email ,
          firstName: firstName,
          lastName: lastName,
          mobile: mobile,
          question: 'no',
        }).then(() =>{
          const avg = firebase.database().ref(`/users/${currentUser.uid}/totalTrip`);
          then(() =>{
             this.goBack()
          })
        })
      })
      .catch((signUpError) => {
          this.setModalVisible(false);
          Alert.alert(signUpError.message);
        });
    }else{
      alert('รหัสผ่านไม่ตรงกัน');
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

render() {
  return (
    <Container>
         <Header style={styles.header_section}>
           <Left>
             <TouchableOpacity activeOpacity={0.8} onPress={() => Actions.pop()}>
               <Image source={require('../../images/left-arrow.png')} style = {{width: 30, height: 30, }} />
             </TouchableOpacity>
           </Left>
           <Body>
             <Title>สร้างบัญชีผู้ใช้</Title>
           </Body>
           <Right />
         </Header>
      <Content>
      <View style = {{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
       <View style={styles.textbox_section}>
        <TextInput
          placeholder='ชื่อจริง'
          value={this.state.firstName}
          onChangeText={firstName => this.setState({ firstName })}
          style={styles.textbox}
          underlineColorAndroid="transparent"
          keyboardType={'default'}
        />
      </View>
      <View style={styles.textbox_section}>
       <TextInput
         placeholder='นามสกุล'
         value={this.state.lastName}
         onChangeText={lastName => this.setState({ lastName })}
         style={styles.textbox}
         underlineColorAndroid="transparent"
         keyboardType={'default'}
       />
     </View>
     <View style={styles.textbox_section}>
      <TextInput
        placeholder='เบอร์โทรศัพท์มือถือ'
        value={this.state.mobile}
        onChangeText={mobile => this.setState({ mobile })}
        style={styles.textbox}
        underlineColorAndroid="transparent"
        keyboardType={'numeric'}
      />
    </View>
    <View style={styles.textbox_section}>
     <TextInput
       placeholder='อีเมล'
       value={this.state.email}
       onChangeText={email => this.setState({ email })}
       style={styles.textbox}
       underlineColorAndroid="transparent"
       keyboardType={'email-address'}
     />
   </View>
      <View style={styles.textbox_section}>
       <TextInput
         secureTextEntry = {true}
         placeholder='ตั้งรหัสผ่าน'
         value={this.state.password}
         onChangeText={password => this.setState({ password })}
         style={styles.textbox}
         underlineColorAndroid="transparent"
       />
     </View>
     <View style={styles.textbox_section}>
      <TextInput
        secureTextEntry = {true}
        placeholder='ยืนยันรหัสผ่าน'
        value={this.state.rePassword}
        onChangeText={rePassword => this.setState({ rePassword })}
        style={styles.textbox}
        underlineColorAndroid="transparent"
      />
    </View>
     <TouchableOpacity activeOpacity={0.7} style={styles.buttonContainer} onPress = {() => this.onRegister()}>
      <View>
       <Text style = {{color: '#ffffff', fontSize: 16}}> สร้างบัญชีผู้ใช้ </Text>
      </View>
     </TouchableOpacity>
     <View style = {{flexDirection: 'row', marginTop: 5 }}>
      <Text> Already have an account?</Text>
     <TouchableOpacity activeOpacity={0.7} onPress={ () => Actions.login()}>
      <View>
       <Text style = {{fontWeight: 'bold',}}> เข้าสู่ระบบ</Text>
      </View>
     </TouchableOpacity>
    </View>
    </View>
    </Content>
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
  </Container>

 );
}
}
//#B7BBBB//#DADFDF//#A0C8CB//#83CCD0//#279591
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  header_section: {
    // justifyContent: 'left',
    backgroundColor: '#01d7bf',
  },
  btn_back: {
    color: '#000000',
    fontSize: 25,
  },
  title: {
      fontFamily: 'Lato-Light',
      fontSize: 20,
      color: '#000000',
      // borderColor: 'red',
      // borderWidth: 1,
    },
  buttonContainer: {
    // margin: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#279591',
    borderRadius: 10,
    width: '90%',
    height: 50,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  imageIcon: {
    width: 150,
    height: 150,
    alignItems: 'center',
  },
  textbox_section: {
     flexDirection: 'row',
  },
  textbox: {
     fontFamily: 'TrueMedium',
     backgroundColor: '#83CCD0',
     // borderWidth: 1,
     borderRadius: 10,
     fontSize: 18,
     color: '#444444',
     width: '90%',
     height: 50,
     paddingLeft: 20,
     marginTop: 10,
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 5 },
     shadowOpacity: 0.8,
     shadowRadius: 2,
     elevation: 1,
  },
  titleText: {
     margin: 15,
     fontSize: 40,
     fontWeight: 'bold',
     textAlign:'center',
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
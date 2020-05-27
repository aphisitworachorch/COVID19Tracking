/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './components/login';
import Signup from './components/signup';
import HomeScreen from './components/HomeScreen';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#51DCA8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="เข้าสู่ระบบ" 
        component={Login} 
        options={
          {title: 'เข้าสู่ระบบ'},
          {headerLeft: null} 
        }
      />
      <Stack.Screen 
        name="ลงทะเบียน" 
        component={Signup} 
        options={{ title: 'ลงทะเบียน' }}
      />       
      <Stack.Screen 
       name="HomeScreen" 
       component={HomeScreen} 
       options={
         { title: 'หน้าหลัก',headerLeft: null } 
       }
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
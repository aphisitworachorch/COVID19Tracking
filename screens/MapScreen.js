import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Map from '../components/Map';
const DetailsScreen = ({navigation}) => {
    return (
      <View style={{flex: 1}}>
      <Map /> 
      </View>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});

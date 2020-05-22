import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
const ReportScreen = ({navigation}) => {

  const { colors } = useTheme();

  const theme = useTheme();
  
    return (
      <View style={styles.container}>
      <Text>Report</Text>
    </View>
    );
}

export default ReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});

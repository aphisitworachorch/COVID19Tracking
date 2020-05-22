import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit"
import Icon from 'react-native-vector-icons/Ionicons';
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Map from './src/components/Map';
import Report from './src/components/Report';
class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>แบบประเมิน</Text>
      </View>
    )
  }
}

class MapScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
      <Map /> 
      </View>
    )
  }
}

class ReportScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <Report />   
      </View>
    )
  }
}

class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-home'} />
          </View>
        ),
      }
    },
    Map: {
      screen: MapScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-map'} />
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#f2f2f2',
        barStyle: { backgroundColor: '#51DCA8' },
      }
    },
    Report: {
      screen: ReportScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'md-analytics'} />
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#f2f2f2',
        barStyle: { backgroundColor: '#51DCA8' }
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-people'} />
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#f2f2f2',
        barStyle: { backgroundColor: '#51DCA8' },
      }
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#ffffff',
    inactiveColor: '#f2f2f2',
    barStyle: { backgroundColor: '#51DCA8' },
  }
);

export default createAppContainer(TabNavigator)
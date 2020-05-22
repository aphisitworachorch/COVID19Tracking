import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { Button,Header,ThemeProvider } from 'react-native-elements';
import CustomMenu from '../Report/CustomMenu.js';
export default class Report extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          //Heading/title of the header
          title: navigation.getParam('Title', 'Popup Menu Example'),
          //Heading style
          headerStyle: {
            backgroundColor: navigation.getParam('BackgroundColor', 'green'),
          },
          //Heading text color
          headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
          //Heading Menu in Right Side
          headerRight: (
            //Custom menu component
            <CustomMenu
              //Menu Text
              menutext="Menu"
              //Menu View Style
              menustyle={{
                marginRight: 16,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
              //Menu Text Style
              textStyle={{
                color: 'white',
              }}
              //Click functions for the menu items
              option1Click={() => {
                navigation.navigate('SecondPage');
              }}
              option2Click={() => {}}
            />
          ),
        };
      };
    
    render() {
        return (
            <View>
                <LineChart
                verticalLabelRotation={60}
                    data={{
                        labels: ["อำเภอสีคิ้ว", "อำเภอเมืองนครราชสีมาy", "อำเภอพิมาย", "อำเภอครบุร", "อำเภอประทาย", "อำเภอด่านขุนทด"],
                        datasets: [
                            {
                                data: [
                                    7,
                                    5,
                                    4,
                                    2,
                                    1,
                                    1
                                ]
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width} // from react-native
                    height={500}
                    yAxisLabel="คน"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#c4ffe9",
                        backgroundGradientFrom: "#51dca8",
                        backgroundGradientTo: "#51dca8",
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffffff"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>
        );
    }
}
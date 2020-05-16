import React from 'react';
import { View, Text, PermissionsAndroid, Alert, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { mapStyle } from '../../constants/mapStyle';
import firebase from 'react-native-firebase';
import { geocollection } from 'geofirestore';
const geoDat = {
  lat: 0.00,
  lng: 0.00
};
export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      coordinates: [],
    };
  }
  async componentDidMount() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'COVID19Tracker',
          'message': 'แอพลิเคชั่นCOVID19Detectorต้องการสิทธิในการระบุพิกัดGPS'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
        alert("ระบบพิกัดGPSสามารถเก็บข้อมูลได้");
      } else {
        console.log("location permission denied")
        alert("การขอสิทธิพิกัดGPSล้มเหลว");
      }
    } catch (err) {
      console.warn(err)
    }

    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          coordinates: this.state.coordinates.concat({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        });
        geoDat.lat = position.coords.latitude
        geoDat.lng = position.coords.longitude
      },
      error => {
        Alert.alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      },
    );
    Geolocation.watchPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          coordinates: this.state.coordinates.concat({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),

        });
        geoDat.lat = position.coords.latitude
        geoDat.lng = position.coords.longitude
        console.log(geoDat);
        firebase.firestore()
          .collection('Tracking')
          .add({
            lat: geoDat.lat,
            long: geoDat.lng,
            date: firebase.firestore.FieldValue.serverTimestamp()
          })
      },
      error => {
        console.log(error);
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
        distanceFilter: 0,
      },
    );



  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          style={{ flex: 1 }}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}></Marker>
          <Polyline
            coordinates={this.state.coordinates}
            strokeColor="#bf8221"
            strokeColors={[
              '#bf8221',
              '#ffe066',
              '#ffe066',
              '#ffe066',
              '#ffe066',
            ]}
            strokeWidth={3}
          />
        </MapView>
      </View>
    );
  }
}

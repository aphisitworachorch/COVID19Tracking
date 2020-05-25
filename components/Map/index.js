import React from 'react';
import { View, Text, PermissionsAndroid, Alert, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { mapStyle } from '../constants/mapStyle';
import firebase from 'react-native-firebase';
import geofire from 'geofire'
import Geocoder from 'react-native-geocoding';
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
        /*Geocoder.init("");
        Geocoder.from(geoDat.lat,geoDat.lng)
		    .then(json => {
        		var addressComponent = json.results[0].address_components[0];
			  console.log(addressComponent);
		    })
		    .catch(error => console.warn(error))*/
        firebase.firestore()
          .collection('Tracking')
          .add({
            lat: geoDat.lat,
            long:geoDat.lng,
            date: firebase.firestore.FieldValue.serverTimestamp()
          })
        firebase.database().ref(`/users/001`)
          .set({
            location: {
              lat: geoDat.lat,
              long:geoDat.lng, 
            }
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
  queryDetects() {
    let radius = 0.1 // 100m
    let currentLocation = [
      geoDat.lat,
      geoDat.lng,
    ]

    let detectFound = []

    let geoQuery = this.geoFire.query({center: currentLocation, radius})

    geoQuery.on('key_entered', (key, location, distance) => {
      if (/detect:/.test(key)) {
        detectFound[key] = {key, location, distance}
      }
    })

    let timeout = null

    geoQuery.on('ready', _ => {
      // update circle
      this.state.nearestDetectRadius.push(geoQuery.radius())
      this.setState({nearestDetectRadius: this.state.nearestDetectRadius})

      // clear previous timeout
      clearTimeout(timeout)

      timeout = setTimeout(_ => {
        if (Object.keys(detectFound).length === 0) {
          radius += 0.1
          geoQuery.updateCriteria({radius})
        } else {
          clearTimeout(timeout)
          // find nearest
          let minDistance = -1, nearestDetect = null

          Object.keys(detectFound).forEach(key => {
            const detect = detectFound[key]

            if (detect.distance < minDistance || minDistance === -1)
              minDistance = detect.distance, nearestDetect = detect
          })

          const nearestDetectKey = nearestDetect.key.split(':')[1]

          this.state.detect.forEach(detect => {
            if (detect.id === nearestDetectKey) {
              this.setState({nearestDetect:detect})
            }
          })
        }
      }, 2000)
    })
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
          {this.queryDetects()}
        </MapView>
      </View>
    );
  }
}

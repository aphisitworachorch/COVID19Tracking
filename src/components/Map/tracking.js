import React from 'react';
import {View, Text, PermissionsAndroid, Alert, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import {mapStyle} from '../../constants/mapStyle';
import firebase from 'react-native-firebase';
import {geoFire} from 'geofire';

export default class Tracking  extends React.Component {

}
/**
 export const useGeoFireDatabaseQuery = (coordinates) => {

   const [data, setData] = useState([])
   const geoQuery = geoFire.query({
     center: coordinates,
     radius: 2
   });
 
   useEffect(()=>{
     if (coordinates != null) {
     geoQuery.on("key_entered",  (key, location, distance)=> {
       firebase.database().ref('data').child(key).on('value', (snapshot) => {
      const dataList=[]
       snapshot.forEach(doc => {
         dataList.push(doc.val())
        })
 
          setData(dataList)
       })
 
     })
     }
     },[])
   console.log('Data',data)
   return data
 }
*/
import React, {useState, useEffect} from 'react';
import {View,StyleSheet,Platform,PermissionsAndroid}from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';


export default function LocationMap(){
//   const [location, setLocation] = useState(undefined);
// async function requestPermissions() {
//   await PermissionsAndroid.request(
//     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//   );
//   if ("granted" === PermissionsAndroid.RESULTS.GRANTED) {
//     Geolocation.getCurrentPosition(
//       position => {
//         const {latitude, longitude} = position.coords;
//         setLocation({
//           latitude,
//           longitude,
//         });
//       },
//       error => {
//         console.log("오류");
//       },
//       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//     );
//   }
//     }
//   useEffect(() => {
//     requestPermissions();
//   }, []);
  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9DD84B",
    alignItems: "center",
    justifyContent: "center",
  },
}
)
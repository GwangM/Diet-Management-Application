import React, {useState, useEffect} from 'react';
import {View,StyleSheet,Platform,PermissionsAndroid}from 'react-native';
import MapView, {Marker,PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { windowHeight,windowWidth } from '../../util/WH';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Config from 'react-native-config';

export default function LocationMap({navigation}){
  const [location, setLocation] = useState(undefined);
async function requestPermissions() {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  if ("granted" === PermissionsAndroid.RESULTS.GRANTED) {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
        });
      },
      error => {
        console.log("오류");
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }
  else{
    navigation.navigate("CalendarView");
  }
    }
  useEffect(() => {
    requestPermissions();
  }, []);
  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={{flex: 1,width: windowWidth, height: windowHeight}}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.00422,
            longitudeDelta: 0.00422,
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
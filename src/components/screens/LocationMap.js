import React,{useState,useEffect} from "react";
import { StyleSheet,View,Alert } from "react-native";
import MapView,{PROVIDER_GOOGLE} from "react-native-maps";


function LocationMap({navigation}) {
  const [latitude_now,setLatitude]=useState(0);
  const [longitude_now,setLongitude]=useState(127.000);
  const[ok,setOk]=useState(false);

  const getLocation=async()=>{
    try{
    const {granted}=await Location.requestForegroundPermissionsAsync();
    if(!granted){
      //거절했을 경우 서울 기준
      setLatitude(37.5);
      setLongitude(127.000);
      setOk(false);
    }
    else{
    const{coords:{latitude,longitude},}=await Location.getCurrentPositionAsync({accuracy:10});
    setOk(true);
    //await setLoc(latitude,longitude);
    }; 
  } 
  catch(e){
    Alert.alert("위치 정보 오류");
  }
  }

  useEffect(()=>{getLocation();},[]);
  if(ok){
    return (
      <View style={styles.container}>
        <MapView style={styles.map} 
        initialRegion={{
          latitude:{latitude_now},
          longitude:{longitude_now},
          latitudeDelta:1,
          longitudeDelta:1,
        }}
        provider={PROVIDER_GOOGLE}></MapView>
        </View>
    );
      }
  else{
  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      initialRegion={{
        latitude:37.50,
        longitude:127.0000,
        latitudeDelta:1,
        longitudeDelta:1,
      }}
      provider={PROVIDER_GOOGLE}></MapView>
      </View>
  );
  }
}
export default LocationMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9DD84B",
    alignItems: "center",
    justifyContent: "center",
  },
  map:{
	  width: "100%",
  	  height : "100%"
	}
});
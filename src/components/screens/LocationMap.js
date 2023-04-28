import React from "react";
import { StyleSheet,View } from "react-native";
import MapView from "react-native-maps";

function LocationMap({navigation}) {
  PROVIDER_GOOGLE;
  
  return (
    <View style={styles.container}>
      <MapView style={{flex:1}} provider={PROVIDER_GOOGLE}></MapView>
      </View>
  );
}
export default LocationMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9DD84B",
    alignItems: "center",
    justifyContent: "center",
  },
});
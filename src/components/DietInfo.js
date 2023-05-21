import React from "react";
import { StyleSheet,View,Text } from "react-native";

function DietInfo({Diet}) {

  return (
    <View>
        <Text> : {Diet}</Text>
        <Text> : {Diet}</Text>
        <Text> : {Diet}</Text>
        <Text> : {Diet}</Text>
        <Text> : {Diet}</Text>
        <Text> : {Diet}</Text>
        <Text> : {Diet}</Text>
        <Text> : {Diet}</Text>
        <Text> : {Diet}</Text>
      </View>
  );
}
export default DietInfo;

const styles = StyleSheet.create({
    background: {
      backgroundColor: "rgba(0,0,0,0,6)",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    whiteBox: {
      width: 300,
      backgroundColor: "white",
      borderRadius: 4,
      elevation: 2,
      justifyContent: "center",
      alignItems: "center",
    },
    actionButton: {
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      marginRight: 8,
    },
    text: {
      fontSize: 26,
    },
    dietList: {
      backgroundColor: "brown",
      marginBottom: 10,
      paddingVertical: 20,
      paddingHorizontal: 20,
      borderRadius: 15,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  });
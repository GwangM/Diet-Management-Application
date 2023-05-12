import React from "react";
import { ScrollView, StyleSheet,View,Text } from "react-native";

function DailyList({navigation}) {
  
  return (
    <View style={styles.container}>
     <View style={styles.diet}> 
      <Text style ={styles.dietText}>아침</Text>
     </View>
     <View style={styles.diet}> 
      <Text style ={styles.dietText}>점심</Text>
     </View>
     <View style={styles.diet}> 
      <Text style ={styles.dietText}>저녁</Text>
     </View>
     <View style={styles.diet}> 
      <Text style ={styles.dietText}>간식</Text>
     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9DD84B",
    alignItems: "center",
    justifyContent: "center",
  },
  diet: {
    backgroundColor: "orange",
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 70,
    borderRadius: 15,
  },
  dietText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default DailyList;
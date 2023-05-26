import React from "react";
import { StyleSheet,View,Text } from "react-native";

function DietInfo({diet}) {
//{"diaries": [{"diaryId": 1, "diaryImage": [Object], "foods": [Array], "lat": 37.2429406, "lnt": 127.0677065, "mealTime": "Breakfast", "member": [Object], "writeDate": "2023-05-05"}], "diaryExist": [true, false, false, false]}
//음식 여러개일 때 확인해야        
  return (
    <View>
        <Text> : {diet.foods}</Text>
        <Text> : {diet}</Text>
        <Text> : {diet}</Text>
        <Text> : {diet}</Text>
        <Text> : {diet}</Text>
        <Text> : {diet}</Text>
        <Text> : {diet}</Text>
        <Text> : {diet}</Text>
        <Text> : {diet}</Text>
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

  //aaa
//   import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';

// const FoodCard = ({ base64Image, name, calories, carbs }) => (
//   <View style={styles.card}>
//     <Image source={{ uri: `data:image/png;base64,${base64Image}` }} style={styles.image} />
//     <View style={styles.infoContainer}>
//       <Text style={styles.title}>{name}</Text>
//       <Text style={styles.info}>Calories: {calories}</Text>
//       <Text style={styles.info}>Carbohydrates: {carbs}g</Text>
//     </View>
//   </View>
// );

// const styles = StyleSheet.create({
//   card: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     overflow: 'hidden',
//     marginBottom: 10,
//     elevation: 2,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//   },
//   infoContainer: {
//     padding: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   info: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
// });

// export default FoodCard;
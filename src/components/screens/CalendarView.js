import React from "react";
import { Calendar } from "react-native-calendars";
import { StyleSheet,View,Button } from "react-native";

function CalendarView({navigation}) {
  
  return (
    <View>
    <Calendar 
      style={styles.calendar} 
      theme={{
        todayBackgroundColor: 'blue',
        arrowColor: 'blue',
        dotColor: 'green',
        todayTextColor: 'white',
      }}
      onDayPress={(day) => {
        //day.dateString
        navigation.navigate("DailyList");
      }}
      />
      <Button title="음식 사진"
      onPress={()=>{
        navigation.navigate("CameraView");
      }}
      />
      <Button title="현 위치 지도"
      onPress={()=>{
        navigation.navigate("LocationMap");
      }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  }
});

export default CalendarView;
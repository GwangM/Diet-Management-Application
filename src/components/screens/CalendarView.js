import React from "react";
import { Calendar } from "react-native-calendars";
import { StyleSheet } from "react-native";

function CalendarView({navigation}) {
  
  return (
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
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  }
});

export default CalendarView;
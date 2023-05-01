import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/components/screens/Login";
import CalendarView from "./src/components/screens/CalendarView";
import DailyList from "./src/components/screens/DailyList";
import EachDiet from "./src/components/screens/EachDiet";
import LocationMap from "./src/components/screens/LocationMap";
import CameraView from "./src/components/screens/CameraView";
import CameraScreen from "./src/components/screens/CameraScreen";

const Stack=createNativeStackNavigator();

export default function Navigation(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name = "Login" component={Login}/>      
        <Stack.Screen name = "CalendarView" component={CalendarView}/>
        <Stack.Screen name ="DailyList" component={DailyList}/>
        <Stack.Screen name ="EachDiet" component={EachDiet}/>
        <Stack.Screen name ="LocationMap" component={LocationMap}/>
        <Stack.Screen name ="CameraView" component={CameraView}/>
        {/* <Stack.Screen name ="CameraScreen" component={CameraScreen}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

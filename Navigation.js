import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/components/screens/Login";
import CalendarView from "./src/components/screens/CalendarView";


const Stack=createNativeStackNavigator();

export default function Navigation(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name = "Login" component={Login}/>      
        <Stack.Screen name = "CalendarView" component={CalendarView}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

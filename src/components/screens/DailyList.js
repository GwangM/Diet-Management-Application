import React,{useEffect,useState} from "react";
import { ScrollView, StyleSheet,View,Text,Button,TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

function DailyList({navigation, route}) {
  const address = useSelector((state) => state.user.address);
  const token=useSelector(state => state.user.accessToken);
  const [diet, setDiet] = useState([false,false,false,false]);//object 형식으로("아침":식단) 저장한다.
  const [list,setList]=useState([false, false, false, false]);
  useEffect(()=>{

    fetch(address+"/diary/check-read?date="+route.params.date, {  
    method: "GET",
    headers : {
      Authorization: "Bearer "+token
      }
          }).then(response => response.json()).then(response => {
            if(response){
              console.log(response);//{"diaries": [{"diaryId": 1, "diaryImage": [Object], "foods": [Array], "lat": 37.2429406, "lnt": 127.0677065, "mealTime": "Breakfast", "member": [Object], "writeDate": "2023-05-05"}], "diaryExist": [true, false, false, false]}
              //{"diaries": [], "diaryExist": [false, false, false, false]}
              setList(response.diaryExist);
              const dietList=response.diaries;
              for (i = 0; i < 4; i++) {
                if (list[i]){ //순회하며 식단 저장
                  if(i==0){
                    //  forEach(){ //mealTime이 일치하면 setDiet로 index가 일치하게 할당한다.
                    //  }
                  }
                  else if(i==1){

                  }
                  else if(i==2){

                  }
                  else{

                  }
                }
              } 
            }
          })
          
          // .then(function (response) {
          //   if (response.ok) {
          //       console.log(response);
          //   } else {
          //       console.log('오류');
          //   }
},[])//"2023-00-00" route.params.date 글씨 크기 키우고 베이지, 회색
 
 return (
    <View style={styles.container}>
     <TouchableOpacity style={list[0] ? styles.diet : styles.notExist}
      onPress={()=>{
        navigation.navigate("FoodAnalysis",{"diet":diet[0], "date":route.params.date, "mealTime":"아침"});
      }}> 
      <Text style ={styles.dietText}>아침</Text>
     </TouchableOpacity>

     <TouchableOpacity style={list[1] ? styles.diet : styles.notExist}
      onPress={()=>{
        navigation.navigate("FoodAnalysis",{"diet":diet[1], "date":route.params.date,"mealTime":"점심"});
      }}> 
      <Text style ={styles.dietText}>점심</Text>
     </TouchableOpacity>

     <TouchableOpacity style={list[2] ? styles.diet : styles.notExist}
      onPress={()=>{
        navigation.navigate("FoodAnalysis",{"diet":diet[2], "date":route.params.date, "mealTime":"저녁"});
      }}> 
      <Text style ={styles.dietText}>저녁</Text>
     </TouchableOpacity>

     <TouchableOpacity style={list[3] ? styles.diet : styles.notExist}
      onPress={()=>{
        navigation.navigate("FoodAnalysis",{"diet":diet[3], "date":route.params.date, "mealTime":"간식"});
      }}> 
      <Text style ={styles.dietText}>간식</Text>
     </TouchableOpacity>  
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
    backgroundColor: "#fefcf6",
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 70,
    borderRadius: 15,
  },
  notExist:{
    backgroundColor: "gray",
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 70,
    borderRadius: 15,
  },
  dietText: {
    color: "black",
    fontSize: 24,
    fontWeight: "500",
  },
});

export default DailyList;
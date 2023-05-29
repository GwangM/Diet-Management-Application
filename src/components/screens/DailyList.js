import React,{useEffect,useState} from "react";
import { ScrollView, StyleSheet,View,Text,Button,TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

function DailyList({navigation, route}) {
  const address = useSelector((state) => state.user.address);
  const token=useSelector(state => state.user.accessToken);
  const [diet, setDiet] = useState([false,false,false,false]);//object 형식으로("아침":식단) 저장한다.
  const [list,setList]=useState([false, false, false, false]);
  const[image,setImage]=useState([false,false,false,false]);
  
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
              
              if((list.every((value, idx) => value === response.diaryExist[idx]))==false){
                setList(response.diaryExist);}
              const dietList=response.diaries;
              console.log(list[0])
              console.log(dietList)
              for (let i = 0; i < 4; i++) {
                if (list[i] && diet[i]==false){ //순회하며 식단 저장
                  var vtt_data=""
                  if(i==0){
                    dietList.forEach(function(diets){ //mealTime이 일치하면 setDiet로 index가 일치하게 할당한다.
                        if (diets.mealTime=="Breakfast")
                          console.log("실행")
                          var newDiet = [...diet];
                          
                          fetch(address+"/diary/image/read?fileUrl="+diets.fileUrl, {  
                            method: "GET",
                            headers : {
                              Authorization: "Bearer "+token,
                              "content-type":"image/jpeg"
                              }
                                  }).then(function (response) {
                                    if (response.ok) {
                                        console.log("get 성공");
                                        return response.blob(); 
                                    } else {
                                        alert('네트워크 오류');
                                    }
                                })
                                .then(function (blob) {

                                  var tempBlob = new Blob([blob], {
                                    type: "text/vtt; charset=utf-8"
                                });
                                
                                const fileReaderInstance = new FileReader();
                                fileReaderInstance.readAsDataURL(tempBlob);
                                fileReaderInstance.onload = () => {
                                    base64 = fileReaderInstance.result;
                                    vtt_data = base64;
                                } //base64를 이미지로 띄운다.                                
                                console.log("여기까지")    
                                console.log(diets);
                                let strArr = Object.values(diets);
                                console.log(strArr)
                                strArr.push(vtt_data)
                                newDiet[i] = strArr;
                                setDiet(newDiet);
                              })                                  
                  })
                }
                  else if(i==1){
                    dietList.forEach(function(diets){ //mealTime이 일치하면 setDiet로 index가 일치하게 할당한다.
                      if (diets.mealTime=="Breakfast")
                        console.log("실행")
                        var newDiet = [...diet];
                        
                        fetch(address+"/diary/image/read?fileUrl="+diets.fileUrl, {  
                          method: "GET",
                          headers : {
                            Authorization: "Bearer "+token,
                            "content-type":"image/jpeg"
                            }
                                }).then(function (response) {
                                  if (response.ok) {
                                      console.log("get 성공");
                                      return response.blob(); 
                                  } else {
                                      alert('네트워크 오류');
                                  }
                              })
                              .then(function (blob) {

                                var tempBlob = new Blob([blob], {
                                  type: "text/vtt; charset=utf-8"
                              });
                              
                              const fileReaderInstance = new FileReader();
                              fileReaderInstance.readAsDataURL(tempBlob);
                              fileReaderInstance.onload = () => {
                                  base64 = fileReaderInstance.result;
                                  vtt_data = base64;
                              } //base64를 이미지로 띄운다.                                
                              console.log("여기까지")    
                              console.log(diets);
                              let strArr = Object.values(diets);
                              console.log(strArr)
                              strArr.push(vtt_data)
                              newDiet[i] = strArr;
                              setDiet(newDiet);
                            })                                  
                })
                  }
                  else if(i==2){
                    dietList.forEach(function(diets){ //mealTime이 일치하면 setDiet로 index가 일치하게 할당한다.
                      if (diets.mealTime=="Breakfast")
                        console.log("실행")
                        var newDiet = [...diet];
                        
                        fetch(address+"/diary/image/read?fileUrl="+diets.fileUrl, {  
                          method: "GET",
                          headers : {
                            Authorization: "Bearer "+token,
                            "content-type":"image/jpeg"
                            }
                                }).then(function (response) {
                                  if (response.ok) {
                                      console.log("get 성공");
                                      return response.blob(); 
                                  } else {
                                      alert('네트워크 오류');
                                  }
                              })
                              .then(function (blob) {

                                var tempBlob = new Blob([blob], {
                                  type: "text/vtt; charset=utf-8"
                              });
                              
                              const fileReaderInstance = new FileReader();
                              fileReaderInstance.readAsDataURL(tempBlob);
                              fileReaderInstance.onload = () => {
                                  base64 = fileReaderInstance.result;
                                  vtt_data = base64;
                              } //base64를 이미지로 띄운다.                                
                              console.log("여기까지")    
                              console.log(diets);
                              let strArr = Object.values(diets);
                              console.log(strArr)
                              strArr.push(vtt_data)
                              newDiet[i] = strArr;
                              setDiet(newDiet);
                            })                                  
                })
                  }
                  else{
                    dietList.forEach(function(diets){ //mealTime이 일치하면 setDiet로 index가 일치하게 할당한다.
                      if (diets.mealTime=="Breakfast")
                        console.log("실행")
                        var newDiet = [...diet];
                        
                        fetch(address+"/diary/image/read?fileUrl="+diets.fileUrl, {  
                          method: "GET",
                          headers : {
                            Authorization: "Bearer "+token,
                            "content-type":"image/jpeg"
                            }
                                }).then(function (response) {
                                  if (response.ok) {
                                      console.log("get 성공");
                                      return response.blob(); 
                                  } else {
                                      alert('네트워크 오류');
                                  }
                              })
                              .then(function (blob) {

                                var tempBlob = new Blob([blob], {
                                  type: "text/vtt; charset=utf-8"
                              });
                              
                              const fileReaderInstance = new FileReader();
                              fileReaderInstance.readAsDataURL(tempBlob);
                              fileReaderInstance.onload = () => {
                                  base64 = fileReaderInstance.result;
                                  vtt_data = base64;
                              } //base64를 이미지로 띄운다.                                
                              console.log("여기까지")    
                              console.log(diets);
                              let strArr = Object.values(diets);
                              console.log(strArr)
                              strArr.push(vtt_data)
                              newDiet[i] = strArr;
                              setDiet(newDiet);
                            })                                  
                })
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
},[list])//"2023-00-00" route.params.date 글씨 크기 키우고 베이지, 회색
 
 return (
    <View style={styles.container}>
     <TouchableOpacity style={list[0] ? styles.diet : styles.notExist}
      onPress={()=>{
        let inputDiet=false;
        if(diet[0]){
          inputDiet=JSON.stringify(diet[0])
          }
        navigation.navigate("FoodAnalysis",{"diet":inputDiet, "date":route.params.date, "mealTime":"아침"});
      }}> 
      {/* Error: Objects are not valid as a React child (found: object with keys {name, calories, weight, tan, dan, ji, na}). If you meant to render a collection of children, use an array instead. */}
      <Text style ={styles.dietText}>아침</Text>
     </TouchableOpacity>

     <TouchableOpacity style={list[1] ? styles.diet : styles.notExist}
      onPress={()=>{
        let inputDiet=false;
        if(diet[1]){
          inputDiet=JSON.stringify(diet[1])
          }
        navigation.navigate("FoodAnalysis",{"diet":inputDiet, "date":route.params.date,"mealTime":"점심"});
      }}> 
      <Text style ={styles.dietText}>점심</Text>
     </TouchableOpacity>

     <TouchableOpacity style={list[2] ? styles.diet : styles.notExist}
      onPress={()=>{
        let inputDiet=false;
        if(diet[2]){
          inputDiet=JSON.stringify(diet[2])
          }
        navigation.navigate("FoodAnalysis",{"diet":inputDiet, "date":route.params.date, "mealTime":"저녁"});
      }}> 
      <Text style ={styles.dietText}>저녁</Text>
     </TouchableOpacity>

     <TouchableOpacity style={list[3] ? styles.diet : styles.notExist}
      onPress={()=>{
        let inputDiet=false;
        if(diet[3]){
          inputDiet=JSON.stringify(diet[3])
          }
        navigation.navigate("FoodAnalysis",{"diet":inputDiet, "date":route.params.date, "mealTime":"간식"});
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
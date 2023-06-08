import React,{useEffect,useState} from "react";
import { StyleSheet,View,Text,Image,ScrollView,Button } from "react-native";
import { useSelector } from "react-redux";
import RNFetchBlob from 'rn-fetch-blob';
import { useNavigation } from '@react-navigation/native';

function DietInfo({diet}) {
//{"diaries": [{"diaryId": 1, "diaryImage": [Object], "foods": [Array], "lat": 37.2429406, "lnt": 127.0677065, "mealTime": "Breakfast", "member": [Object], "writeDate": "2023-05-05"}], "diaryExist": [true, false, false, false]}
//음식 여러개일 때 확인해야 1개일 때 아닐 때 조건부로      
const address = useSelector((state) => state.user.address);
const token=useSelector(state => state.user.accessToken);
const [foodImage, setFoodImage] = useState(false);
const [id,setId]=useState(false);
const navigation=useNavigation();
useEffect(()=>{
  //diet parse stringify 제거한 뒤에 테스트
  let dietObj=JSON.parse(diet);
  setId(dietObj.diaryId);
  console.log(id,"id확인");
        if(dietObj.fileUrl){
        console.log(dietObj.fileUrl);
        RNFetchBlob
        .config({
          fileCache: false,
        })
        .fetch('GET', address+"/diary/image/read?fileUrl="+dietObj.fileUrl, { 
          Authorization: "Bearer " + token,
          "content-type":"image/jpeg"
        })
        .then((res) => {
          let base64Str = res.base64();
          setFoodImage(`data:image/jpeg;base64,${base64Str}`);
        })
        .catch((error) => console.error(error));
      }
  },[id]);
  
  return (
     
  <View>
  <ScrollView>
  <View style={styles.card}>
    <View style={styles.infoContainer}>
    {foodImage && <Image style={{ width: 200, height: 200 }} source={{ uri: foodImage }} />}
              <Text style={styles.title}>
                {/* {JSON.parse(diet)} */}결과
              </Text>
              </View>
              {/* <Text style={styles.info}>{food.calories}</Text> */}
            </View>
          {/* {diet[6].map((food, idx) => (
            <View style={styles.card} key={idx}>
              <Text style={styles.title}>
                {food.name}
              </Text>
              <Text style={styles.info}>{food.calories}</Text>
            </View>
          ))} <Image source={{ uri: `data:image/png;base64,${base64Image}` }} style={styles.image} /> */}
  {/* [5]url [6]음식 객체들 배열 [7]이미지*/}
  <Button title="정보 지우기"
      onPress={()=>{
        fetch(address+"/diary/delete?diaryId="+id, {  
          method: "POST",
          headers : {
            Authorization: "Bearer "+token
            }
                }).then(function(){
            navigation.navigate("CalendarView");
                })
        
      }}
      />
      <Button title="화면 전환"
      onPress={()=>{
            navigation.navigate("CalendarView");
        
      }}
      />
</ScrollView>
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
    card: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      overflow: 'hidden',
      marginBottom: 10,
      elevation: 2,
    },
    image: {
      width: '100%',
      height: 200,
    },
    infoContainer: {
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    info: {
      fontSize: 16,
      marginBottom: 5,
    },
  });

  //aaa
// const FoodCard = ({ base64Image, name, calories, carbs }) => (
// );
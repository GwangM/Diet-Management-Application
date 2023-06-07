import React,{useEffect,useState} from "react";
import { StyleSheet,View,Text,Image,ScrollView } from "react-native";
import { useSelector } from "react-redux";
import RNFetchBlob from 'rn-fetch-blob';

function DietInfo({diet}) {
//{"diaries": [{"diaryId": 1, "diaryImage": [Object], "foods": [Array], "lat": 37.2429406, "lnt": 127.0677065, "mealTime": "Breakfast", "member": [Object], "writeDate": "2023-05-05"}], "diaryExist": [true, false, false, false]}
//음식 여러개일 때 확인해야 1개일 때 아닐 때 조건부로      
const address = useSelector((state) => state.user.address);
const token=useSelector(state => state.user.accessToken);
const [foodImage, setFoodImage] = useState(false);

useEffect(()=>{
  //diet parse stringify 제거한 뒤에 테스트
  let dietObj=JSON.parse(diet);

  // fetch(address+"/diary/image/read?fileUrl="+diet.fileUrl, {  
  //   method: "GET",
  //   headers : {
  //     Authorization: "Bearer "+token,
  //     "content-type":"image/jpeg"
  //     }
  //         }).then(function (response) {
  //           console.log("응답",response);
  //           if (response.ok) {
  //               console.log("get 성공");
  //               return response.blob(); 
  //           } else {
  //               alert('네트워크 오류');
  //           }
  //       })
  //       .then(blob => {
  //         const reader = new FileReader();
  //         reader.onloadend = () => {
  //           const base64data = reader.result;
  //           setFoodImage(base64data);
  //         };
  //         reader.readAsDataURL(blob);
  //       })
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
  },[]);
  
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
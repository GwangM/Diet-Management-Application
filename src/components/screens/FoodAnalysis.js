import React,{useEffect,useState} from "react";
import { View, Pressable,Text, TextInput, Platform,StyleSheet } from "react-native";
import CameraView from "./CameraView";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import {decode} from "base-64";
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import RNFetchBlob from "rn-fetch-blob";

const imagePickerOption = {
	mediaType: "photo",
	maxWidth: 800,
	maxHeight: 800,
	includeBase64: Platform.OS === "android",
};

export default function FoodAnalysis({navigation}) {
  const [info, setInfo] = useState(false);
  

  //사진 찍는 버튼, 갤러리에서 가져오는 버튼, 이미지 전송 버튼 적용
  const onPickImage = (res) => { 
    if (res.didCancel || !res) {
      return;
    }
    //console.log(res);
     //res에 있는 이미지정보를 post해서 음식 정보를 받아온다.
    
     const imgBase64 = res.assets[0].base64
     //const decodImg = decode(imgBase64.split(',')[1]);
     const decodImg = decode(imgBase64);
    
  let array = [];
  for (let i = 0; i < decodImg.length; i++) {
  array.push(decodImg.charCodeAt(i));
  }
  let arr= new Uint8Array(array);
    Image = new Blob([new Uint8Array(array)], {type: 'image/jpeg'});//array값은 이미지 decode값
    const newFile = new File(["file:///data/user/0/com.dietmanagementapplication/cache/rn_image_picker_lib_temp_68f095f7-b2a9-4b7e-bbf7-c6686a516d98.jpg"], "data.jpg", {type: "image/jpeg"});
    //res.assets.base64
    const form = new FormData();
    form.enctype = "multipart/form-data";
    //form.enctype = "multipart/form-data";
    const fileName ='imagename.jpg';
    const fileType="image/jpeg";
    const name="image";
    form.append("data", arr);
    form.append("name","ddd");
    form.append("filename","sss");
    form.append("type","aaa");
    //form.append("writeDate","2022-22-22");
    //form.append("mealTime","아침");
    //form.append("foods",arr);
    //form.append("lat",latitude);
    //form.append("lnt",longitude);
     //'x-api-key': "", 
  //
  //axios.post("https://a318-2001-e60-d303-3ca0-5801-ba3e-3ed2-6930.ngrok-free.app/diary/check",form,{
  // Headers:{'Content-Type':'multipart/form-data'}
  
  // TypeError: undefined is not a function, js engine: hermes
  // WARN  RNFetchBlob failed to create request multipart body :Value for data cannot be cast from ReadableNativeMap to String
  // WARN  Attempt to invoke virtual method 'int java.io.InputStream.read(byte[], int, int)' on a null object reference
  
  fetch("https://bc82-2001-e60-d305-eaac-99bb-1c22-9646-6f89.ngrok-free.app/diary/check",{
  method:"POST", 
  Headers:{},
  body:form
    }).then(function (response) {//음식 정보를 응답으로 받는다.
            if (response.ok) {
                console.log("post 성공");
                console.log(response);
                return response.text();
            } else {
                console.log('post 오류');
            }
        }).catch((err) => {
          console.log('에러')
          console.log(err)
        })
  } 

  // 카메라 촬영
  const onLaunchCamera = () => {
    launchCamera(imagePickerOption, onPickImage);
  };
  
  // 갤러리에서 사진 선택
  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };

  // 안드로이드를 위한 모달 visible 상태값
  const [modalVisible, setModalVisible] = useState(false);
  
  // 선택 모달 오픈
  const modalOpen = () => {
      setModalVisible(true); // visible = true
    }

  //내용이 비어있다면 버튼 가져오고, 들어있다면 그 내용을 보여준다.
  useEffect(()=>{
  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //         console.log(position);
  //         const {latitude, longitude} = position.coords;
  //     },
  //     (error) => {
  //         // See error code charts below.
  //         console.log("에러");
  //     },
  //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  // );
  //   //fetch로 이메일, 날짜 보내서 이미 정보가 들어있는지 확인 setInfo(true)
  })

  // if(info){
  //   return (
  //     <View>
        
  //       </View>
  //   );
  // }
  // else{
    return (
      <View  style={styles.background}>
        <View>
          <View style={styles.whiteBox}>
            <Pressable
              style={styles.actionButton}
              android_ripple={{color: "#eee"}}
              onPress={() => {
                modalOpen();
              }} >
              <Text style={styles.actionText}>이미지 가져오기</Text>
            </Pressable>
            <Pressable
              style={styles.actionButton}
              android_ripple={{color: "#eee"}}
              onPress={() => {
               navigation.navigate("CalendarView");
              }} >
              <Text style={styles.actionText}>돌아가기</Text>
            </Pressable>
          </View>
        </View>
        <CameraView
          visible={modalVisible} 
          onClose={() => setModalVisible(false)}
          onLaunchCamera={onLaunchCamera}
          onLaunchImageLibrary={onLaunchImageLibrary} />
          <TextInput type></TextInput>
      </View>
    );

}

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
});
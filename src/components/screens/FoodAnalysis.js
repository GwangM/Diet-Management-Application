import React,{useEffect,useState} from "react";
import { StyleSheet,View,Pressable,Platform } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import CameraView from "./CameraView";
import {launchCamera, launchImageLibrary} from "react-native-image-picker";

const imagePickerOption = {
	mediaType: "photo",
	maxWidth: 768,
	maxHeight: 768,
	includeBase64: Platform.OS === "android",
};

function FoodAnalysis({navigation}) {

  // 선택 사진 또는 촬영된 사진 정보
  const onPickImage = (res) => { 
    if (res.didCancel || !res) {
      return;
    }
    console.log("PickImage", res);
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
    if (Platform.OS === "android") { // 안드로이드
      setModalVisible(true); // visible = true
    } else { // iOS 
    }
  }
  //사진 찍는 버튼, 갤러리에서 가져오는 버튼, 이미지 전송 버튼 적용





  //내용이 비어있다면 버튼 가져오고, 들어있다면 그 내용을 보여준다.
  // if(){
  //   return (
  //     <View>
        
  //       </View>
  //   );
  // }
  // else{
  return (
      <>
      <View>
        <Pressable onPress={modalOpen}>
          <Icon name="camera-alt" color="white" size={24} />
        </Pressable>
      </View>
      <CameraView 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        onLaunchCamera={onLaunchCamera}
        onLaunchImageLibrary={onLaunchImageLibrary} />
    </>
  );

}
export default FoodAnalysis;

// » android: userInterfaceStyle: Install expo-system-ui in your project to enable this feature.

// When CocoaPods is installed, initialize the project workspace: npx pod-install
// You may want to run npx @react-native-community/cli doctor to help install any tools that your app may need to run your native projects.
// Download your Android keystore (if you're not sure if you need to, just run the command and see): expo fetch:android:keystore
// The property assetBundlePatterns does not have the same effect in the bare workflow.
// Learn more: https://docs.expo.dev/bare/updating-your-app/#embedding-assets
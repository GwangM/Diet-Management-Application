import React,{useEffect,useState} from "react";
import { View, Pressable,Text, Platform,StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import CameraView from "./CameraView";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";

const imagePickerOption = {
	mediaType: "photo",
	maxWidth: 768,
	maxHeight: 768,
	includeBase64: Platform.OS === "android",
};

function FoodAnalysis({navigation}) {
  const [info, setInfo] = useState(false);

  //사진 찍는 버튼, 갤러리에서 가져오는 버튼, 이미지 전송 버튼 적용
  const onPickImage = (res) => { 
    if (res.didCancel || !res) {
      return;
    }
    //console.log(res); res에 있는 이미지정보를 post해서 음식 정보를 받아온다.
    Image = new Blob([new Uint8Array(array)], {type: 'image/jpeg'});//array값은 이미지 decode값
    const form = new FormData();
    form.enctype = "multipart/form-data";
    const fileName ='imagename.jpg';
    form.set("file", Image, fileName);


    fetch("http://", {//i cloud api로 보낸다.
    method: "POST",
    headers: { 
        }, 
    body: form
        }).then(function (response) {//음식 정보를 응답으로 받는다.
            if (response.ok) {
                console.log("post 성공");
                //return response.text();
            } else {
                alert('post 오류');
            }
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
    //fetch로 이메일, 날짜 보내서 이미 정보가 들어있는지 확인 setInfo(true)
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
      </View>
    );

}
export default FoodAnalysis;

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
import React,{useRef,useState} from "react";
import { StyleSheet,View,toggleWhiteBalance,Pressable,Text,Alert,TouchableOpacity } from "react-native";
import { AutoFocus, Camera, CameraType } from 'expo-camera';

export default function CameraScreen({navigation}) {
  const cameraRef = useRef(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [zoomLevel,setZoomLevel] = useState(0);

  const openCameraHandler = async () => { 
    // 카메라에 대한 접근 권한을 얻을 수 있는지 묻는 함수입니다.
      const { status } = await Camera.requestCameraPermissionsAsync();
   
   // 권한을 획득하면 status가 granted 상태가 됩니다.
      if (status === 'granted') {
        
      } else {
        Alert.alert('카메라 접근 허용은 필수입니다.');
      }
  };
  
  const takePictureHandler = async () => { 
    // cameraRef가 없으면 해당 함수가 실행되지 않게 가드
    if (!cameraRef.current) return;
    
    // takePictureAsync를 통해 사진을 찍습니다.
    // 찍은 사진은 base64 형식으로 저장합니다.
    await cameraRef.current
      .takePictureAsync({
        base64: true,
      })
      .then((data) => {
        setPreviewVisible(true);
        setCapturedImage(data);
      });
  };
  const retakePictureHandler = () => {
    setPreviewVisible(false);
      setCapturedImage(null);
    };

    const savePictureHandler = async () => {
    
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        // saveToLibraryAsync()를 통해 캐싱된 데이터를 실제 디바이스로 저장합니다.
        await MediaLibrary.saveToLibraryAsync(capturedImage.uri).then(() => {
          // 사진을 찍을 때 사용한 takePictureAsync 함수 이후 저장한한 capturedImage를 picture라는 state에 옮겨줍니다.
          // picture는 사용할 컴포넌트가 많기에 Recoil을 통해 전역 변수로 담았습니다.
          setPicture(capturedImage);
        }).then(() => {
          // 그 뒤 firebase의 firestore에 저장합니다.
          uploadImageAsync(capturedImage.uri,'originalPhoto/')
        });
      }
  };
  async function uploadImageAsync(uri,photoURL) { 
    const blob = await new Promise((resolve, reject) => { 
      const xhr = new XMLHttpRequest(); 
      xhr.onload = function () { 
        resolve(xhr.response); 
      }; 
      xhr.onerror = function (e) { 
        console.log(e); 
      reject(new TypeError("네트워크 요청 실패")); 
      }; 
      xhr.responseType = "blob"; 
      xhr.open("GET", uri, true); 
      xhr.send(null);
    }); 
    const storageRef = ref(storage,`${photoURL}${uuid.v4()}`);
      uploadBytes(storageRef,blob)
      .then(async (snapshot) => {
        // 추후 downloadURL을 fireStore에 유저 정보- 유저 사진집을 만들 수 있게끔 변환
        const downloadURL = await getDownloadURL(storageRef);
        console.log(downloadURL);
      }).catch((error) => console.log(error));
    blob.close()
 }

  return (
    <View>
    <Camera
    ref={cameraRef}
    type={cameraType}
    zoom={zoomLevel}
    autoFocus={AutoFocus.on}
    whiteBalance={toggleWhiteBalance}
  />
  <Pressable onPress={openCameraHandler}>
  <Text>카메라 켜기</Text>
  </Pressable>
  <TouchableOpacity onPress={takePictureHandler}>
          <Text>Click Me!</Text>  
        </TouchableOpacity>
  </View>  
  );
}
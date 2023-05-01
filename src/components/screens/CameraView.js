import React,{useRef,useState} from "react";
import { StyleSheet,View,toggleWhiteBalance,Pressable,Text,Alert,TouchableOpacity } from "react-native";
import { AutoFocus, Camera, CameraType } from 'expo-camera';

export default function CameraView({navigation}) {
  function componentDidMount(){
    (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        this.setHasPermission(status !== undefined);
    })();
};
  return (
<Camera
  style={{flex:1 }}
  ref={(ref) => {
  this.camera = ref;
  }}
 >
    <View
        style={{
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        }}
    >
        <TouchableOpacity
            style={{
            flex: 1,
            alignSelf: 'flex-end',
            alignItems: 'center',
            }}
            onPress={this.setSnap}
        >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white',alignItems:'center' }} >
              사진 찍기
            </Text>
        </TouchableOpacity>
    </View>
</Camera>
  );
}
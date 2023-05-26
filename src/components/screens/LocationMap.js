import React, {useState, useEffect} from 'react';
import {Button,TextInput,View,StyleSheet,Platform,PermissionsAndroid}from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { windowHeight,windowWidth } from '../../util/WH';
import Config from 'react-native-config';
import InfoModal from './InfoModal';
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from "react-native-nmap";
import {useSelector} from "react-redux";
import axios from 'axios';
import proj4 from 'proj4';

export default function LocationMap({navigation}){
  const address = useSelector((state) => state.user.address);
  const token=useSelector(state => state.user.accessToken);
  const [location, setLocation] = useState(undefined);
  const [info,setInfo]=useState(undefined);
  const[markerList,setMarkerList]=useState([]);
  const[infoList,setInfoList]=useState([]);
  const[modalVisible,setModalVisible]=useState([]);
  const[searchTerm, setSearchTerm]=useState('');
  const[searchResults,setSearchResults]=useState([]);
  const[position,setPosition]=useState("");


  const search= async()=>{
    try{
      const { data } = await axios.get('https://openapi.naver.com/v1/search/local', {
        params: { query: searchTerm },
        headers: {
          'X-Naver-Client-Id': Config.NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': Config.NAVER_CLIENT_SECRET
        },
      });
    
      const [lati, longi] = katecToWgs84(parseInt(data.items.mapx), parseInt(data.items.mapy));
      data.items['latitude']=lati+'';
      data.items['longitude']=longi+'';
      console.log(data.items,"실행");
      setSearchResults(data.items);
      setPosition([lati,longi]);
      console.log(position)
    } catch (error) {
      console.error(error);
    }
  }

async function requestPermissions() {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  }
  useEffect(() => {
    requestPermissions().then(function(){
      if ("granted" === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            if (location==undefined){
            setLocation({
              latitude,
              longitude,
            });}
          },
          error => {
            console.log("오류");
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
        //이미 넣어둔 음식 정보를 위도, 경도 이용하여 가져오기
        if (location!=undefined){
        fetch(address+"/diary/search/near-loc?lat="+location.latitude+"&lnt="+location.longitude, {  
          method: "GET",
          headers : {
            Authorization: "Bearer "+token
            }
                }).then(response => response.json()).then(response => {
                  if(response){
                  console.log(response)//{"diaryId": 1, "fileUrl": "/Users/chandle/f-Dairy-Server/src/main/resources/static/diaryImage/testImage.jpg", "foods": [{"calories": "81.82", "dan": "1.73", "foodId": 1, "ji": "2.27", "na": "283.49", "name": "라면", "tan": "13.65", "weight": "550.0"}], "lat": null, "lnt": null, "mealTime": "Breakfast", "memberId": null, "writeDate": "2023-05-05"}
                  if(info==undefined){
                  setInfo(response)}
                  if(info){
                    let markers=new Array();
                    let infoModals=new Array();  
                    let tempVisible=new Array();
                    info.forEach(function(element){
                    if(element.lat){
                    markers.push([element.lat,element.lnt])
                    infoModals.push(element)
                    tempVisible.push(false);
                  }
                   })
                  setInfoList(infoModals)
                  setMarkerList(markers) 
                  setModalVisible(tempVisible);
                }
        }
      })
    }}
  })
    console.log(location)
  }, [location,info]);

  
  const katec = '+proj=tmerc +lat_0=38 +lon_0=128 +k=0.9999 +x_0=500000 +y_0=200000 +ellps=bessel +units=m +no_defs +towgs84=-115.8,-474.99,674.11,1.16,-2.31,-1.63,6.43';
const wgs84 = 'EPSG:4326';

function katecToWgs84(x, y) {
  const [lon, lat] = proj4(katec, wgs84, [x, y]);
  return [lat, lon];
}

  function findIndex(arr, target) {
    return arr.findIndex(subArray =>
      subArray.every((value, index) => value === target[index])
    );
  }

  const modalOpen = (lat,lnt) => {
    let idx=findIndex(markerList,[lat,lnt]);
    if(idx!=-1&&(markerList.length===modalVisible.length)){
    let newModal=[...modalVisible]//구조분해한 다음 해당하는 idx만 true로 바꿔준다.
    newModal[idx]=true;
    setModalVisible(newModal); // visible = true
  }}

  function getClickHandler(seq){
    return function(e){

    }

  }

  // for(let i=0;i<markers.length;i++){
  //   console.log(markers[i],getClickHandler(i));
  //   naver.maps.Event.addListener(markers[i],'click',getClickHandler(i));
  // }

  return (
    <View
  style={{
    width: windowWidth,
    height: windowHeight,
    marginTop: 10,
  }}
>
  <TextInput value={searchTerm} onChangeText={setSearchTerm} style={{height:40,borderColor:'gray',borderWidth:1}}
  placeholder='지역 검색'/>
  <Button title='Search' onPress={search}/>
{location && (
  <NaverMapView
    style={{ width: "100%", height: "100%" }}
    zoomControl={false}
    center={{
      zoom: 15,
      tilt: 50,
      latitude: location.latitude,
      longitude: location.longitude,
    }}
  >
    <Marker
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
      pinColor="blue"
    />
    {markerList.map((marker,index) => 
        <Marker
          key={marker}
          coordinate={{
            latitude: marker[0],
            longitude: marker[1],
          }}
          onClick={() => {
            console.log(marker);
            modalOpen(marker[0],marker[1]);
          }}
        />        
      )}

      {(modalVisible.length===markerList.length) && (markerList.map((marker, index) => (
         <InfoModal
          key={index}
          visible={modalVisible[index]} 
          onClose={() => {
            var newModal=[...modalVisible]
            if(index<newModal.length)
              newModal[index]=false;
            setModalVisible(newModal); 
          }}
          location={marker}
          info={JSON.stringify(infoList[index])}
          />
          )) )}
          {searchResults.map((result, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: result.latitude, longitude: result.longitude }}
            caption={{ text: result.title }}
            pinColor="red"
          />
        ))}  
  </NaverMapView>)}
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9DD84B",
    alignItems: "center",
    justifyContent: "center",
  },
}
)
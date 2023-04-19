import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAUcUvTZSzQSItvgSh2YJNRDysUL34eMTA",
  authDomain: "diet-management-application.firebaseapp.com",
  projectId: "diet-management-application",
  storageBucket: "diet-management-application.appspot.com",
  messagingSenderId: "668042191983",
  appId: "1:668042191983:web:63b9517700ac64d6d1d99a",
  measurementId: "G-R4WSQ92Q42",
  databaseURL: process.env.DATABASE_URL,
};

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

export const db = firebase.database();


//default
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAUcUvTZSzQSItvgSh2YJNRDysUL34eMTA",
//   authDomain: "diet-management-application.firebaseapp.com",
//   projectId: "diet-management-application",
//   storageBucket: "diet-management-application.appspot.com",
//   messagingSenderId: "668042191983",
//   appId: "1:668042191983:web:63b9517700ac64d6d1d99a",
//   measurementId: "G-R4WSQ92Q42"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// @react-native-firebase/app : Firebase를 적용할 때 반드시 필요한 라이브러리
// @react-native-firebase/auth : Firebase를 통한 회원 인증을 위한 라이브러리
// @react-native-firebase/firestore : Firebase 실시간 데이터베이스 사용을 위한 라이브러리
// @react-native-firebase/storage : 이미지를 업로드 하기 위한 라이브러리
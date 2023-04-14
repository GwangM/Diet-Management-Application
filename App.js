import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { windowWidth, windowHeight } from "./src/util/WH";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setUser } from "./src/component/redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { get, ref, update, child } from "firebase/database";
import { db } from "./firebaseConfig.js";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GetHash } from "./src/util/Functions";

WebBrowser.maybeCompleteAuthSession();

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEnter, setIsEnter] = useState(false);
  const [isWarning, setIsWarning] = useState(false);

  const dispatch = useDispatch();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '12711112780-emgc8pm1tpl4gkrpt041akva9t1f4d2p.apps.googleusercontent.com',
  });

  const openGoogleLogin = () => {
    promptAsync();
  };

  const auth = getAuth();
  //const user = auth.currentUser;로 현재 접속한 사용자의 프로필 정보 가져올 수 있다.
  const dbRef = ref(db);

  useEffect(() => {
    if (response?.type === "success") {
      setIsEnter(true);
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  const setUserInfo = (uid, displayName, userDiets = []) => {
    const updates = {};
    updates["/users/" + uid] = { displayName, uid, userDiets };
    update(dbRef, updates);
  };

  const setUserState = (uid, email, displayName, accessToken, loginType) => {
    dispatch(
      setUser({
        uid,
        email,
        name: displayName,
        accessToken,
        isLogin: true,
        loginType,
      })
    );
  };

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      let { uid, email, displayName, accessToken } = user;
      if (!!displayName) {
        const dbDisplayName = await get(child(dbRef, `users/${uid}`));

        if (dbDisplayName.exists()) {
          displayName = dbDisplayName.val().displayName;
        }

        setUserState(uid, email, displayName, accessToken, "google");
        setUserInfo(uid, displayName);
        setIsEnter(false);
        navigation.reset({
          routes: [{ name: "Root" }],
        });
      }
    }
  });

  const userSignIn = async () => {
    setIsWarning(false);
    const hashPassword = await GetHash(password);
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, hashPassword)
      .then((userCredential) => {
        setIsEnter(true);
        const user = userCredential.user;
        const { uid, email, accessToken } = user;
        get(child(dbRef, `users/${uid}`))
          .then((data) => {
            if (data.exists()) {
              const displayName = data.val().displayName;
              setUserState(uid, email, displayName, accessToken, "init");
            }
          })
          .then(() => {
            setIsEnter(false);
            navigation.reset({
              routes: [{ name: "Root" }],
            });
          });
      })
      .catch((error) => {
        setIsWarning(true);
      });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        {isEnter ? (
          <View style={[styles.centered, styles.backgroundBlack]}>
            <ActivityIndicator size="large" color="tomato" />
          </View>
        ) : (
          <>
            <View style={styles.titleBox}>
              <Text style={styles.title}>Similar Mate</Text>
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.loginText}>ID</Text>
              <TextInput
                style={styles.loginInput}
                placeholder={"아이디"}
                placeholderTextColor="#9e9e9e"
                onChangeText={setEmail}
              />
              <Text style={styles.loginText}>PassWord</Text>
              <TextInput
                style={styles.loginInput}
                placeholder={"비밀번호"}
                secureTextEntry={true}
                placeholderTextColor="#9e9e9e"
                onChangeText={setPassword}
              />

              <View style={styles.warningContainer}>
                {isWarning ? (
                  <Text style={styles.warningMsg}>
                    일치하는 회원이 없습니다.
                  </Text>
                ) : (
                  ""
                )}
              </View>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  userSignIn();
                }}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  navigation.navigate("Signup");
                }}
              >
                <Text style={styles.buttonText}>SignUp</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonContainer, styles.googleLoginButton]}
                disabled={!request}
                onPress={() => {
                  openGoogleLogin();
                }}
              >
                <Text style={[styles.buttonText, styles.googleButtonText]}>
                  Google 계정으로 로그인
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleBox: {
    width: windowWidth - 60,
    height: windowHeight / 3,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  title: {
    fontSize: 50,
    color: "#32AAFF",
    fontWeight: "bold",
  },
  inputBox: {
    flex: 2,
    alignItems: "center",
  },
  loginInput: {
    width: windowWidth - 60,
    height: 50,
    borderWidth: 1,
    borderColor: "#32AAFF",
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
    color: "#9e9e9e",
  },
  loginText: {
    color: "#32AAFF",
    width: windowWidth - 60,
    fontSize: 16,
    fontWeight: "bold",
  },
  warningContainer: {
    height: 20,
    marginBottom: 15,
    alightItems: "center",
    justifyContent: "center",
  },
  warningMsg: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonContainer: {
    backgroundColor: "#32AAFF",
    width: windowWidth - 60,
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  googleLoginButton: {
    backgroundColor: null,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  googleButtonText: {
    fontSize: 16,
    color: "#32AAFF",
  },

  backgroundBlack: {
    backgroundColor: "#000000",
  },
});

//구글 관련
//프로젝트 ID: crack-producer-383708입니다.
// .../auth/userinfo.email	기본 Google 계정의 이메일 주소 확인
// .../auth/userinfo.profile	개인정보(공개로 설정한 개인정보 포함) 보기
// openid	Google에서 내 개인 정보를 나와 연결
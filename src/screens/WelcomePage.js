import React, {useEffect, useState} from 'react';

import SplashScreen from 'react-native-splash-screen';
import MyTabs from "./MyTabs";
import {Text, View} from "react-native";
// import {tokenStorage} from "../utils/TokenStorage";
import messaging from '@react-native-firebase/messaging';
import urls from "../network/ServerUrls";
import {pushApi} from "../network/PushApi";

const Welcome = () => {
    // permission 요청
    // const auth = messaging().requestPermission()
    //     .then(auth => console.log(auth));

    // background notification handler 등록
    // messaging().setBackgroundMessageHandler(async message => {
    //     console.log("OK: ", message)
    // });

    useEffect(() => {
        // 유저 인증이 되어있는지 확인 후 토큰 넣기
        // tokenStorage.setToken("TEMP TOKEN");

        // push token 받기
        messaging()
            .getToken()
            .then(token => {
                pushApi.registerPushToken(1, "asd", token, "ANDROID");
            });

        setTimeout(() => {
            SplashScreen.hide();
        }, 1000);
    }, []);

    return (
        <View><Text>asd</Text></View>
        // <MyTabs/>
    );
};

export default Welcome;

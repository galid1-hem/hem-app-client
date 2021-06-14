import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';

import SplashScreen from 'react-native-splash-screen';
import MyTabs from "./MyTabs";
// import {tokenStorage} from "../utils/TokenStorage";

const Welcome = () => {
    useEffect(() => {
        // 유저 인증이 되어있는지 확인 후 토큰 넣기
        // tokenStorage.setToken("TEMP TOKEN");
        // push token 받기
        messaging()
            .getToken()
            .then(token => console.log("token : ", token));

        setTimeout(() => {
            SplashScreen.hide();
        }, 1000);
    }, []);

    return (
        <MyTabs/>
    );
};

export default Welcome;

import React, {useEffect} from 'react';

import SplashScreen from 'react-native-splash-screen';
import MyTabs from "./MyTabs";
import messaging from '@react-native-firebase/messaging';
import {pushApi} from "../network/PushApi";
import LoginPage from "./LoginPage";

const Welcome = () => {
    useEffect(() => {
        // TODO 유저 인증이 되어있는지 확인 후 토큰 넣기

        // push token 등록 요청
        messaging()
            .getToken()
            .then(token => {
                pushApi.registerPushToken(1, "asd", token, "ANDROID");
            });

        setTimeout(() => {
            SplashScreen.hide();
        }, 1000);
    }, []);

    let isLogin = false;

    return (
        // login 상태에 따라서 다른 스크린으로
        (isLogin)
            ?
                <MyTabs/>
            :
                <LoginPage/>
    );
};

export default Welcome;

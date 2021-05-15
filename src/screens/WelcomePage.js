import React, {useEffect, useState} from 'react';

import SplashScreen from 'react-native-splash-screen';
import MyTabs from "./MyTabs";

const Welcome = () => {
    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 1000);
    }, []);

    return (
        <MyTabs/>
    );
};

export default Welcome;

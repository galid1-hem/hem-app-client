import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';

import SplashScreen from 'react-native-splash-screen';

const Welcome = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return (
    <SafeAreaView>
      <Text>HI</Text>
    </SafeAreaView>
  );
};

export default Welcome;

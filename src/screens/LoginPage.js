import * as React from "react";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {KakaoOAuthToken, login} from "@react-native-seoul/kakao-login";

export default function LoginPage({navigation}) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    const signInWithKakao = async (): Promise<void> => {
        const token: KakaoOAuthToken = await login();

        console.log("가져온 토큰 !!: " + JSON.stringify(token));
    };

    return (

        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={signInWithKakao}>
                <Text>
                    로그인
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        position: "relative"
    },
});
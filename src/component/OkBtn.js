import {StyleSheet, TouchableOpacity, SafeAreaView, Text} from "react-native";
import * as React from "react";
import { theme } from "../assets/theme/Color";

export default function OkBtn(props) {
    const backgroundColor = props.activated
        ? theme.colors.paleActiveBtnBackground
        : theme.colors.inActiveIcon;

    return (
        <SafeAreaView style={{backgroundColor: backgroundColor, ...styles.container}}>
            <TouchableOpacity style={styles.btn} onPress={props.onPress} activeOpacity={0.7}>
                <Text style={styles.text} >{props.text}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        borderRadius: 3,
    },

    btn: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        color: "white",
    }
})
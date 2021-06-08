import {SafeAreaView, StyleSheet, View} from "react-native";
import * as React from "react";
import {theme} from "../assets/theme/Color";

export default function Horizontal() {
    return (
        <View style={styles.horizontal}></View>
    )
}

const styles = StyleSheet.create({
    horizontal: {
        width: "100%",
        height: 8,
        backgroundColor: theme.colors.horizontal,
    }
});
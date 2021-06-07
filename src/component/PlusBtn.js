import {StyleSheet, TouchableOpacity, SafeAreaView} from "react-native";
import * as React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function PlusBtn(props) {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.plusBtnContainer} onPress={props.onPress} activeOpacity={0.7}>
                <Icon name={"plus-circle"} size={50}/>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 20,
        right: 20
    },

    plusBtnContainer: {
    },
})
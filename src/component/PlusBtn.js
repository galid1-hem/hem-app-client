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
        width: '100%',
        height: '100%',
    },

    plusBtnContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20
    },
})
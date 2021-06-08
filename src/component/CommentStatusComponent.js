import {StyleSheet, TouchableOpacity, View, SafeAreaView, Text} from "react-native";
import * as React from "react";
import { theme } from "../assets/theme/Color";
import Icon from 'react-native-vector-icons/Ionicons';

export default function CommentStatusComponent(props) {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={props?.onPress} style={styles.contentContainer}>
                <View style={styles.component}>
                    <Icon size={17} name={"chatbubble-outline"}/>
                </View>
                <View style={styles.component}>
                    <Text style={styles.text}>댓글</Text>
                </View>
                <View style={styles.component}>
                    <Text style={styles.text}>{props.commentCount}</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 55,
        width: 110,
        justifyContent: "center",
        alignItems: "center"
    },

    contentContainer: {
        width: "90%",
        flexDirection: "row",
    },

    component: {
        marginLeft: 3,
        marginRight: 3
    },

    text: {
        fontSize: 14
    }
});
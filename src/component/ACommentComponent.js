import {StyleSheet, TouchableOpacity, View, SafeAreaView, Text} from "react-native";
import * as React from "react";
import UserInfoComponent from "./UserInfoComponent";

export default function ACommentComponent(props) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoContainer}>
                <UserInfoComponent/>
            </View>

            <TouchableOpacity>
                <Text>댓글쓰기</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    userInfoContainer: {
        height: 65
    }
});
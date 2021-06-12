import {StyleSheet, TouchableOpacity, View, SafeAreaView, Text} from "react-native";
import * as React from "react";
import UserInfoComponent from "./UserInfoComponent";

export default function ACommentComponent(props) {
    const comment = props.comment;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoContainer}>
                <UserInfoComponent userName={"테스트 유저"} regionName={"역삼동"} createdAt={"2020/05/10"}/>
            </View>
            <View style={styles.commentContainer}>
                <Text>
                    {comment.contents[0].value}
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },

    commentContainer: {
        marginLeft: 40,
        marginBottom: 10,
    },

    userInfoContainer: {
        height: 45
    },

    commentReplyContainer: {
        width: '20%',
    }
});
import {StyleSheet, TouchableOpacity, SafeAreaView, Text, View } from "react-native";
import * as React from "react";
import { theme } from "../Assets/theme/Color";
import LikeComponent from "./LikeComponent";
import CommentComponent from "./CommentComponent";
import UserInfoComponent from "./UserInfoComponent";

export default function APostComponent({item}) {
    console.log(JSON.stringify(item))

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoContainer}>
                <UserInfoComponent profileImageUrl={"https://homepages.cae.wisc.edu/~ece533/images/airplane.png"} userName={"테스트 유저"} regionName={"역삼동"} createdAt={"2020/05/10"}/>
            </View>

            <View style={styles.contentContainer}>
                <View style={{width: '90%'}}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{item.title}</Text>
                    </View>

                    <View style={styles.contentContentsContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.contentsText}>{item.contents[0].value}</Text>
                        </View>
                        <TouchableOpacity style={styles.imagesContainer}>

                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.reactionComponentContainer}>
                <View style={styles.reactionComponentContentContainer}>
                    <LikeComponent postId={item.postId} viewerLike={item.viewerLike} likeCount={item.postCounter.likeCount}/>
                    <CommentComponent commentCount={item.postCounter.commentCount} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopColor: theme.colors.border,
        borderTopWidth: 3,
        borderBottomColor: theme.colors.border,
    },

    contentContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 8,
    },

    userInfoContainer: {

    },

    contentContentsContainer: {

    },

    titleText: {
        fontWeight: "bold",
        fontSize: 17
    },

    textContainer: {

    },

    contentsText: {
        fontSize: 15
    },

    imagesContainer: {

    },

    reactionComponentContainer: {
        borderTopColor: theme.colors.border,
        borderTopWidth: 1,
        height: 55,
        alignItems: "center"
    },

    reactionComponentContentContainer: {
        flexDirection: "row",
        width: "95%"
    }
});
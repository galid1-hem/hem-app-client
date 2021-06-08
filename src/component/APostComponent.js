import {StyleSheet, TouchableOpacity, SafeAreaView, Text, View} from "react-native";
import * as React from "react";
import {theme} from "../assets/theme/Color";
import LikeStatusComponent from "./LikeStatusComponent";
import CommentStatusComponent from "./CommentStatusComponent";
import UserInfoComponent from "./UserInfoComponent";
import { useNavigation } from '@react-navigation/native';

const APostComponent = ({item}) => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoContainer}>
                <UserInfoComponent profileImageUrl={"https://homepages.cae.wisc.edu/~ece533/images/airplane.png"}
                                   userName={"테스트 유저"} regionName={"역삼동"} createdAt={"2020/05/10"}/>
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
                    <LikeStatusComponent postId={item.postId} viewerLike={item.viewerLike}
                                         likeCount={item.postCounter.likeCount}/>
                    <CommentStatusComponent
                        onPress={() => navigation.navigate("PostDetails", {post: item})}
                        commentCount={item.postCounter.commentCount}/>
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
        // marginTop: 8,
        marginBottom: 8,
    },

    userInfoContainer: {
        height: 65,
        paddingHorizontal: "5%",
        paddingTop: 10
    },

    contentContentsContainer: {},

    titleText: {
        fontWeight: "bold",
        fontSize: 17
    },

    textContainer: {},

    contentsText: {
        fontSize: 15
    },

    imagesContainer: {},

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

export default APostComponent;
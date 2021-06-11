import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {theme} from "../assets/theme/Color";
import LikeStatusComponent from "./LikeStatusComponent";
import CommentStatusComponent from "./CommentStatusComponent";
import UserInfoComponent from "./UserInfoComponent";
import {useNavigation} from '@react-navigation/native';
import {loadNextBatchOfComments} from "../store/post";
import {useDispatch} from "react-redux";
import PostMenuComponent from "./PostMenuComponent";

const APostComponent = ({post}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onPressCommentStatusComponent = () => {
        dispatch(loadNextBatchOfComments(post?.postId));
        navigation.navigate("PostDetails", {postId: post?.postId});
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoContainer}>
                <UserInfoComponent
                    menuComponent={PostMenuComponent}
                    profileImageUrl={"https://homepages.cae.wisc.edu/~ece533/images/airplane.png"}
                                   userName={"테스트 유저"} regionName={"역삼동"} createdAt={"2020/05/10"}/>
            </View>

            <View style={styles.contentContainer}>
                <View style={{width: '90%'}}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{post?.title}</Text>
                    </View>

                    <View style={styles.contentContentsContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.contentsText}>{post?.contents[0].value}</Text>
                        </View>
                        <TouchableOpacity style={styles.imagesContainer}>

                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.reactionComponentContainer}>
                <View style={styles.reactionComponentContentContainer}>
                    <LikeStatusComponent postId={post?.postId} viewerLike={post?.viewerLike}
                                         likeCount={post?.postCounter?.likeCount}/>
                    <CommentStatusComponent
                        onPress={onPressCommentStatusComponent}
                        commentCount={post?.postCounter?.commentCount}/>
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
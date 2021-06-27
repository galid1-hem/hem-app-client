import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {theme} from "../assets/theme/Color";
import LikeStatusComponent from "../component/LikeStatusComponent";
import CommentStatusComponent from "../component/CommentStatusComponent";
import UserInfoComponent from "../component/UserInfoComponent";
import Horizontal from "../component/Horizontal";
import WriteCommentComponent from "../component/WriteCommentComponent";
import CommentListComponent from "../component/CommentListComponent";
import {useSelector} from "react-redux";
import PostImageComponent from "../component/PostImageComponent";

export default function PostDetailsPage({route, navigation}) {
    const postId = route.params.postId;
    const posts = useSelector(state => state.post.posts);
    const post = posts[postId];
    const comments = useSelector(state => state.post.comments[postId]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoContainer}>
                <UserInfoComponent profileImageUrl={"https://homepages.cae.wisc.edu/~ece533/images/airplane.png"}
                                   userName={"디테일 페이지"} regionName={"역삼동"} createdAt={"2020/05/10"}/>
            </View>

            <View style={styles.contentContainer}>
                <View style={{width: '90%'}}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{post?.title}</Text>
                    </View>

                    <View style={styles.contentContentsContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.contentsText}>{post?.contents[0]?.value}</Text>
                        </View>
                        <TouchableOpacity style={styles.imagesContainer}>
                            <PostImageComponent images={post.mediaIds}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.reactionComponentContainer}>
                <View style={styles.reactionComponentContentContainer}>
                    <LikeStatusComponent postId={post?.postId} viewerLike={post?.viewerLike}
                                         likeCount={post?.postCounter?.likeCount}/>
                    <CommentStatusComponent commentCount={post?.postCounter?.commentCount}/>
                </View>
            </View>

            <Horizontal/>

            <View style={styles.writeCommentComponentContainer}>
                <WriteCommentComponent onPress={() => navigation.navigate("WriteComment", {postId: postId})}
                                       placeHolderText={"댓글을 입력해 주세요."}/>
            </View>
            <View style={styles.commentListContainer}>
                <CommentListComponent postId={postId} comments={comments?.comments} commentIds={comments?.commentIds}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
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
        alignItems: "center",
        paddingHorizontal: "5%",
        paddingVertical: 10
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

    imagesContainer: {
        height: 150
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
    },

    writeCommentComponentContainer: {},

    commentListContainer: {
        width: "100%",
        height: "60%"
    }
});
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {theme} from "../assets/theme/Color";
import LikeStatusComponent from "../component/LikeStatusComponent";
import CommentStatusComponent from "../component/CommentStatusComponent";
import UserInfoComponent from "../component/UserInfoComponent";
import Horizontal from "../component/Horizontal";
import WriteCommentComponent from "../component/WriteCommentComponent";
import CommentListComponent from "../component/CommentListComponent";
import urls from "../assets/network/ServerUrls";
import {useSelector} from "react-redux";

export default function PostDetailsPage({route, navigation}) {
    const [commentList, setCommentList] = React.useState([]);
    const postId = route.params.postId;
    const post = useSelector(state => state.post.posts[postId]);

    function fetchCommentList() {
        fetch(urls.postServer + "/" + post.postId + "/comments")
            .then(response => response.json())
            .then(responseJson => setCommentList(responseJson.data));
    }

    React.useEffect(() => {
        fetchCommentList();
    }, [])

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
                            <Text style={styles.contentsText}>{post.contents[0].value}</Text>
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
                    <CommentStatusComponent commentCount={post?.postCounter?.commentCount}/>
                </View>
            </View>

            <Horizontal/>

            <View style={styles.commentListContainer}>
                <WriteCommentComponent placeHolderText={"댓글을 입력해 주세요."}/>
                <CommentListComponent commentList={commentList}/>
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
    },

    commentListContainer: {}
});
import {SafeAreaView, StyleSheet, TextInput, View, Text} from "react-native";
import * as React from "react";
import WriteCommentComponent from "../component/WriteCommentComponent";
import {theme} from "../assets/theme/Color";
import ACommentComponent from "../component/ACommentComponent";
import {useDispatch, useSelector} from "react-redux";
import {createComment, loadNextBatchOfSubComments} from "../store/post";
import CommentListComponent from "../component/CommentListComponent";

export default function WriteCommentPage({route, navigation, props}) {
    const [comment, setComment] = React.useState("");
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const postId = route.params.postId;
    const parentCommentId = route.params.parentCommentId;

    const renderParentComment = () => {
        const parentComment = state.post.comments[postId].comments[parentCommentId];

        return (
            parentCommentId
                ?
                <View style={styles.parentCommentContainer}>
                    <ACommentComponent comment={parentComment}/>
                </View>
                :
                <View></View>
        );
    };

    if (parentCommentId !== undefined) {
        React.useEffect(() => {
            dispatch(loadNextBatchOfSubComments(postId, parentCommentId));
        }, []);
    }

    const renderSubCommentList = () => {
        const subComments = state.post.subComments[parentCommentId];

        return (
            parentCommentId
                ?
                <View style={styles.subCommentListContainer}>
                    <CommentListComponent parentCommentId={parentCommentId} postId={postId}
                                          comments={subComments?.comments} commentIds={subComments?.commentIds}/>
                </View>
                :
                <View></View>
        )
    }

    const verifyPublishable = () => {
        return comment.length > 2;
    }

    const createRequestBody = () => {
        return {
            parentCommentId: parentCommentId,
            contents: [
                {
                    value: comment,
                    type: "TEXT"
                }
            ]
        };
    };

    const onPressWriteComment = () => {
        dispatch(createComment(postId, createRequestBody()));
        navigation.navigate("PostDetails", {postId: postId});
    };

    return (
        <SafeAreaView style={styles.container}>
            {renderParentComment()}
            <View style={styles.commentTextInputContainer}>
                <TextInput
                    style={styles.commentTextInput}
                    onChangeText={setComment}
                    value={comment}
                    placeholder={"댓글을 입력해주세요."}
                    placeholderTextColor={theme.colors.normalText}
                />
            </View>
            <View style={styles.writeCommentComponentContainer}>
                <WriteCommentComponent onPress={onPressWriteComment} publishable={verifyPublishable()}/>
            </View>
            {renderSubCommentList()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 10
    },

    parentCommentContainer: {
        paddingHorizontal: 10,
        height: 80,
    },

    commentTextInputContainer: {
        width: "100%",
        paddingHorizontal: 10,
        alignItems: "center",
        marginBottom: -11
    },

    commentTextInput: {
        height: 100,
        padding: 15,
        width: "100%",
        borderWidth: 1,
        borderColor: theme.colors.border
    },

    publishBtnContainer: {
        flex: 1,
        height: '80%',
    },

    writeCommentComponentContainer: {

    },

    subCommentListContainer: {
        width: "100%",
        height: "60%",
    }
});

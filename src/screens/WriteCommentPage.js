import {SafeAreaView, StyleSheet, TextInput, View} from "react-native";
import * as React from "react";
import WriteCommentComponent from "../component/WriteCommentComponent";
import {theme} from "../assets/theme/Color";
import ACommentComponent from "../component/ACommentComponent";
import {useDispatch} from "react-redux";
import {createComment} from "../store/post";

export default function WriteCommentPage({route, navigation, props}) {
    const [ comment, setComment ] = React.useState("");
    const dispatch = useDispatch();
    const postId = route.params.postId;

    const parentComment = props?.parentComment;

    const renderParentComment = () => {
        return (
            parentComment
            ?
                <ACommentComponent/>
            :
                <View></View>
        );
    };

    const verifyPublishable = () => {
        return comment.length > 2;
    }

    const createRequestBody = () => {
        return {
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
            <View style={styles.parentCommentContainer}>
                {renderParentComment}
            </View>

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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },

    parentCommentContainer: {
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
        width: '100%',
    }
});

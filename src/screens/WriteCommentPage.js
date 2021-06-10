import { StyleSheet, SafeAreaView, View, Text, TextInput } from "react-native";
import * as React from "react";
import WriteCommentComponent from "../component/WriteCommentComponent";
import {theme} from "../assets/theme/Color";
import ACommentComponent from "../component/ACommentComponent";

export default function WriteCommentPage(props) {
    const [ comment, setComment ] = React.useState("");

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
                <WriteCommentComponent publishable={verifyPublishable()}/>
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

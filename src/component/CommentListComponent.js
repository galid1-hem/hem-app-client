import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, VirtualizedList} from "react-native";
import * as React from "react";
import {useNavigation} from '@react-navigation/native';
import ACommentComponent from "./ACommentComponent";
import {theme} from "../assets/theme/Color";

export default function CommentListComponent(props) {
    const postId = props.postId;
    const navigation = useNavigation();
    const parentCommentId = props.parentCommentId;

    function onPressReplyComment(commentId) {
        return () => {
            navigation.navigate(
                "WriteComment",
                {
                    postId: postId,
                    parentCommentId: commentId
                }
            )
        }
    }

    function renderSubCommentCount(comment) {
        return (
            parentCommentId === undefined
                ?
                    <TouchableOpacity onPress={onPressReplyComment(comment?.commentId)} style={styles.commentReplyContainer}>
                        <Text style={styles.replyText}>답글 {comment?.subCommentCount}개</Text>
                    </TouchableOpacity>
                :
                    <View></View>
        );
    }

    function renderItem({item}) {
        return (
            <View style={{width: "80%", marginBottom: 10}}>
                <ACommentComponent onPressReplyComment={onPressReplyComment(item?.commentId)} comment={item}/>
                {renderSubCommentCount(item)}
            </View>
        );
    }

    const {commentIds, comments} = props;

    return (
        <SafeAreaView style={styles.container}>
            <VirtualizedList
                data={commentIds?.map(commentId => comments[commentId])}
                getItemCount={(data) => data?.length}
                keyExtractor={(item) => item?.commentId}
                getItem={(data, index) => data[index]}
                renderItem={renderItem}
            />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginHorizontal: 15,
    },

    commentReplyContainer: {
        width: '20%',
        marginLeft: 40,
    },

    replyText: {
        color: theme.colors.activeText
    }
});

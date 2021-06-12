import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, VirtualizedList} from "react-native";
import * as React from "react";
import {useNavigation} from '@react-navigation/native';
import ACommentComponent from "./ACommentComponent";

export default function CommentListComponent(props) {
    const postId = props.postId;
    const navigation = useNavigation();

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

    function renderItem({item}) {
        return (
            <View style={{marginBottom: 10}}>
                <ACommentComponent onPressReplyComment={onPressReplyComment(item?.commentId)} comment={item}/>
                <TouchableOpacity onPress={onPressReplyComment(item?.commentId)} style={styles.commentReplyContainer}>
                    <Text>댓글쓰기</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const {commentIds, comments} = props;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <VirtualizedList
                    style={{height: "100%"}}
                    data={commentIds?.map(commentId => comments[commentId])}
                    getItemCount={(data) => data?.length}
                    keyExtractor={(item) => item?.commentId}
                    getItem={(data, index) => data[index]}
                    renderItem={renderItem}
                />
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
    },

    contentContainer: {
        width: "95%",
    },
});

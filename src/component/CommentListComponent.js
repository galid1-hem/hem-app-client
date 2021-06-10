import {StyleSheet, SafeAreaView, View, Text, VirtualizedList} from "react-native";
import * as React from "react";
import ACommentComponent from "./ACommentComponent";
import {useSelector} from "react-redux";

export default function CommentListComponent(props) {
    const commentIds = useSelector(state => state.post?.comments[props.postId]?.commentIds);

    function renderItem({item}) {
        return (
            <ACommentComponent item={item}/>
        );
    }

    const { commentList } = props;
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <VirtualizedList
                    style={{height: "100%"}}
                    data={commentIds?.map(commentId => commentList[commentId])}
                    getItemCount={(data) => data?.length}
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

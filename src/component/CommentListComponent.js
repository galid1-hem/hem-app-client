import {SafeAreaView, StyleSheet, View, VirtualizedList} from "react-native";
import * as React from "react";
import ACommentComponent from "./ACommentComponent";

export default function CommentListComponent(props) {
    function renderItem({item}) {
        return (
            <ACommentComponent comment={item}/>
        );
    }

    const { commentIds, comments } = props;

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

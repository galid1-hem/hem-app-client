import {StyleSheet, SafeAreaView, View, Text, VirtualizedList} from "react-native";
import * as React from "react";
import ACommentComponent from "./ACommentComponent";

export default function CommentListComponent(props) {
    function renderItem({item}) {
        return (
            <ACommentComponent item={item}/>
        );
    }

    const { commentList } = props;

    console.log(JSON.stringify(props.commentList));

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <VirtualizedList
                    style={{height: "100%"}}
                    data={commentList}
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

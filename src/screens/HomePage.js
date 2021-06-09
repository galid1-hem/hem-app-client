import * as React from "react";
import {SafeAreaView, StyleSheet, VirtualizedList, Text} from "react-native";
import PlusBtn from "../component/PlusBtn";
import urls from "../assets/network/ServerUrls";
import APostComponent from "../component/APostComponent";
import {useDispatch, useSelector} from "react-redux";
import {loadNextBatchOfPosts} from "../store/post";

export default function HomePage({navigation}) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    const renderItem = ({item}) => {
        return (
            <APostComponent item={item}/>
        )
    };

    React.useEffect(()=>{
        dispatch(loadNextBatchOfPosts(20));
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <VirtualizedList
                data={state.post.postIds.map(id => state.post.posts[id])}
                getItemCount={(data) => data?.length}
                getItem={(data, index) => data[index]}
                keyExtractor={(item) => item?.postId}
                renderItem={renderItem}/>
            <PlusBtn onPress={() => navigation.navigate("UploadPost")}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        position: "relative"
    },

    plusBtnContainer: {
        position: "absolute",
        bottom: 20,
        right: 20,
    }
});
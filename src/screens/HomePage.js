import * as React from "react";
import {SafeAreaView, StyleSheet, VirtualizedList} from "react-native";
import PlusBtn from "../component/PlusBtn";
import urls from "../assets/network/ServerUrls";
import APostComponent from "../component/APostComponent";

export default function HomePage({navigation}) {
    const [posts, setPosts] = React.useState([]);
    const [lastPostId, setLastPostId] = React.useState("");

    const renderItem = ({item}) => {
        return (
            <APostComponent item={item} navigation={navigation}/>
        )
    };

    const getPostList = (lastPostId, size) => {
        let requestInfo = urls.postServer + "?"

        if (lastPostId != null) {
            requestInfo += "lastPostId=" + lastPostId + "&"
        }
        if (size != null) {
            requestInfo += "size=" + size + "&"
        }

        fetch(requestInfo)
            .then(response => response.json())
            .then(responseJson => {
                setPosts(responseJson.data);
                setLastPostId(responseJson.data[responseJson.length - 1]);
            })
            .catch(error => {
                alert(error);
            });
    }

    // Component가 마운트 될 때 한번만 호출
    React.useEffect(() => getPostList(), [])

    return (
        <SafeAreaView style={styles.container}>
            <VirtualizedList
                data={posts}
                getItemCount={(data) => data?.length}
                getItem={(data, index) => data[index]}
                renderItem={renderItem}/>
            <PlusBtn onPress={() => navigation.navigate("UploadPost", {params: {callback: getPostList(lastPostId)}})}/>
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
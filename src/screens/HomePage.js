import * as React from "react";
import {SafeAreaView, View, StyleSheet, VirtualizedList} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import PlusBtn from "../component/PlusBtn";
import UploadPostPage from "./UploadPostPage";
import urls from "../Assets/network/ServerUrls";
import APostComponent from "../component/APostComponent";

const Stack = createStackNavigator();

function HomePage({navigation}) {
    const [ posts, setPosts ] = React.useState([]);
    const [ lastPostId, setLastPostId ] = React.useState("");

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
                getItemCount={(data) => data.length}
                getItem={(data, index) => data[index]}
                renderItem={APostComponent}/>
            <PlusBtn onPress={()=> navigation.navigate("UploadPost", {params:{callback:getPostList(lastPostId)}})}/>
        </SafeAreaView>
    )
}

export default function HomeStackNavigator({navigation}) {
    return (
        <Stack.Navigator>
            <Stack.Screen name={"Home"} component={HomePage}/>
            <Stack.Screen name={"UploadPost"} component={UploadPostPage}/>
        </Stack.Navigator>
    );
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
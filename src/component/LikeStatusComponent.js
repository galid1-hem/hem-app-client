import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {theme} from "../assets/theme/Color";
import urls from "../assets/network/ServerUrls";
import Icon from 'react-native-vector-icons/FontAwesome';
import {doLike} from "../store/post";
import {useDispatch, useSelector} from "react-redux";

export default function LikeStatusComponent(props) {
    // const [viewerLike, setViewerLike] = React.useState(props.viewerLike);
    // const [likeCount, setLikeCount] = React.useState(props.likeCount);

    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    let likeCount = state.post.posts[props.postId].postCounter.likeCount;
    let viewerLike = state.post.posts[props.postId].viewerLike;

    const onPressLikeBtn = () => {
        // if (viewerLike?.likeId) {
        //     requestDeleteLike();
        // } else {
        //     requestCreateLike();
        // }
        dispatch(doLike(props.postId));
    }

    const requestCreateLike = () => {
        fetch(urls.postServer + "/" + props.postId + "/likes", {
            method: "POST",
        })
            .then(response => response.json())
            .then(responseJson => {
                setViewerLike(responseJson.data);
                setLikeCount(likeCount + 1);
            });
    }

    const requestDeleteLike = () => {
        fetch(urls.postServer + "/" + props.postId + "/likes/" + viewerLike.likeId, {
            method: "DELETE",
        })
            .then(response => {
                if (response.ok) {
                    setViewerLike({});
                    setLikeCount(likeCount - 1);
                } else {
                    alert("일시적인 오류로 인해 요청을 처리할 수 없습니다.");
                }
            })
    }

    const getColor = () => {
        let color = "black"
        if (viewerLike?.likeId) {
            color = theme.colors.activeText
        }
        return color
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={onPressLikeBtn} style={styles.contentContainer}>
                <View style={styles.component}>
                    <Icon color={getColor()} size={17} name={"thumbs-o-up"}/>
                </View>
                <View style={styles.component}>
                    <Text style={{color: getColor(), ...styles.text}}>좋아요</Text>
                </View>
                <View style={styles.component}>
                    <Text style={{color: getColor(), ...styles.text}}>{likeCount}</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 55,
        width: 110,
        justifyContent: "center",
        alignItems: "center"
    },

    contentContainer: {
        width: "90%",
        flexDirection: "row",
    },

    component: {
        marginLeft: 3,
        marginRight: 3
    },

    text: {
        fontSize: 14
    }
});
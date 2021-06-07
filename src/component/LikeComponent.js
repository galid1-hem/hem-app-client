import {StyleSheet, TouchableOpacity, SafeAreaView, Text, View} from "react-native";
import * as React from "react";
import {theme} from "../Assets/theme/Color";
import urls from "../Assets/network/ServerUrls";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function LikeComponent(props) {
    const [viewerLike, setViewerLike] = React.useState(props.viewerLike);
    const [likeCount, setLikeCount] = React.useState(props.likeCount);

    const onPressLikeBtn = () => {
        if (viewerLike?.likeId) {
            requestDeleteLike();
        } else {
            requestCreateLike();
        }
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
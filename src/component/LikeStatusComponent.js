import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {theme} from "../assets/theme/Color";
import Icon from 'react-native-vector-icons/FontAwesome';
import {doLike} from "../store/post";
import {useDispatch, useSelector} from "react-redux";

export default function LikeStatusComponent(props) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    let likeCount = state.post.posts[props.postId]?.postCounter?.likeCount;
    let viewerLike = state.post.posts[props.postId]?.viewerLike;

    const onPressLikeBtn = () => {
        dispatch(doLike(props.postId));
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
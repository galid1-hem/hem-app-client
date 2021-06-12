import {Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {useNavigation} from '@react-navigation/native';
import {theme} from "../assets/theme/Color";
import {useDispatch} from "react-redux";
import {deletePost} from "../store/post";

export default function PostMenuComponent(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const onPressUpdate = () => {
        props.closeMenu();

        navigation.navigate(
            "UploadPost",
            {
                post: props.post
            }
        )
    }

    const onPressDelete = () => {
        props.closeMenu();

        dispatch(deletePost(props.post?.postId));
    }

    return (
        <Modal
            transparent={true}
            animationType={"slide"}
            visible={props.visible}
        >
            <View>
                <TouchableOpacity onPress={props.closeMenu} style={styles.outSide}/>
                <View style={styles.container}>
                    <TouchableOpacity onPress={onPressDelete} style={styles.deleteContainer}>
                        <Text style={styles.text}>삭제</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressUpdate} style={styles.modifyContainer}>
                        <Text style={styles.text}>수정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shareContainer}>
                        <Text style={styles.text}>공유하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    outSide: {
        height: "75%",
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
    container: {
        height: "25%",
        backgroundColor: theme.colors.background
    },

    deleteContainer: {
        borderWidth: 0.5,
        borderColor: theme.colors.border,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    modifyContainer: {
        borderWidth: 0.5,
        borderColor: theme.colors.border,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    shareContainer: {
        borderWidth: 0.5,
        borderColor: theme.colors.border,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    text: {
        fontSize: 15,
    }
});
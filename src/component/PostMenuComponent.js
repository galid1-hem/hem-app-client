import {Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {theme} from "../assets/theme/Color";

export default function PostMenuComponent(props) {
    return (
        <Modal
            transparent={true}
            animationType={"slide"}
            visible={props.visible}
        >
            <View>
                <TouchableOpacity onPress={props.closeMenu} style={styles.outSide}/>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.deleteContainer}>
                        <Text style={styles.text}>삭제</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modifyContainer}>
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
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import * as React from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from "../assets/theme/Color";


export default function AddPhotoBtn(props) {
    let imageCountColor = theme.colors.normalText;
    if (props.imageCount > 0) imageCountColor = theme.colors.activeText;

    return (
        <TouchableOpacity onPress={props.onPress} style={styles.container}>
            <Icon size={20} name={"camera"} color={theme.colors.inActiveIcon} />
            <View style={styles.imageCountTextContainer}>
                <Text style={{color: imageCountColor}}>{props.imageCount}</Text>
                <Text style={{color: theme.colors.normalText}}>/10</Text>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: {
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: theme.colors.border,
        borderWidth: 1,
        borderRadius: 5,
    },

    imageCountTextContainer: {
        flexDirection: "row"
    }
});
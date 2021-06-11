import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import OkBtn from "./OkBtn";
import Icon from 'react-native-vector-icons/FontAwesome';
import {theme} from "../assets/theme/Color";


export default function WriteCommentComponent(props) {
    return (
       <SafeAreaView style={styles.container}>
           <View style={styles.contentContainer}>
               <TouchableOpacity style={styles.touchableContentContainer} onPress={props.onPress}>
                   <View style={styles.iconContainer}>
                       <Icon name={"picture-o"} size={20} color={theme.colors.inActiveIcon} />
                   </View>
                   <View style={styles.placeHolderTextContainer}>
                       <Text style={{color: theme.colors.normalText}}>{props.placeHolderText}</Text>
                   </View>
               </TouchableOpacity>
               <View style={styles.publishBtnContainer}>
                   <OkBtn onPress={props.onPress} activated={props.publishable} text={"등록"}/>
               </View>
           </View>
       </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 65,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },

    contentContainer: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: theme.colors.border,
        paddingHorizontal: 15,
    },

    touchableContentContainer: {
        flex: 6,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row"
    },

    iconContainer: {

    },

    placeHolderTextContainer: {
        marginLeft: 10
    },

    publishBtnContainer: {
        flex: 1,
        height: '80%',
    }
});

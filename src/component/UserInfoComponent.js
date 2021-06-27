import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {theme} from "../assets/theme/Color";
import Icon from "react-native-vector-icons/Ionicons";
import PostMenuComponent from "./PostMenuComponent";

export default function UserInfoComponent(props) {
    const [ menuVisible, setMenuVisible ] = React.useState(false);

    const renderProfileImage = () => {
        return (
            props?.profileImageUrl
                ?
                <Image
                    source={{uri: props.profileImageUrl}}
                    style={{width: 30, height: 30, borderRadius: 100}}
                    resizeMode={'cover'}
                />
                :
                <Icon size={15} color={'white'} name={'store'}/>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileImgContainer}>
                {renderProfileImage()}
            </View>
            <View style={styles.infoContainer}>
                <Text style={{fontWeight: "bold", fontSize: 13}}>{props.userName}</Text>
                <View style={styles.sideInfoContainer}>
                    <Text style={styles.sideInfoText}>{props.regionName}</Text>
                    <Text style={styles.sideInfoText}> · </Text>
                    <Text style={styles.sideInfoText}>{props.createdAt}</Text>
                </View>
            </View>
            <TouchableOpacity style={{bottom: 5}} onPress={() => setMenuVisible(true)}>
                <Icon size={15} name={"menu"}/>
                <PostMenuComponent post={props.post} closeMenu={() => setMenuVisible(false)} visible={menuVisible}/>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        // height: 70,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    profileImgContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: 30,
        height: 30,
        borderRadius: 100,
        backgroundColor: theme.colors.inActiveIcon,
    },
    infoContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    sideInfoContainer: {
        flexDirection: "row"
    },
    sideInfoText: {
        fontSize: 11,
        color: theme.colors.infoText
    }
});
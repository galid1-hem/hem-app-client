import {StyleSheet, TouchableOpacity, SafeAreaView, Text, View, Image} from "react-native";
import * as React from "react";
import {theme} from "../assets/theme/Color";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function UserInfoComponent(props) {
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
            <View style={styles.contentContainer}>
                <View style={styles.profileImageContainer}>
                    <View style={{width: 30, height: 30, borderRadius: 100, backgroundColor: theme.colors.inActiveIcon}}>
                        {renderProfileImage()}
                    </View>
                </View>

                <View style={styles.userInfoContainer}>
                    <Text style={{fontWeight: "bold"}}>{props.userName}</Text>
                    <View style={styles.sideInfoContainer}>
                        <Text style={styles.normalText}>{props.regionName}</Text>
                        <Text style={styles.normalText}> · </Text>
                        <Text style={styles.normalText}>{props.createdAt}</Text>
                    </View>
                </View>

                <View style={styles.menuContainer}>
                    <Icon name={"menu"} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },

    contentContainer: {
        width: "100%",
        height: "85%",
        flexDirection: "row",
        alignItems: "center",
    },

    profileImageContainer: {
        flex: 1.2,
        justifyContent: 'center',
        alignItems: 'center'
    },

    userInfoContainer: {
        flex: 7
    },

    sideInfoContainer: {
        flexDirection: "row"
    },

    menuContainer: {
        flex: 0.5
    },

    normalText: {
        color: 'gray',
        fontSize: 11
    }
});
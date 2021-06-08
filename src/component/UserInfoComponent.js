import {StyleSheet, TouchableOpacity, SafeAreaView, Text, View, Image} from "react-native";
import * as React from "react";
import {theme} from "../assets/theme/Color";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function UserInfoComponent(props) {
    const renderProfileImage = () => {
        return (
            <View style={{width: 30, height: 30, borderRadius: 100, backgroundColor: theme.colors.inActiveIcon}}>
                {props?.profileImageUrl
                    ?
                    <Image
                        source={{uri: props.profileImageUrl}}
                        style={{width: 30, height: 30, borderRadius: 100}}
                        resizeMode={'cover'}
                    />
                    :
                    <Icon size={15} color={'white'} name={'store'}/>}
            </View>
        );
    }

    return (
        // <SafeAreaView style={styles.container}>
        //     <View style={styles.contentContainer}>
        //         <View style={styles.profileImageContainer}>
        //             <View style={{width: 30, height: 30, borderRadius: 100, backgroundColor: theme.colors.inActiveIcon}}>
        //                 {renderProfileImage()}
        //             </View>
        //         </View>
        //
        //         <View style={styles.userInfoContainer}>
        //             <Text style={{fontWeight: "bold"}}>{props.userName}</Text>
        //             <View style={styles.sideInfoContainer}>
        //                 <Text style={styles.normalText}>{props.regionName}</Text>
        //                 <Text style={styles.normalText}> · </Text>
        //                 <Text style={styles.normalText}>{props.createdAt}</Text>
        //             </View>
        //         </View>
        //
        //         <View style={styles.menuContainer}>
        //             <Icon name={"menu"} />
        //         </View>
        //     </View>
        // </SafeAreaView>
        <SafeAreaView style={styles.container}>
            <View style={styles.profileImgContainer}>
                {renderProfileImage()}
            </View>
            <View style={styles.infoContainer}>
                <Text style={{fontWeight: "bold"}}>{props.userName}</Text>
                <View style={styles.sideInfoContainer}>
                    <Text style={styles.normalText}>{props.regionName}</Text>
                    <Text style={styles.normalText}> · </Text>
                    <Text style={styles.normalText}>{props.createdAt}</Text>
                </View>
            </View>
            <View>
                <Text>m</Text>
            </View>
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

    },
    infoContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    sideInfoContainer: {
        flexDirection: "row"
    }
})

const styles2 = StyleSheet.create({


    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: "90%"
    },

    contentContainer: {
        width: "100%",
        // height: "85%",
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
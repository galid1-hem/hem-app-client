import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";

const PostImageComponent = (props) => {
    const {images} = props;

    switch (images.length) {
        case 0:
            return <View></View>

        case 1:
            return (
                <View>
                    <Image source={{uri: images[0].imageUrl}} style={styles.image}/>
                </View>
            )

        case 2:
            return (
                <View style={{
                    flexDirection: "row"
                }}>
                    <View style={styles.imageContainer}>
                        <Image source={{uri: images[0].imageUrl}} style={styles.image}/>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image source={{uri: images[1].imageUrl}} style={styles.image}/>
                    </View>
                </View>
            )

        case 3:
            return (
                <View style={{flexDirection: "row"}}>
                    <View style={styles.imageContainer}>
                        <Image source={{uri: images[0].imageUrl}} style={styles.image}/>
                    </View>

                    <View style={{flex: 1}}>
                        <View style={styles.imageContainer}>
                            <Image source={{uri: images[1].imageUrl}} style={styles.image}/>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image source={{uri: images[2].imageUrl}} style={styles.image}/>
                        </View>
                    </View>
                </View>
            )

        default:
            return (
                <View style={{flexDirection: "row"}}>
                    <View style={styles.imageContainer}>
                        <Image source={{uri: images[0].imageUrl}} style={styles.image}/>
                    </View>

                    <View style={{flex: 1}}>
                        <View style={styles.imageContainer}>
                            <Image source={{uri: images[1].imageUrl}} style={styles.image}/>
                        </View>
                        <View style={styles.imageContainer}>
                            <View style={styles.remainImagesContainer}>
                                <Text style={{color: "white", fontWeight: "bold", fontSize: 16}}>
                                    + {images.length - 2}장
                                </Text>
                            </View>
                            <Image source={{uri: images[2].imageUrl}} style={styles.image}/>
                        </View>
                    </View>
                </View>
            )
    }
}

export default PostImageComponent

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        padding: 1
    },

    remainImagesContainer: {
        zIndex: 1,
        position: 'absolute',
        width: '100%', height: '100%',
        backgroundColor: "rgba(86, 86, 78, 0.60)",
        justifyContent: "center",
        alignItems: "center"
    },

    image: {
        width: "100%",
        height: "100%"
    }
})
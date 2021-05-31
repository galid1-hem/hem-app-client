import * as React from "react";
import {SafeAreaView, View, Text, StyleSheet, Image, TextInput, FlatList, TouchableOpacity} from "react-native";
import AddPhotoBtn from "../component/AddPhotoBtn";
import {theme} from "../Assets/theme/Color";
import ImagePicker from "react-native-image-crop-picker";
import Icon from 'react-native-vector-icons/Ionicons';


export default function CreatePostPage() {
    const [title, onChangeTitle] = React.useState("");
    const [contents, onChangeContents] = React.useState("");
    const [images, setImages] = React.useState([]);

    const renderSelectedImages = ({item, index}) => {
        return (
            <View>
                <Image
                    style={{borderRadius: 5, marginLeft: 15, height: 55, width: 55}}
                    source={{
                        uri: item
                    }}
                />
                <TouchableOpacity
                    onPress={() => { setImages(images.filter((v,i) => i != index)) }}
                    style={{position: "absolute", top: -10, right: -10, zIndex: 10}}>
                    <Icon name={"close-circle"} size={20} color={"gray"}/>
                </TouchableOpacity>
            </View>
        )
    }

    const onPressAddPhotoBtn = () => {
        ImagePicker.openPicker({
            multiple: true,
            mediaType: "photo"
        }).then(selectedImages => {
            if (selectedImages.length + images.length > 10) {
                alert("최대 10장까지 업로드 가능합니다.");
            } else {
                const paths = selectedImages.map(selectedImage => selectedImage.path);
                setImages([...images, ...paths]);
            }
        });
    }

    let imageCount = images ? images.length : 0;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.top}>
                <View style={styles.topContentContainer}>
                    <View style={styles.photoContainer}>
                        <AddPhotoBtn onPress={onPressAddPhotoBtn} imageCount={imageCount}/>
                        <FlatList style={styles.selectedImagesContainer} contentContainerStyle={{alignItems: "center", width:'100%'}} horizontal={true} data={images}
                                  renderItem={renderSelectedImages}/>
                    </View>
                    <View style={styles.titleContainer}>
                        <TextInput
                            style={styles.titleTextInput}
                            onChangeText={onChangeTitle}
                            value={title}
                            placeholder={"제목을 입력해 주세요."}
                            placeholderTextColor={theme.colors.normalText}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.contentsContainer}>
                <View style={styles.contentsContentContainer}>
                    <TextInput
                        onChangeText={onChangeContents}
                        value={contents}
                        placeholder={"사진에 대해 설명해주세요."}
                        placeholderTextColor={theme.colors.normalText}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    top: {
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    topContentContainer: {
        width: '94%',
        flex: 1
    },

    photoContainer: {
        flex: 1.5,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border
    },

    selectedImagesContainer: {
        height: '80%',
    },

    titleContainer: {
        flex: 1
    },

    titleTextInput: {},

    contentsContainer: {
        borderTopWidth: 6,
        borderTopColor: theme.colors.border,
        height: '75%',
        alignItems: 'center'
    },

    contentsContentContainer: {
        width: '94%',
    }
});
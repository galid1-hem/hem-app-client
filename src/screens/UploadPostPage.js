import * as React from "react";
import {SafeAreaView, View, Text, StyleSheet, Image, TextInput, FlatList, TouchableOpacity} from "react-native";
import AddPhotoBtn from "../component/AddPhotoBtn";
import {theme} from "@app/assets/theme/Color";
import ImagePicker from "react-native-image-crop-picker";
import Icon from 'react-native-vector-icons/Ionicons';
import OkBtn from "../component/OkBtn";
import {useDispatch} from "react-redux";
import {uploadPost} from "../store/post";
import {imageApi} from "../network/ImageApi";

function verifyUploadPostCondition(title, contents) {
    return title && contents;
}

export default function UploadPostPage({route, navigation}) {
    const [title, onChangeTitle] = React.useState("");
    const [contents, onChangeContents] = React.useState("");
    const [images, setImages] = React.useState([]);
    const dispatch = useDispatch();

    // 수정 요청
    if (route.params?.post) {
        React.useEffect(() => {
            const post = route.params.post;
            onChangeTitle(post?.title);
            onChangeContents(post?.contents[0]?.value);
        }, []);
    }

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
                    onPress={() => {
                        setImages(images.filter((v, i) => i != index))
                    }}
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
                const paths = selectedImages.map(selectedImage => {
                    const pathParts = selectedImage.path.split("/");

                    return {
                        uri: selectedImage.path,
                        type: selectedImage.mime,
                        name: pathParts[pathParts.length - 1]
                    }
                });
                setImages([...images, ...paths]);
            }
        });
    }

    const onSubmit = () => {
        // image upload
        imageApi.uploadImage(createUploadImageRequestBody()).then(response => {
            let medias = response.data.data;

            // post upload
            dispatch(uploadPost(createUploadPostRequestBody(medias)));
            navigation.navigate("Home");
        })
            .catch(e => console.log(e));
    }

    const createUploadImageRequestBody = () => {
        const formData = new FormData();

        images.forEach(image => formData.append("files", image));
        formData.append("userId", 1);
        formData.append("imageType", "POST");
        formData.append("serviceType", "POST");

        return formData;
    }

    const createUploadPostRequestBody = (medias) => {
        return {
            regionId: 1,
            title: title,
            contents: [
                {
                    value: contents,
                    type: "TEXT"
                }
            ],
            mediaIds: medias
        }
    }

    let imageCount = images ? images.length : 0;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.top}>
                <View style={styles.topContentContainer}>
                    <View style={styles.photoContainer}>
                        <AddPhotoBtn onPress={onPressAddPhotoBtn} imageCount={imageCount}/>
                        <FlatList style={styles.selectedImagesContainer}
                                  contentContainerStyle={{alignItems: "center", width: '100%'}} horizontal={true}
                                  data={images.map(value => value.uri)}
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
            <View style={styles.uploadBtnContainer}>
                <OkBtn onPress={onSubmit} activated={verifyUploadPostCondition(title, contents)} text={"게시하기"}/>
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
        height: '68%',
        alignItems: 'center'
    },

    contentsContentContainer: {
        width: '94%',
    },

    uploadBtnContainer: {
        height: "7%",
        width: "100%",
    },
});
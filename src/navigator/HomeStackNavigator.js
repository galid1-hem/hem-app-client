import UploadPostPage from "../screens/UploadPostPage";
import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import HomePage from "../screens/HomePage";
import PostDetailsPage from "../screens/PostDetailsPage";
import WriteCommentPage from "../screens/WriteCommentPage";

const Stack = createStackNavigator();

export default function HomeStackNavigator({navigation}) {
    return (
        <Stack.Navigator>
            <Stack.Screen name={"Home"} component={HomePage}/>
            <Stack.Screen name={"UploadPost"} component={UploadPostPage}/>
            <Stack.Screen name={"PostDetails"} component={PostDetailsPage}/>
            <Stack.Screen name={"Comment"} component={WriteCommentPage}/>
        </Stack.Navigator>
    );
}
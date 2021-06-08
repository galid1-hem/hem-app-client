import StackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import CommentPage from "../screens/CommentPage";
import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import PostDetailsPage from "../screens/PostDetailsPage";

const Stack = createStackNavigator();

export default function PostStackNavigator({navigation}) {
    return (
        <Stack.Navigator>
            <Stack.Screen name={"PostDetails"} component={PostDetailsPage}/>
            <Stack.Screen name={"Comment"} component={CommentPage}/>
        </Stack.Navigator>
    )
}

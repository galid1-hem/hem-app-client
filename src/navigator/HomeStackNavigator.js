import UploadPostPage from "../screens/UploadPostPage";
import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import HomePage from "../screens/HomePage";
import PostStackNavigator from "./PostStackNavigator";

const Stack = createStackNavigator();

export default function HomeStackNavigator({navigation}) {
    return (
        <Stack.Navigator>
            <Stack.Screen name={"Home"} component={HomePage}/>
            <Stack.Screen name={"UploadPost"} component={UploadPostPage}/>
            <Stack.Screen name={"PostStackNavigator"} component={PostStackNavigator} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}
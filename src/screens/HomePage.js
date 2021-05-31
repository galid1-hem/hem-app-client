import * as React from "react";
import { SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import PlusBtn from "../component/PlusBtn";
import UploadPostPage from "./UploadPostPage";

const Stack = createStackNavigator();

function HomePage({navigation}) {
    return (
        <SafeAreaView>
            <PlusBtn onPress={()=> navigation.navigate("UploadPost")}/>
        </SafeAreaView>
    )
}

export default function HomeStackNavigator({navigation}) {
    return (
        <Stack.Navigator>
            <Stack.Screen name={"Home"} component={HomePage}/>
            <Stack.Screen name={"UploadPost"} component={UploadPostPage}/>
        </Stack.Navigator>
    );
}
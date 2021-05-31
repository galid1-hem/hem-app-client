import * as React from "react";
import { SafeAreaView, Button} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import PlusBtn from "../component/PlusBtn";
import CreatePostPage from "./CreatePostPage";

const Stack = createStackNavigator();

function HomePage({navigation}) {
    return (
        <SafeAreaView>
            <PlusBtn onPress={()=> navigation.navigate("CreatePost")}/>
        </SafeAreaView>
    )
}

export default function HomeStackNavigator({navigation}) {
    return (
        <Stack.Navigator>
            <Stack.Screen name={"Home"} component={HomePage}/>
            <Stack.Screen name={"CreatePost"} component={CreatePostPage}/>
        </Stack.Navigator>
    );
}
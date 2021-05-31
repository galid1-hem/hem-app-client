import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyPage from "./MyPage";
import Icon from 'react-native-vector-icons/Ionicons'
import HomeStackNavigator from "./HomePage";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'home'
                                : 'home-outline';
                        }
                        else if (route.name === 'My') {
                            iconName = focused
                                ? 'person'
                                : 'person-outline';
                        }
                        return <Icon name={iconName} size = {30}/>;
                    }

                })}
                tabBarOptions={{
                    activeTintColor: 'black',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="Home" component={HomeStackNavigator} />
                <Tab.Screen name="My" component={MyPage} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

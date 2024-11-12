// MainNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InYourAreaScreen from './InYourAreaScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Home') iconName = 'home';
                    else if (route.name === 'Messages') iconName = 'message';
                    else if (route.name === 'Notifications') iconName = 'notifications';
                    else if (route.name === 'Profile') iconName = 'person';
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#f2b636',
                tabBarInactiveTintColor: '#888',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={InYourAreaScreen} />
            <Tab.Screen name="Messages" component={InYourAreaScreen} />
            <Tab.Screen name="Notifications" component={InYourAreaScreen} />
            <Tab.Screen name="Profile" component={InYourAreaScreen} />
        </Tab.Navigator>
    );
};

export default MainNavigator;

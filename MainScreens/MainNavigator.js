// MainNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InYourAreaScreen from './InYourAreaScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import InYourAreaStack from './InYourAreaStack';
import ProfileStack from './ProfileScreens/ProfileStack';
import MyNormalProfile from './ProfileScreens/MyNormalProfile';

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
                tabBarActiveTintColor: '#FF914D',
                tabBarInactiveTintColor: '#ccc',
                headerShown: false,
                tabBarShowLabel: false, 
                tabBarItemStyle: {
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: 5,
                    backgroundColor: '#fff',
                }
            })}
        >
            <Tab.Screen name="Home" component={InYourAreaStack}/>
            <Tab.Screen name="Messages" component={InYourAreaScreen} />
            <Tab.Screen name="Notifications" component={InYourAreaScreen} />
            <Tab.Screen name="Profile" component={ProfileStack} />
        </Tab.Navigator>
    );
};

export default MainNavigator;

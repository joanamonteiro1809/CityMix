// ProfileStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TourGuideProfile from './TourGuideProfile';
import AddTourProfile from './AddTourProfile';
import TourDetailScreen from '../PaidScreens/TourDetailScreen';

const Stack = createStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator initialRouteName="TourGuideProfile" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TourGuideProfile" component={TourGuideProfile} options={{ headerShown: false }} />
            <Stack.Screen name="AddTourProfile" component={AddTourProfile} options={{ headerShown: false }} />
            <Stack.Screen name="TourDetails" component={TourDetailScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default ProfileStack;

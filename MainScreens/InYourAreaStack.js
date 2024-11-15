// InYourAreaStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InYourAreaScreen from './InYourAreaScreen';
import VisitsScreen from './VisitsScreens';
import TourDetailScreen from './PaidScreens/TourDetailScreen';
import TourBookingScreen from './PaidScreens/TourBookingScreen';

const Stack = createStackNavigator();

const InYourAreaStack = () => {
    return (
        <Stack.Navigator initialRouteName="InYourArea" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="InYourArea" component={InYourAreaScreen} options={{ headerShown: false }} />
            <Stack.Screen name="VisitsScreen" component={VisitsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourDetails" component={TourDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourBooking" component={TourBookingScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default InYourAreaStack;

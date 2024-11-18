// InYourAreaStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InYourAreaScreen from './InYourAreaScreen';
import VisitsScreen from './VisitsScreens';
import TourDetailScreen from './PaidScreens/TourDetailScreen';
import TourBookingScreen from './PaidScreens/TourBookingScreen';
import FilterScreen from './FilterScreen';
import PopupPaid from './PaidScreens/PopupPaid';
import MyNormalProfile from './ProfileScreens/MyNormalProfile';
import MapScreen from '../GeneralElements/MapScreen';
import GroupDetail from './GroupScreens/GroupDetail';
import OtherPersonProfile from './ProfileScreens/OtherPersonProfile';

const Stack = createStackNavigator();

const InYourAreaStack = () => {
    return (
        <Stack.Navigator initialRouteName="InYourArea" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="InYourArea" component={InYourAreaScreen} options={{ headerShown: false }} />
            <Stack.Screen name="VisitsScreen" component={VisitsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourDetails" component={TourDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourBooking" component={TourBookingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Filter" component={FilterScreen} options={{ presentation: 'modal', headerShown: false}} />
            <Stack.Screen name="PopupPaid" component={PopupPaid} options={{ presentation: 'modal', headerShown: false}} />
            <Stack.Screen name="NormalProfile" component={MyNormalProfile} options={{ headerShown: false }} />
            <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
            <Stack.Screen name="GroupDetail" component={GroupDetail} options={{ headerShown: false }} />
            <Stack.Screen name="OtherPersonProfile" component={OtherPersonProfile} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default InYourAreaStack;

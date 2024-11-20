// ProfileStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TourGuideProfile from './TourGuideProfile';
import AddTourProfile from './AddTourProfile';
import TourDetailScreen from '../PaidScreens/TourDetailScreen';
import IndividualMessage from '../MessagesScreens/IndividualMessage';
import GroupMessage from '../MessagesScreens/GroupMessage';
import CreateInvitation from '../MessagesScreens/CreateInvitation';
import OtherPersonProfile from './OtherPersonProfile';

const Stack = createStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator initialRouteName="TourGuideProfile" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TourGuideProfile" component={TourGuideProfile} options={{ headerShown: false }} />
            <Stack.Screen name="AddTourProfile" component={AddTourProfile} options={{ headerShown: false }} />
            <Stack.Screen name="TourDetails" component={TourDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OtherPersonProfile" component={OtherPersonProfile} options={{ headerShown: false }} />
            <Stack.Screen name="IndividualMessage" component={IndividualMessage} options={{ headerShown: false }} />
             <Stack.Screen name="GroupMessage" component={GroupMessage} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default ProfileStack;

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
import IndividualMessage from './MessagesScreens/IndividualMessage';
import GroupMessage from './MessagesScreens/GroupMessage';
import CreateInvitation from './MessagesScreens/CreateInvitation';
import SearchScreen from '../GeneralElements/SearchScreen';
import CreateTourScreen from './ProfileScreens/AddTourProfile';
import GroupEntry from './GroupScreens/GroupEntry';
import TourGuideProfile from './ProfileScreens/TourGuideProfile';

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
            <Stack.Screen name="GuideProfile" component={TourGuideProfile} options={{ headerShown: false }} />
            
            <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
            <Stack.Screen name="GroupEntry" component={GroupEntry} options={{ headerShown: false }} />
            <Stack.Screen name="GroupDetail" component={GroupDetail} options={{ headerShown: false }} />
            <Stack.Screen name="OtherPersonProfile" component={OtherPersonProfile} options={{ headerShown: false }} />
            <Stack.Screen name="IndividualMessage" component={IndividualMessage} options={{ headerShown: false }} />
            <Stack.Screen name="GroupMessage" component={GroupMessage} options={{ headerShown: false }} />
            <Stack.Screen name="CreateInvitation" component={CreateInvitation} options={{ headerShown: false }} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddTour" component={CreateTourScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default InYourAreaStack;

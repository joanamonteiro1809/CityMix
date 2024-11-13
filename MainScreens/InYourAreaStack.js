// InYourAreaStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InYourAreaScreen from './InYourAreaScreen';
import IndividualScreen from './IndividualScreen';
import GroupScreen from './GroupScreen';
import PaidToursScreen from './PaidToursScreen';
import VisitsScreen from './VisitsScreens';
import MainNavigator from './MainNavigator';

const Stack = createStackNavigator();

const InYourAreaStack = () => {
    return (
        <Stack.Navigator initialRouteName="InYourArea" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="InYourArea" component={InYourAreaScreen} />
            <Stack.Screen name="Individual" component={IndividualScreen} />
            <Stack.Screen name="GroupScreen" component={GroupScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PaidToursScreen" component={PaidToursScreen} options={{ headerShown: false }} />
            <Stack.Screen name="VisitsScreen" component={VisitsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default InYourAreaStack;

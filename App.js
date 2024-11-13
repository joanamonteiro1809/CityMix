// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupStep1 from './SignupComponents/SignupStep1';
import SignupStep2 from './SignupComponents/SignupStep2';
import LoginScreen from './LoginScreen';
import MainNavigator from './MainScreens/MainNavigator';
import IndividualScreen from './MainScreens/IndividualScreen';
import VisitsScreen from './MainScreens/VisitsScreens';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
            <Stack.Navigator initialRouteName="VisitsScreen">
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignupStep1" component={SignupStep1} options={{ headerShown: false }} />
                <Stack.Screen name="SignupStep2" component={SignupStep2} options={{ headerShown: false }} />
                <Stack.Screen name="HomeScreen" component={MainNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="IndividualScreen" component={IndividualScreen} options={{ headerShown: false }} />
                <Stack.Screen name="VisitsScreen" component={VisitsScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
    </NavigationContainer>
  );
}
import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '../components/navigation/TabBarIcon';
import { Colors } from '../constants/constants/Colors';
import { useColorScheme } from '../hooks/hooks/useColorScheme.web';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'chatbubbles' : 'chatbubbles-outline'} color={color} />
          ),
        }}
      />
    <Tabs.Screen
      name="notifications"
      options={{
        title: 'Notifications',
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon name={focused ? 'notifications' : 'notifications-outline'} color={color} />
        ),
      }}
    />
     <Tabs.Screen
             name="profile"
             options={{
               title: 'Profile',
               tabBarIcon: ({ color, focused }) => (
                 <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
         ),
       }}
     />
   </Tabs>
  );
}

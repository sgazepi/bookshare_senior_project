import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import {CartProvider} from '../CartContext.js';

import HomeStackScreen from './stacks/HomeStackScreen.js';
import MyBooksStackScreen from './stacks/MyBooksStackScreen.js';
import ProfileStackScreen from './stacks/ProfileStackScreen.js';


export default function BottomTabNavigatorScreen() {
  const BottomTab = createBottomTabNavigator();
  return (
    <CartProvider>
        <BottomTab.Navigator>
            <BottomTab.Screen name="Rentals" component={HomeStackScreen} options={{ headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={25} color="blue"  />
            ),
            }} />
            <BottomTab.Screen name="My Books" component={MyBooksStackScreen} options={{ headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="book" size={25} color="blue"  />
            ),
            }} />
            <BottomTab.Screen name="My Profile" component={ProfileStackScreen} options={{ headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle" size={25} color="blue"  />
            ),
            }} />
        </BottomTab.Navigator>
    </CartProvider>
  );
}
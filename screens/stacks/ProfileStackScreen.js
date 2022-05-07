import React from 'react';
import {TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../ProfileScreen.js';
import UpcomingReservationsScreen from '../UpcomingReservationsScreen.js';
import BidsPlacedScreen from '../BidsPlacedScreen.js';

import {loggingOut} from '../../API/firebaseMethods';

export default function ProfileStackScreen() {
  const ProfileStack = createNativeStackNavigator();
  return (
    <ProfileStack.Navigator>
       <ProfileStack.Screen name='Profile' component={ProfileScreen} options={({ navigation }) => ({
        title: 'Profile',
        headerRight: () => 
        <TouchableOpacity onPress={()=>{loggingOut()}}>
          <Ionicons name="log-out" size={30} color="blue"></Ionicons>
        </TouchableOpacity>
      })} />
      <ProfileStack.Screen name='BidsPlaced' component={BidsPlacedScreen} options={({ navigation }) => ({
        title: 'Bids Placed',
        headerRight: () => 
        <TouchableOpacity onPress={()=>{loggingOut()}}>
          <Ionicons name="log-out" size={30} color="blue"></Ionicons>
        </TouchableOpacity>
      })} />
      <ProfileStack.Screen name='UpcomingReservations' component={UpcomingReservationsScreen} options={({ navigation }) => ({
        title: 'Upcoming Reservations',
        headerRight: () => 
        <TouchableOpacity onPress={()=>{loggingOut()}}>
          <Ionicons name="log-out" size={30} color="blue"></Ionicons>
        </TouchableOpacity>
      })} />
    </ProfileStack.Navigator>
  );
}
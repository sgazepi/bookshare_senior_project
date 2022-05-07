import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyBooksScreen from '../MyBooksScreen.js';
import RentNewBookScreen from '../RentNewBookScreen.js';
import MyTextbookBidsScreen from '../MyTextbookBidsScreen.js';

export default function MyBooksStackScreen() {
  const MyBooksStack = createNativeStackNavigator();
  return (
    <MyBooksStack.Navigator>
       <MyBooksStack.Screen name='MyBooks' component={MyBooksScreen} options={({ navigation }) => ({
        title: 'My books',
      })} />
      <MyBooksStack.Screen name='RentNewBook' component={RentNewBookScreen} options={({ navigation }) => ({
        title: 'Rent New Book',
      })} />
      <MyBooksStack.Screen name='MyTextbookBids' component={MyTextbookBidsScreen} options={({ navigation }) => ({
        title: 'My Textbook Bids',
      })} />
    </MyBooksStack.Navigator>
  );
}
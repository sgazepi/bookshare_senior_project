import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TextbooksList from '../TextbooksList.js';
import TextbookDetails from '../TextbookDetails.js';
import Cart from '../Cart.js';
import Checkout from '../Checkout.js';

import {CartIcon} from '../../components/CartIcon.js';

export default function HomeStackScreen() {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name='TextbooksList' component={TextbooksList} options={({ navigation }) => ({
        title: 'Textbooks',
        headerRight: () => <CartIcon navigation = {navigation}/>,
      })} />
      <HomeStack.Screen name='TextbookDetails' component={TextbookDetails} options={({ navigation }) => ({
        title: 'Details',
        headerRight: () => <CartIcon navigation = {navigation}/>,
      })} />
      <HomeStack.Screen name='Cart' component={Cart} options={({ navigation }) => ({
        title: 'My Cart',
        headerRight: () => <CartIcon navigation = {navigation}/>,
      })} />
      <HomeStack.Screen name='Checkout' component={Checkout} options={({ navigation }) => ({
        title: 'Checkout',
      })} />
    </HomeStack.Navigator>
  );
}
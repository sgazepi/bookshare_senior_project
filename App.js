import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {SignUpScreen} from './screens/SignUpScreen.js';
import {SignInScreen} from './screens/SignInScreen.js';
import {LoadingScreen} from './screens/LoadingScreen.js';
import {HomeScreen} from './screens/HomeScreen.js';
import BottomTabNavigatorScreen from './screens/BottomTabNavigatorScreen.js';


export default function App() {

  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
          <Stack.Screen name="BottomTap" component={BottomTabNavigatorScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}



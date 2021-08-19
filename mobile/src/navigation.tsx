import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/home';
import ClientScreen from './screens/client';

import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen}/>
    <Stack.Screen name="Client" component={ClientScreen}/>
  </Stack.Navigator>
);

export const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
);

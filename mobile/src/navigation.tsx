import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/home';

import { RootStackParamList } from '@/types';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen}/>
  </Stack.Navigator>
);

export const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
);

import * as React from 'react';
import {StatusBar, Platform} from 'react-native';
import {AppNavigator} from './src/navigation';

StatusBar.setBarStyle('dark-content')

if (Platform.OS === 'android') {
  StatusBar.setTranslucent(false)
  StatusBar.setBackgroundColor('white')
}

export default function App(): JSX.Element {
  return (
    <AppNavigator/>
  );
};

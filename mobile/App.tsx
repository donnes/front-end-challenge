import * as React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import {StatusBar, Platform} from 'react-native';
import {AppNavigator} from './src/navigation';
import {theme} from './src/theme';

StatusBar.setBarStyle('dark-content')

if (Platform.OS === 'android') {
  StatusBar.setTranslucent(false)
  StatusBar.setBackgroundColor('white')
}

export default function App(): JSX.Element {
  return (
    <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
      <AppNavigator/>
    </ApplicationProvider>
  );
};

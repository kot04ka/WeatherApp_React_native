// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import CurrentWeather from './screens/CurrentWeather';
import Forecast from './screens/Forecast';
import DayDetails from './screens/DayDetails';
import Settings from './screens/Settings';
import About from './screens/About';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ title: 'Погода' }} />
        <Stack.Screen name="CurrentWeather" component={CurrentWeather} options={{ title: 'Поточна Погода' }} />
        <Stack.Screen name="Forecast" component={Forecast} options={{ title: 'Прогноз' }} />
        <Stack.Screen name="DayDetails" component={DayDetails} options={{ title: 'Деталі дня' }} />
        <Stack.Screen name="Settings" component={Settings} options={{ title: 'Налаштування' }} />
        <Stack.Screen name="About" component={About} options={{ title: 'Про додаток' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WorkoutProvider } from './src/context/WorkoutContext'; // <-- new import

import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import MainScreen from './src/screens/MainScreen';
import WorkoutScreen from './src/screens/WorkoutScreen';
import AccountScreen from './src/screens/AccountScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <WorkoutProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name='Workout' component ={WorkoutScreen} />
          <Stack.Screen name='Account' component ={AccountScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </WorkoutProvider>
  );
}

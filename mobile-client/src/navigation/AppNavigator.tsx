import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenu from '../screens/MainMenu';
import GameScreen from '../screens/GameScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainMenu">
        <Stack.Screen 
          name="MainMenu" 
          component={MainMenu}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="GameScreen" 
          component={GameScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 
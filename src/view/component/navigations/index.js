import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Navigations = () => {
  return(
    <NavigationContainer>
      <Stack.Screen>
        
      </Stack.Screen>
    </NavigationContainer>
  )
};

export default Navigations;
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import InitView from '../../page/initView';

const Stack = createStackNavigator();
const Navigations = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerMode: false}}
        initialRouteName="InitView">
        <Stack.Screen name={'InitView'} component={InitView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigations;

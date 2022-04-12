import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import InitView from '../../page/initView';
import DetailView from '../../page/detailView';
import TopUpView from '../../page/topUpView';

const Stack = createNativeStackNavigator();
const Navigations = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerMode: false, headerShown: false}}
        initialRouteName="InitView">
        <Stack.Screen name={'InitView'} component={InitView} />
        <Stack.Screen name={'DetailView'} component={DetailView} />
        <Stack.Screen name={'TopUpView'} component={TopUpView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigations;

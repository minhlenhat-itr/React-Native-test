import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {EnumRouteName} from '../../../constants';
import InitView from '../../page/initView';
import HookView from '../../page/hookView';
import ComponentView from '../../page/componentView';

const Stack = createStackNavigator();
const Navigations = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={EnumRouteName.InitView}>
        <Stack.Screen name={EnumRouteName.InitView} component={InitView} />
        <Stack.Screen name={EnumRouteName.HookView} component={HookView} />
        <Stack.Screen
          name={EnumRouteName.ComponentView}
          component={ComponentView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigations;

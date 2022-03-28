import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {EnumRouteName} from '../../../constants';
import InitView from '../../page/initView';
import HookView from '../../page/hookView';
import ComponentView from '../../page/componentView';
import SignUp from '../../page/signUp';

const Stack = createNativeStackNavigator();
const Navigations = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={EnumRouteName.InitView}>
        <Stack.Screen
          options={{}}
          name={EnumRouteName.InitView}
          component={InitView}
        />
        {/* <Stack.Screen
          options={{title: 'MultiForm'}}
          name={EnumRouteName.HookView}
          component={HookView}
        /> */}
        <Stack.Screen
          options={{title: 'MultiForm'}}
          name={EnumRouteName.SignUp}
          component={SignUp}
        />
        <Stack.Screen
          options={{title: 'Single Form'}}
          name={EnumRouteName.ComponentView}
          component={ComponentView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigations;

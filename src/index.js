import React from 'react';
import {View, Text} from 'react-native';
import {Menu, MenuProvider} from 'react-native-popup-menu';
import Navigations from './view/component/navigations';

const App = () => {
  return (
    <MenuProvider>
      <Navigations />
    </MenuProvider>
  );
};

export default App;

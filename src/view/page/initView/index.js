import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {useTheme} from 'react-native-themed-styles';
import themedStyles from './styles';
import {useForm, Controller, useController} from 'react-hook-form';

const InitView = () => {
  const [styles, theme] = useTheme(themedStyles );
  return <View style={styles.container} />;
};

export default InitView;

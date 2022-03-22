import React from 'react';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-themed-styles';
import themedStyles from './styles';
import {useForm, Controller, useController} from 'react-hook-form';
import {EnumRouteName} from '../../../constants';
import {useEffect} from 'react/cjs/react.production.min';

const InitView = props => {
  const [styles, theme] = useTheme(themedStyles);
  const {navigation} = props;

  // useEffect(() => {
  //   navigation.navigate(EnumRouteName.HookView);
  // }, [props]);

  return (
    <View style={styles.container}>
      <View style={styles.btnStyle}>
        <Button
          title="Controller HOOK"
          onPress={() => {
            navigation.navigate(EnumRouteName.ComponentView);
          }}
        />
      </View>
      <Button
        title="Controller COMPONENT"
        onPress={() => {
          navigation.navigate(EnumRouteName.HookView);
        }}
      />
    </View>
  );
};

export default InitView;

import React, {useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  NativeModules,
  Platform,
} from 'react-native';
import {useTheme} from 'react-native-themed-styles';
import themedStyles from './styles';
import {EnumRouteName} from '../../../constants';

import {getCurrentCCMConsent, queryLatestAppVersion} from '../../appSettings';

const {UserInfoModule} = NativeModules;

const InitView = props => {
  const [styles, theme] = useTheme(themedStyles);
  const {navigation} = props;

  return (
    <View style={styles.container}>
      <View style={styles.btnStyle}>
        <Button
          title="SINGLE-FORM"
          onPress={() => {
            navigation.navigate(EnumRouteName.ComponentView);
          }}
        />
      </View>
      <Button
        title="MULTI-FORM"
        onPress={() => {
          navigation.navigate(EnumRouteName.SignUp);
        }}
      />
    </View>
  );
};

export default InitView;

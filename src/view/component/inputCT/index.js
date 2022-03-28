import React from 'react';
import {Controller} from 'react-hook-form';
import {Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import {useTheme} from 'react-native-themed-styles';
import themedStyles from './styles';

const InputCT = props => {
  const {title, onChange, onBlur, value, error, secureTextEntry} = props;
  const [styles, color] = useTheme(themedStyles);

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        placeholder={title}
        autoCapitalize="none"
        secureTextEntry={secureTextEntry}
        onChangeText={onChange} // send value to hook form
        onBlur={onBlur} // notify when input is touched/blur
        value={value} // input value// send down the input name
      />
      {!!error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
};

InputCT.defaultProps = {
  error: {},
  onChange: () => {},
  onBlur: () => {},
  value: '',
  secureTextEntry: false,
};

InputCT.propTypes = {
  error: PropTypes.object,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  secureTextEntry: PropTypes.bool,
};

export default InputCT;

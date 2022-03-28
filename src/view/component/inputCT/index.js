import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {Controller} from 'react-hook-form';
import {Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import {useTheme} from 'react-native-themed-styles';
import themedStyles from './styles';

const InputCT = (props, ref) => {
  const {
    title,
    onChange,
    onBlur,
    value,
    error,
    secureTextEntry,
    onSubmitEditing,
    blurOnSubmit,
  } = props;
  const [styles, color] = useTheme(themedStyles);
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef?.current?.focus();
    },
    clear() {
      inputRef?.current?.clear();
    },
  }));

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder={title}
        autoCapitalize="none"
        secureTextEntry={secureTextEntry}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={blurOnSubmit}
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
  onSubmitEditing: () => {},
  blurOnSubmit: () => {},
};

InputCT.propTypes = {
  error: PropTypes.object,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  onSubmitEditing: PropTypes.func,
  blurOnSubmit: PropTypes.bool,
};

export default forwardRef(InputCT);

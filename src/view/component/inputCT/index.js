import React, {forwardRef, useRef, useImperativeHandle, useState} from 'react';
import Proptypes from 'prop-types';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useTheme} from 'react-native-themed-styles';
import Svgs from '../../../assets/images/svg';
import themedStyles from './styles';
import globalStyles from '../../../constants/globalStyles';

/**
 * @param type:  "NORMAL", "SELECT", "IOS"
 */

const InputCT = forwardRef((props, ref) => {
  const [styles, theme] = useTheme(themedStyles);
  const [glbStyles] = useTheme(globalStyles);
  const inputRef = useRef(null);
  const [isFocus, setFocus] = useState(false);

  const {
    type,
    customStyle,
    icon,
    value,
    placeholder,
    title,
    hasBaseLine,
    onChangeText,
    onBlur,
    onSubmitEditing,
    error,
    editable,
    style,
    showCheckBox,
    onPress,
    onPressCheckbox,
    subInfo,
    amount,
    iconRight,
  } = props;

  useImperativeHandle(ref, () => ({
    focus() {
      console.log('ref focus');
      inputRef?.current?.focus();
    },
    clear() {
      console.log('ref clear');
      inputRef?.current?.clear();
    },
  }));

  const onInputFocus = () => {
    setFocus(true);
  };

  const onInputBlur = () => {
    setFocus(false);
  };

  return (
    <TouchableOpacity
      disabled={type === 'NORMAL' || !editable}
      onPress={onPress}
      style={[styles.coverView, style]}>
      {showCheckBox && (
        <View>
          <TouchableOpacity onPress={onPressCheckbox} style={styles.checkbox}>
            <SvgXml xml={Svgs.checked_circle} fill={'black'} />
          </TouchableOpacity>
        </View>
      )}
      <View style={glbStyles.flex1}>
        <View
          style={[
            styles.container,
            (hasBaseLine || isFocus || !!value) && editable && styles.baseLine,
          ]}>
          <SvgXml
            style={styles.startIcon}
            xml={icon}
            width={20}
            height={20}
            fill={editable ? 'black' : 'gray'}
          />
          <View style={styles.mainView}>
            {(isFocus || !!value) && (
              <Text
                style={{
                  color: isFocus ? theme.green1 : !editable ? 'gray' : 'black',
                }}>
                {title}
              </Text>
            )}
            <View style={styles.inputContainer}>
              <TextInput
                editable={type !== 'SELECT'}
                ref={inputRef}
                style={[styles.input, {color: 'black'}]}
                blurOnSubmit={false}
                placeholder={placeholder}
                numberOfLines={1}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                onSubmitEditing={onSubmitEditing}
                onChangeText={onChangeText}
                value={value}
              />
            </View>
          </View>

          {!!iconRight && (
            <SvgXml
              style={{alignSelf: 'center', marginRight: 15}}
              xml={iconRight}
              fill={theme.blue}
            />
          )}

          {(!editable || showCheckBox) && <View style={styles.disableView} />}
        </View>
        {(!!subInfo || !!amount) && (
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginLeft: 50,
            }}>
            <Text>{subInfo}</Text>
            <Text>{amount}</Text>
          </View>
        )}
        {!!error && (
          <View style={styles.error}>
            <Text style={styles.txtError}>{error}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
});

export default InputCT;

InputCT.displayName = 'InputCT';

InputCT.defaultProps = {
  onPress: () => {},
  onPressCheckbox: () => {},
  icon: '',
  title: '',
  placeholder: '',
  value: '',
  hasBaseLine: false,
  onBlur: () => {},
  onChangeText: () => {},
  onSubmitEditing: () => {},
  editable: true,
  error: '',
  customStyle: {},
  type: 'NORMAL',
  style: {},
  showCheckBox: false,
  subInfo: '',
  amount: '',
  iconRight: '',
};

InputCT.propTypes = {
  onPress: Proptypes.func,
  onPressCheckbox: Proptypes.func,
  style: Proptypes.object,
  icon: Proptypes.string,
  title: Proptypes.string,
  placeholder: Proptypes.string,
  value: Proptypes.string,
  hasBaseLine: Proptypes.bool,
  onChangeText: Proptypes.func,
  onBlur: Proptypes.func,
  onSubmitEditing: Proptypes.func,
  editable: Proptypes.bool,
  error: Proptypes.string,
  customStyle: Proptypes.object,
  type: Proptypes.string,
  showCheckBox: Proptypes.bool,
  subInfo: Proptypes.string,
  amount: Proptypes.string,
  iconRight: Proptypes.string,
};

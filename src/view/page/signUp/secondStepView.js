import React, {useState} from 'react';
import {View, Text} from 'react-native';
import themedStyle from './styles';
import {useTheme} from 'react-native-themed-styles';
import {useForm, Controller} from 'react-hook-form';
import {TouchableOpacity} from 'react-native-gesture-handler';
import InputCT from '../../component/inputCT';
import {SvgXml} from 'react-native-svg';
import Svgs from '../../../assets/images/svg';
import PropTypes from 'prop-types';

const SecondStepView = props => {
  const {onSubmit, onPressBack} = props;
  const [styles] = useTheme(themedStyle);
  const {
    control,
    setError,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmitStep2 = data => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Confirm password is not match!',
      });
      return;
    }
    onSubmit(data);
  };

  const onError = (error, event) => {
    //only catch rules error, but not catch undefined props or Error handle in onSubmit (call API, run async task, ...)
    console.log('error submit: ', error);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Password cannot be empty!',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <InputCT
              title="Password"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              error={errors.password}
              secureTextEntry={true}
            />
          )}
          name="password"
        />

        <Controller
          control={control}
          rules={{
            required: 'Confirm password cannot be empty!',
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <InputCT
              title="Confirm Password"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              error={errors.confirmPassword}
              secureTextEntry={true}
            />
          )}
          name="confirmPassword"
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={onPressBack} style={styles.btnBack}>
          <SvgXml xml={Svgs.back} height={20} width={20} fill="black" />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={handleSubmit(onSubmitStep2, onError)}
            style={styles.btnSubmit}>
            <Text style={styles.lbl}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

SecondStepView.defaultProps = {
  onSubmit: () => {},
  onPressBack: () => {},
};

SecondStepView.propTypes = {
  onSubmit: PropTypes.func,
  onPressBack: PropTypes.func,
};

export default SecondStepView;

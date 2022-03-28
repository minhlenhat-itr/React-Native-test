import React, {useEffect} from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import themedStyle from './styles';
import globalStyles from '../../../constants/globalStyles';
import {useTheme} from 'react-native-themed-styles';
import {useForm, Controller} from 'react-hook-form';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import InputCT from '../../component/inputCT';
import PropTypes from 'prop-types';
import {checkNull} from '../../../utils/validation';
import _ from 'lodash';

const FirstStepView = props => {
  const {onSubmitStep1} = props;
  const [styles] = useTheme(themedStyle);
  const [glbStyles] = useTheme(globalStyles);

  const {
    control,
    setError,
    setFocus,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  useEffect(() => {
    console.log(' isValid: ' + isValid);
  }, [isValid]);

  const onError = (error, event) => {
    //only catch rules error, but not catch undefined props or Error handle in onSubmit (call API, run async task, ...)
    console.log('error submit: ', error);
  };

  const onSubmit = data => {
    const emailError = checkNull([
      {value: data.email, isRequired: true, field: 'email'},
    ]);

    if (!_.isEmpty(emailError)) {
      setError('email', {type: 'manual', message: 'Wrong email format!'});
      return;
    }
    onSubmitStep1(data);
  };

  return (
    <View style={glbStyles.flex1}>
      <View style={glbStyles.flex1}>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'First name cannot be empty!',
            },
          }}
          render={({field: {onChange, onBlur, value, ref}}) => (
            <InputCT
              ref={ref}
              title="First name"
              onBlur={onBlur}
              blurOnSubmit={false}
              onChange={onChange}
              onSubmitEditing={() => {
                setFocus('lastName');
              }}
              value={value}
              error={errors.firstName}
            />
          )}
          name="firstName"
        />

        <Controller
          control={control}
          rules={{
            required: 'Last name cannot be empty!',
          }}
          render={({field: {onChange, onBlur, value, ref}}) => (
            <InputCT
              ref={ref}
              title="Last name"
              blurOnSubmit={false}
              onBlur={onBlur}
              onChange={onChange}
              onSubmitEditing={() => {
                setFocus('email');
              }}
              value={value}
              error={errors.lastName}
            />
          )}
          name="lastName"
        />
        <Controller
          control={control}
          rules={{
            required: 'Email cannot be empty!',
          }}
          render={({field: {onChange, onBlur, value, ref}}) => (
            <InputCT
              ref={ref}
              title="Email"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              error={errors.email}
            />
          )}
          name="email"
        />
      </View>

      <TouchableOpacity
        disabled={!isValid}
        onPress={handleSubmit(onSubmit, onError)}
        style={[
          styles.btnNext,
          {
            backgroundColor: isValid
              ? 'rgba(9, 138, 224, 1)'
              : 'rgba(9, 138, 224, 0.5)',
          },
        ]}>
        <Text style={styles.lbl}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

FirstStepView.defaultProps = {
  onSubmitStep1: () => {},
};

FirstStepView.propTypes = {
  onSubmitStep1: PropTypes.func,
};

export default FirstStepView;

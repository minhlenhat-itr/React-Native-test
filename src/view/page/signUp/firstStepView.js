import React from 'react';
import {View, Text} from 'react-native';
import themedStyle from './styles';
import {useTheme} from 'react-native-themed-styles';
import {useForm, Controller} from 'react-hook-form';
import {TouchableOpacity} from 'react-native-gesture-handler';
import InputCT from '../../component/inputCT';
import PropTypes from 'prop-types';
import {checkNull} from '../../../utils/validation';
import _ from 'lodash';

const FirstStepView = props => {
  const {onSubmitStep1} = props;
  const [styles] = useTheme(themedStyle);
  const {
    control,
    setError,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

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
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'First name cannot be empty!',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <InputCT
              title="First name"
              onBlur={onBlur}
              onChange={onChange}
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
          render={({field: {onChange, onBlur, value}}) => (
            <InputCT
              title="Last name"
              onBlur={onBlur}
              onChange={onChange}
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
          render={({field: {onChange, onBlur, value}}) => (
            <InputCT
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
        onPress={handleSubmit(onSubmit, onError)}
        style={styles.btnNext}>
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

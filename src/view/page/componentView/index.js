import React, {useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import themedStyle from './styles';
import {useTheme} from 'react-native-themed-styles';
import {useForm, Controller, useController} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {checkNull} from '../../../utils/validation';
import {yupResolver} from '@hookform/resolvers/yup';
import InputCT from '../../component/inputCT';
import _, {last} from 'lodash';
import * as yup from 'yup';

const ComponentView = () => {
  const [styles, color] = useTheme(themedStyle);

  const emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const schema = yup
    .object({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup
        .string()
        .email('Please enter a valid email')
        .required('Email address is required'),
      phoneNumber: yup.string().required(),
      password: yup.string().required(),
      confirmPassword: yup.string().required(),
    })
    .required();

  const {
    control,
    setValue,
    setFocus,
    handleSubmit,
    setError,
    formState: {errors, isValidating, isValid},
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
    shouldFocusError: true,
  });

  // useEffect(() => {
  //   setFocus('firstName');
  // }, [setFocus]);

  const onSubmit = (data, event) => {
    console.log(data);
    if (!_.isEqual(data.firstName, data.lastName)) {
      setError(
        'password',
        {
          type: 'manual',
          message: 'Password and confirm password are not the same!',
        },
        {
          shouldFocusError: true,
          shouldFocus: true,
        },
      );
    }

    //logic
  };

  const onError = (error, event) => {
    //only catch rules error, but not catch undefined props or Error handle in onSubmit (call API, run async task, ...)
    console.log('error submit: ', error);
  };

  useEffect(() => {
    console.log('errors: ', errors);
  }, [errors]);

  useEffect(() => {
    console.log('isValidating: ' + isValidating + ' isValid: ' + isValid);
  }, [isValidating, isValid]);
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Controller
            control={control}
            // rules={{
            //   required: {
            //     value: true,
            //     message: 'String cannot be empty!',
            //   },
            // }}
            render={({
              field: {onChange, onBlur, value, ref},
              fieldState: {invalid, isTouched, isDirty, error},
            }) => (
              <InputCT
                title={'First Name'}
                onBlur={onBlur}
                blurOnSubmit={false}
                onChange={onChange}
                onSubmitEditing={() => {
                  setFocus('lastName');
                }}
                value={value}
                ref={ref}
                error={errors.firstName}
              />
            )}
            name="firstName"
          />

          <Controller
            control={control}
            // rules={{
            //   required: {
            //     value: true,
            //     message: 'String cannot be empty!',
            //   },
            // }}
            render={({field: {onChange, onBlur, value, ref}}) => (
              <InputCT
                title={'Last Name'}
                onBlur={onBlur}
                blurOnSubmit={false}
                onChange={onChange}
                onSubmitEditing={() => {
                  setFocus('email');
                }}
                value={value}
                ref={ref}
                error={errors.lastName}
              />
            )}
            name="lastName"
          />

          <Controller
            control={control}
            // rules={{
            //   required: {
            //     value: true,
            //     message: 'String cannot be empty!',
            //   },
            //   pattern: {
            //     value: emailPattern,
            //     message: 'Wrong email format!',
            //   },
            // }}
            render={({field: {onChange, onBlur, value, ref}}) => (
              <InputCT
                title={'email'}
                onBlur={onBlur}
                blurOnSubmit={false}
                onChange={onChange}
                onSubmitEditing={() => {
                  setFocus('phoneNumber');
                }}
                value={value}
                ref={ref}
                error={errors.email}
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            // rules={{
            //   required: {
            //     value: true,
            //     message: 'String cannot be empty!',
            //   },
            // }}
            render={({field: {onChange, onBlur, value, ref}}) => (
              <InputCT
                title={'Phone number'}
                onBlur={onBlur}
                blurOnSubmit={false}
                onChange={onChange}
                onSubmitEditing={() => {
                  setFocus('password');
                }}
                value={value}
                ref={ref}
                error={errors.phoneNumber}
              />
            )}
            name="phoneNumber"
          />

          <Controller
            control={control}
            // rules={{
            //   required: {
            //     value: true,
            //     message: 'String cannot be empty!',
            //   },
            //   minLength: {
            //     value: 5,
            //     message: 'String cannot less than 5 chars',
            //   },
            // }}
            render={({field: {onChange, onBlur, value, ref}}) => (
              <InputCT
                title={'Password'}
                onBlur={onBlur}
                blurOnSubmit={false}
                onChange={onChange}
                onSubmitEditing={() => {
                  setFocus('confirmPassword');
                }}
                value={value}
                ref={ref}
                error={errors.password}
              />
            )}
            name="password"
          />
          <Controller
            control={control}
            // rules={{
            //   required: {
            //     value: true,
            //     message: 'String cannot be empty!',
            //   },
            //   minLength: {
            //     value: 5,
            //     message: 'String cannot less than 5 chars',
            //   },
            //   validate: {
            //     equalToPassword: value =>
            //       value.length < 10 || 'Password are not the same!',
            //   },
            // }}
            render={({field: {onChange, onBlur, value, ref}}) => (
              <InputCT
                title={'Confirm Password'}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                ref={ref}
                error={errors.confirmPassword}
              />
            )}
            name="confirmPassword"
          />

          <TouchableOpacity
            style={[
              styles.btnContainer,
              {
                backgroundColor: isValid
                  ? 'rgba(9, 138, 224, 1)'
                  : 'rgba(9, 138, 224, 0.5)',
              },
            ]}
            disabled={!isValid}
            activeOpacity={0.7}
            onPress={e =>
              handleSubmit(
                onSubmit,
                onError,
              )(e).catch(e => {
                console.log('e: ', e);
              })
            }>
            <Text style={styles.txtSubmit}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ComponentView;

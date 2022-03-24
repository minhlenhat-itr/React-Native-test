import React, {useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import themedStyle from './styles';
import {useTheme} from 'react-native-themed-styles';
import {useForm, Controller, useController} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {checkNull} from '../../../utils/validation';
import _, {last} from 'lodash';
import * as yup from 'yup';

const ComponentView = () => {
  const [styles, color] = useTheme(themedStyle);

  const emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const {
    control,
    setValue,
    setFocus,
    handleSubmit,
    setError,
    formState: {errors, isValidating, isValid},
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      a: '',
      b: '',
      c: '',
      d: '',
    },
    shouldFocusError: true,
  });

  // const schema = yup
  //   .object({
  //     firstName: yup.string().required(),
  //     lastName: yup.string().required(),
  //     email: yup
  //       .string()
  //       .email('Please enter a valid email')
  //       .required('Email address is required'),
  //   })
  //   .required();

  // useEffect(() => {
  //   setFocus('firstName');
  // }, [setFocus]);

  const onSubmit = (data, event) => {
    console.log('error: ', isValid, isValidating);
    console.log(data);
  };

  const onError = (error, event) => {
    console.log('error: ', isValid, isValidating);
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
            rules={{
              required: {
                value: true,
                message: 'String cannot be empty!',
              },
            }}
            render={({
              field: {onChange, onBlur, value, ref},
              fieldState: {invalid, isTouched, isDirty, error},
            }) => (
              <View>
                <Text style={styles.txtTitle}>First name</Text>
                <TouchableOpacity style={styles.inputContainer}>
                  <TextInput
                    placeholder="First name"
                    style={styles.input}
                    onBlur={onBlur}
                    blurOnSubmit={false}
                    onChangeText={onChange}
                    onSubmitEditing={() => {
                      setFocus('lastName');
                    }}
                    value={value}
                    ref={ref}
                  />
                </TouchableOpacity>
              </View>
            )}
            name="firstName"
          />
          {errors.firstName && (
            <Text style={{color: 'red'}}>{errors.firstName.message}</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'String cannot be empty!',
              },
            }}
            render={({field: {onChange, onBlur, value, ref}}) => (
              <View>
                <Text style={styles.txtTitle}>Last name</Text>
                <TouchableOpacity style={styles.inputContainer}>
                  <TextInput
                    placeholder="Last name"
                    style={styles.input}
                    onBlur={onBlur}
                    blurOnSubmit={false}
                    onChangeText={onChange}
                    onSubmitEditing={() => {
                      setFocus('email');
                    }}
                    value={value}
                    ref={ref}
                  />
                </TouchableOpacity>
              </View>
            )}
            name="lastName"
          />
          {errors.lastName && (
            <Text style={{color: 'red'}}>{errors.lastName.message}</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'String cannot be empty!',
              },
              pattern: {
                value: emailPattern,
                message: 'Wrong email format!',
              },
            }}
            render={({field: {onChange, onBlur, value, ref}}) => (
              <View>
                <Text style={styles.txtTitle}>Email</Text>
                <TouchableOpacity style={styles.inputContainer}>
                  <TextInput
                    placeholder="Email"
                    style={styles.input}
                    onBlur={onBlur}
                    blurOnSubmit={false}
                    onChangeText={onChange}
                    onSubmitEditing={() => {
                      setFocus('phoneNumber');
                    }}
                    value={value}
                    ref={ref}
                  />
                </TouchableOpacity>
              </View>
            )}
            name="email"
          />
          {errors.email && (
            <Text style={{color: 'red'}}>{errors.email.message}</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'String cannot be empty!',
              },
            }}
            render={({field: {onChange, onBlur, value, ref}}) => (
              <View>
                <Text style={styles.txtTitle}>Phone number</Text>
                <TouchableOpacity style={styles.inputContainer}>
                  <TextInput
                    placeholder="Phone number"
                    style={styles.input}
                    onBlur={onBlur}
                    blurOnSubmit={false}
                    onChangeText={onChange}
                    onSubmitEditing={() => {
                      setFocus('password');
                    }}
                    value={value}
                    ref={ref}
                  />
                </TouchableOpacity>
              </View>
            )}
            name="phoneNumber"
          />
          {errors.phoneNumber && (
            <Text style={{color: 'red'}}>{errors.phoneNumber.message}</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'String cannot be empty!',
              },
              minLength: {
                value: 5,
                message: 'String cannot less than 5 chars',
              },
            }}
            render={({field: {onChange, onBlur, value, ref}}) => (
              <View>
                <Text style={styles.txtTitle}>Password</Text>
                <TouchableOpacity style={styles.inputContainer}>
                  <TextInput
                    placeholder="Password"
                    style={styles.input}
                    onBlur={onBlur}
                    blurOnSubmit={false}
                    onChangeText={onChange}
                    onSubmitEditing={() => {
                      setFocus('confirmPassword');
                    }}
                    value={value}
                    ref={ref}
                  />
                </TouchableOpacity>
              </View>
            )}
            name="password"
          />
          {errors.password && (
            <Text style={{color: 'red'}}>{errors.password.message}</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'String cannot be empty!',
              },
              minLength: {
                value: 5,
                message: 'String cannot less than 5 chars',
              },
              validate: {
                equalToPassword: value =>
                  value.length < 10 || 'Password are not the same!',
              },
            }}
            render={({field: {onChange, onBlur, value, ref}}) => (
              <View>
                <Text style={styles.txtTitle}>Confirm password</Text>
                <TouchableOpacity style={styles.inputContainer}>
                  <TextInput
                    placeholder="Confirm Password"
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    ref={ref}
                  />
                </TouchableOpacity>
              </View>
            )}
            name="confirmPassword"
          />
          {errors.confirmPassword && (
            <Text style={{color: 'red'}}>{errors.confirmPassword.message}</Text>
          )}

          <TouchableOpacity
            style={[
              styles.btnContainer,
              // {
              //   backgroundColor: isValid
              //     ? 'rgba(9, 138, 224, 1)'
              //     : 'rgba(9, 138, 224, 0.5)',
              // },
            ]}
            // disabled={!isValid}
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

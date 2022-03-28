import React, {useEffect} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import themedStyle from './styles';
import {useTheme} from 'react-native-themed-styles';
import {useForm, Controller, useController} from 'react-hook-form';
import {checkNull} from '../../../utils/validation';
import _, {last} from 'lodash';
import * as yup from 'yup';
// type FormValues = {
//   firstName: String,
//   lastName: String,
//   email: String,
//   phoneNumber: String,
//   service: String,
// };

const HookView = () => {
  const [styles, color] = useTheme(themedStyle);
  const {
    control,
    setValue,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      service: '',
    },
  });

  const schema = yup
    .object({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup
        .string()
        .email('Please enter a valid email')
        .required('Email address is required'),
    })
    .required();

  const onSubmit = (data, event) => {
    // throw new Error('test');
    // errors.email.message = 'Email already exist!';
    // return;
    const emailError = checkNull([
      {value: data.email, isRequired: true, field: 'email'},
    ]);

    if (!_.isEmpty(emailError)) {
      setError('email', {type: 'manual', message: 'Wrong email format!'});
      return;
    }

    console.log(data);
  };

  //onSubmit with formValue
  // const onSubmit = (data: FormValues, error) => {
  //   // throw new Error('test');
  //   console.log(data);
  // };

  const onError = (error, event) => {
    //only catch rules error, but not catch undefined props or Error handle in onSubmit (call API, run async task, ...)
    console.log('error submit: ', error);
  };

  useEffect(() => {
    console.log('errors: ', errors);
  }, [errors]);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'String cannot be empty!',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="First name"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
      {errors.firstName && <Text>{errors.firstName.message}</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: {
            value: 5,
            message: 'String not less than 5 chars',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Last name"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
      />
      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Email"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Phone number"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="phoneNumber"
      />
      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Service"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="service"
      />

      <Button
        title="Submit"
        onPress={e =>
          handleSubmit(
            onSubmit,
            onError,
          )(e).catch(e => {
            console.log('e: ', e);
          })
        }
      />
    </View>
  );
};

export default HookView;

import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import themedStyle from './styles';
import {useTheme} from 'react-native-themed-styles';
import {useForm, Controller, useController} from 'react-hook-form';

const ComponentView = () => {
  const [styles, color] = useTheme(themedStyle);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });
  const onSubmit = data => console.log(data);
  const onError = error => console.log(error);
  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
      {errors.firstName && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit, onError)} />
    </View>
  );
};

export default ComponentView;

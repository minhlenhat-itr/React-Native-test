import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import themedStyle from './styles';
import {useTheme} from 'react-native-themed-styles';
import useMergeState from '../../../utils/hooks/useMergeState.js';
import FirstStepView from './firstStepView';
import SecondStepView from './secondStepView';

const SignUpView = props => {
  const {navigation} = props;
  const [styles] = useTheme(themedStyle);
  const [state, setState] = useMergeState({
    steps: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onSubmitStep1 = data => {
    setState({
      steps: 1,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    });
  };

  const onSubmit = (data, event) => {
    setState({
      password: data.password,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register account</Text>
      {state.steps === 0 ? (
        <FirstStepView onSubmitStep1={onSubmitStep1} />
      ) : (
        <SecondStepView
          onSubmit={onSubmit}
          onPressBack={() => {
            setState({steps: 0});
          }}
        />
      )}
    </View>
  );
};

export default SignUpView;

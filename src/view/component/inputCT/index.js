import React from 'react';
import {Text, View} from 'react-native';

const InputCT = (props, ref) => {
  const {title} = props;
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

export default InputCT;

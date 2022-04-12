import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-themed-styles';
import themedStyles from './styles';
import {useForm, Controller, useController} from 'react-hook-form';
import _ from 'lodash';

const InitView = props => {
  const [styles, theme] = useTheme(themedStyles);
  const {navigation} = props;

  const USER_RAW = {
    activatedAt: '2022-01-25T07:59:43.260Z',
    balance: 0,
    company: {
      address: 'Ho Chi Minh',
      name: 'Dev Test',
      unlimitedPackages: [
        {
          id: '53',
          name: 'Germany Voice Flat',
        },
      ],
    },
    currency: 'EUR',
    email: 'kttest0528@gmail.com',
    firstName: 'test',
    id: '219',
    lastName: '1',
    lastSentQrCode: '2022-03-15T09:52:03.918Z',
    phoneNumbers: [{id: '133', number: '3272543147'}],
    qrCodeUrl:
      'https://workside-files.projects.itrvn.com/219/qr-code/1647337907362.png',
    requestedTopupAt: null,
    role: 'REGULAR',
    specialPackages: [
      {
        activatedAt: '2022-01-25',
        callLimit: 250,
        callUsed: 0,
        description: 'Package of 250 calling minutes to German Mobile',
        expiredAt: '2022-02-24',
        id: '886',
        isAutoRenew: false,
        name: 'Germany Voice 250 Mobile',
        smsLimit: 0,
        smsUsed: 0,
      },
    ],
    status: 'ACTIVE',
  };

  const goToDetail = () => {
    // console.log('gotoDetail: ', JSON.stringify(USER_RAW));
    // navigation.navigate('DetailView', {item: JSON.stringify(USER_RAW)});
    navigation.navigate('DetailView', {
      item: formatData(USER_RAW),
      mode: 'NEW',
    });
  };

  const goToTopUp = () => {
    navigation.navigate('TopUpView');
  };

  const formatData = data => {
    const listService = [];
    const listPhone = [];

    if (!_.isEmpty(data?.specialPackages)) {
      _.forEach(data?.specialPackages, (item, index) => {
        listService.push({
          ...item,
          key: `service${index}`,
          canDelete: index !== 0,
          isNew: false,
        });
      });
    }

    if (!_.isEmpty(data?.phoneNumbers)) {
      _.forEach(data?.phoneNumbers, (item, index) => {
        listPhone.push({
          ...item,
          key: `phone${index}`,
          canDelete: index !== 0,
          isNew: false,
        });
      });
    }

    const newData = {
      ...data,
      specialPackages: listService,
      phoneNumbers: listPhone,
    };
    return newData;
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={goToDetail}
        style={{
          marginHorizontal: 30,
          marginVertical: 30,
          padding: 10,
          backgroundColor: 'red',
        }}>
        <Text style={{textAlign: 'center'}}>Go To Detail</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={goToTopUp}
        style={{
          marginHorizontal: 30,
          marginVertical: 30,
          padding: 10,
          backgroundColor: 'red',
        }}>
        <Text style={{textAlign: 'center'}}>TOP UP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InitView;

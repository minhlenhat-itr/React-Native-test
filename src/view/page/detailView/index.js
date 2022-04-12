import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Keyboard} from 'react-native';
import themedStyles from './styles';
import {useTheme} from 'react-native-themed-styles';
import HeaderCT from '../../component/headerCT';
import Svgs from '../../../assets/images/svg';
import {SvgXml} from 'react-native-svg';
import InputCT from '../../component/inputCT';
import SelectedValueCell from '../../component/selectedValueCell';
import useMergeState from '../../../utils/hooks/useMergeState';
import _, {set} from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {checkNull} from '../../../utils/validation';

const DetailView = props => {
  const [styles, theme] = useTheme(themedStyles);

  const {navigation, route} = props;

  const {item, mode} = route?.params || {
    item: {},
    mode: 'NEW',
  };

  const inputRef = {};
  const errors = {};

  useEffect(() => {
    //costom data
    if (mode === 'EDIT') {
      setState({data: item});
    }
  }, []);

  const onPressLeft = () => {
    navigation.goBack();
  };

  const [state, setState] = useMergeState({
    data: {
      company: item?.company || '',
      firstName: '',
      lastName: '',
      email: '',
      specialPackages: [
        {
          key: 'service0',
          id: '',
          canDelete: false,
          name: '',
        },
      ],
      phoneNumbers: [
        {
          key: 'phone0',
          id: '',
          canDelete: false,
          name: '',
        },
      ],
      role: 'REGULAR',
      status: 'REGISTERED',
    },
    isValid: false,
    isNew: mode === 'NEW',
  });

  const onChangeText = (key, value) => {
    const newData = {...state.data};
    newData[key] = value;
    setState({data: newData});
  };

  const onSubmitEditing = key => {
    switch (key) {
      case 'firstname':
        inputRef?.lastname?.focus();
        break;
      case 'lastname':
        inputRef?.email?.focus();
        break;
      case 'email':
        Keyboard.dismiss();
        break;
    }
  };

  const onValidate = () => {
    const checkData = {...state.data};
    setState({
      isValid:
        !_.values(checkData).some(x => x === '') &&
        _.find(state.data.phoneNumbers, obj => obj.number !== ''),
    });
  };

  const onSubmit = () => {
    onValidate();
    // errors.firstname = 'Error occur on firstname';
    console.log('data: ', state.data);
    const result = checkNull(state.data);
    console.log('result: ', result);
  };

  const onPressAddNew = key => {
    switch (key) {
      case 'service':
        const listService = [...state.data?.specialPackages];
        listService.push({
          name: '',
          key: `service${listService.length}`,
          canDelete: true,
          isNew: true,
          id: '',
        });
        setState({data: {...state.data, specialPackages: listService}});
        break;
      case 'phone':
        const listPhone = [...state.data?.phoneNumbers];
        listPhone.push({
          name: '',
          key: `phone${listPhone.length}`,
          isNew: true,
          canDelete: true,
          id: '',
        });
        setState({data: {...state.data, phoneNumbers: listPhone}});
        break;
    }
  };

  const onPressItem = item => {
    console.log('item: ', item);
  };

  const onSelect = value => {
    setState({data: {...state.data, role: value}});
  };

  return (
    <View style={styles.container}>
      <HeaderCT
        hasBaseLine
        leftIcon={Svgs.back}
        title={'Detail View'}
        onPressLeft={onPressLeft}
      />

      <View style={styles.mainView}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <InputCT
            ref={ref => {
              inputRef.companyName = ref;
            }}
            style={styles.cell}
            icon={Svgs.store}
            title={'Company Name'}
            value={state.data.company.name}
            placeholder={'companyName'}
            onSubmitEditing={() => onSubmitEditing('companyName')}
            onChangeText={value => onChangeText('companyName', value)}
            editable={false}
          />
          <InputCT
            ref={ref => {
              inputRef.companyAddress = ref;
            }}
            icon={Svgs.building}
            style={styles.cell}
            title={'Company Address'}
            value={state.data.company.address}
            placeholder={'companyAddress'}
            onSubmitEditing={() => onSubmitEditing('companyAddress')}
            onChangeText={value => onChangeText('companyAddress', value)}
            editable={false}
          />
          <Text>User Info</Text>
          <SelectedValueCell
            type="CIRCLE"
            isSelected={state.data?.role === 'ADMIN'}
            onSelect={() => onSelect('ADMIN')}
            title="ADMIN"
          />
          <SelectedValueCell
            type="CIRCLE"
            isSelected={state.data?.role === 'REGULAR'}
            onSelect={() => onSelect('REGULAR')}
            title="USER"
          />
          <InputCT
            ref={ref => {
              inputRef.firstname = ref;
            }}
            icon={Svgs.user}
            style={styles.cell}
            title={'FirstName'}
            value={state.data.firstName}
            placeholder={'FirstName'}
            onSubmitEditing={() => onSubmitEditing('firstname')}
            onChangeText={value => onChangeText('firstName', value)}
            editable={true}
          />

          <InputCT
            style={styles.cell}
            ref={ref => {
              inputRef.lastname = ref;
            }}
            icon={Svgs.user}
            title={'LastName'}
            value={state.data.lastName}
            placeholder={'LastName'}
            onSubmitEditing={() => onSubmitEditing('lastname')}
            onChangeText={value => onChangeText('lastName', value)}
          />

          <InputCT
            style={styles.cell}
            ref={ref => {
              inputRef.email = ref;
            }}
            icon={Svgs.mail}
            title={'Email'}
            value={state.data.email}
            placeholder={'Email'}
            onSubmitEditing={() => onSubmitEditing('email')}
            onChangeText={value => onChangeText('Email', value)}
          />
          <Text>Selected Service</Text>
          {state.data?.specialPackages.map((value, index) => {
            return (
              <InputCT
                key={value.key}
                style={styles.cell}
                value={value?.name}
                type={'SELECT'}
                icon={Svgs.service}
                title={'Service'}
                placeholder={'Service'}
                subInfo={
                  value?.expiredAt ? `valid until ${value?.expiredAt}` : ''
                }
                amount={
                  value?.callLimit
                    ? `${value?.callLimit - value?.callUsed}/${
                        value?.callLimit
                      }`
                    : ''
                }
                onPress={() => onPressItem(value)}
              />
            );
          })}
          {state?.data?.specialPackages[0]?.name !== '' && (
            <TouchableOpacity onPress={() => onPressAddNew('service')}>
              <Text>ADD SERVICES</Text>
            </TouchableOpacity>
          )}
          <Text>Selected Phone Number</Text>
          {state.data?.phoneNumbers.map((value, index) => {
            return (
              <InputCT
                key={value.key}
                style={styles.cell}
                value={value?.number}
                type={'SELECT'}
                icon={Svgs.phone}
                title={'Phone Number'}
                placeholder={'Phone Number'}
                onPress={() => onPressItem(value)}
              />
            );
          })}
          {state?.data?.phoneNumbers[0]?.name !== '' && (
            <TouchableOpacity onPress={() => onPressAddNew('phone')}>
              <Text>ADD PHONE NUMBER</Text>
            </TouchableOpacity>
          )}
        </KeyboardAwareScrollView>
      </View>
      <TouchableOpacity
        onPress={onSubmit}
        style={{
          width: '100%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: state.isValid ? theme.green1 : theme.gray0,
        }}>
        <Text>onSubmit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailView;

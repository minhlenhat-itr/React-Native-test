import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import HeaderCT from '../../component/headerCT';
import themedStyles from './styles';
import {useTheme} from 'react-native-themed-styles';
import globalStyles from '../../../constants/globalStyles';
import Svgs from '../../../assets/images/svg';
import WorkSideShopCell from '../../component/workSideShopCell';
const TopUpView = props => {
  const {navigation, route} = props;
  const [styles, theme] = useTheme(themedStyles);
  const [glbStyles] = useTheme(globalStyles);

  const data = [
    {
      title: 'Numbers',
      amount: 0,
      subTitle: 'Tap to Add Numbers',
    },
    {
      title: 'Users',
      amount: 0,
      subTitle: 'Tap to Users',
    },
    {
      title: 'Unlimited',
      amount: 0,
      subTitle: 'Tap to Add Unlimited',
    },
    {
      title: 'Packages',
      amount: 0,
      subTitle: 'Tap to Add Packages',
    },
    {
      title: 'Top Up',
      amount: 0,
      subTitle: 'Tap to Add Top Up',
    },
  ];
  return (
    <View style={{flex: 1}}>
      <HeaderCT
        hasBaseLine
        leftIcon={Svgs.back}
        title={'Detail View'}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={[glbStyles.flex1]}>
        <View style={{flexDirection: 'row', flex: 1, marginHorizontal: 4}}>
          <WorkSideShopCell data={{...data[0], amount: 0}} />
          <WorkSideShopCell data={{...data[1], amount: 10}} />
        </View>
        <View style={{flexDirection: 'row', flex: 1, marginHorizontal: 4}}>
          <WorkSideShopCell data={{...data[2], amount: 10}} />
          <WorkSideShopCell data={{...data[3], amount: 10}} />
        </View>
        <View style={{flexDirection: 'row', flex: 1, marginHorizontal: 4}}>
          <WorkSideShopCell data={{...data[4], amount: 10}} />
          <TouchableOpacity
            style={{
              flex: 1,
              width: 'auto',
              height: 'auto',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: theme.gray0,
              margin: 4,
              padding: 15,
            }}>
            <Text>DONE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TopUpView;

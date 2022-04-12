import React from 'react';
import Proptypes from 'prop-types';
import {View, Text, TouchableOpacity} from 'react-native';
import themedStyles from './styles';
import globalStyles from '../../../constants/globalStyles';
import {useTheme} from 'react-native-themed-styles';
import {SvgXml} from 'react-native-svg';
import Svgs from '../../../assets/images/svg';

const HeaderCT = props => {
  const [styles, color] = useTheme(themedStyles);
  const [glbStyles] = useTheme(globalStyles);

  const {
    title,
    leftIcon,
    leftTitle,
    rightIcon,
    rightTitle,
    onPressLeft,
    onPressRight,
    subRightComponent,
    isCenter,
    hasBaseLine,
  } = props;

  return (
    <View style={[styles.container, hasBaseLine && styles.baseLine]}>
      {!!leftIcon && (
        <TouchableOpacity
          onPress={onPressLeft}
          hitSlop={{top: 5, bottom: 5, left: 10, right: 10}}
          style={styles.leftView}>
          <SvgXml xml={leftIcon} fill={'black'} />
          {!!leftTitle && <Text>{leftTitle}</Text>}
        </TouchableOpacity>
      )}
      <Text
        style={[
          glbStyles.flex1,
          {
            textAlign: isCenter ? 'center' : 'left',
            marginLeft: leftIcon ? 10 : 0,
          },
        ]}>
        {title}
      </Text>
      {subRightComponent && subRightComponent()}
    </View>
  );
};

HeaderCT.defaultProps = {
  title: '',
  leftIcon: '',
  isCenter: false,
  subRightComponent: () => {},
  leftTitle: '',
  hasBaseLine: false,
};

HeaderCT.propTypes = {
  title: Proptypes.string,
  leftIcon: Proptypes.string,
  subRightComponent: Proptypes.func,
  isCenter: Proptypes.bool,
  leftTitle: Proptypes.string,
  hasBaseLine: Proptypes.bool,
};

export default HeaderCT;

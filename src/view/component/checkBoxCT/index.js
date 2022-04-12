import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import Svgs from '../../../assets/images/svg';
import themedStyles from './styles';
import {useTheme} from 'react-native-themed-styles';
import globalStyles from '../../../constants/globalStyles';

/**
 *
 * @param type: 'NONE' , 'CIRCLE', 'SQUARE'
 */

const CheckBoxCT = props => {
  const [styles, theme] = useTheme(themedStyles);
  const [glbStyles] = useTheme(globalStyles);

  const {type, isSelected, style} = props;

  const checkIcon =
    type === 'NONE'
      ? Svgs.checked_none
      : type === 'CIRCLE'
      ? Svgs.checked_circle
      : Svgs.checked_square;

  const unCheckIcon =
    type === 'NONE'
      ? Svgs.ic_null
      : type === 'CIRCLE'
      ? Svgs.unchecked_circle
      : Svgs.unchecked_square;

  return (
    <View style={style}>
      <SvgXml
        xml={isSelected ? checkIcon : unCheckIcon}
        fill={'black'}
        width={20}
        height={20}
      />
    </View>
  );
};

CheckBoxCT.defaultProps = {
  type: 'NONE',
  isSelected: false,
  style: {},
};

CheckBoxCT.propTypes = {
  type: PropTypes.string,
  style: PropTypes.object,
  isSelected: PropTypes.bool,
};

export default CheckBoxCT;

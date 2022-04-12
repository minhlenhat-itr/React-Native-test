import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity} from 'react-native';
import themedStyles from './styles';
import {useTheme} from 'react-native-themed-styles';
import globalStyles from '../../../constants/globalStyles';
import Svg, {SvgXml} from 'react-native-svg';
import Svgs from '../../../assets/images/svg';
import CheckBoxCT from '../checkBoxCT';

/**
 * @param type:  "NONE", "CIRLE", "SQUARE"
 */

const SelectedValueCell = props => {
  const [styles, theme] = useTheme(themedStyles);
  const [glbStyles] = useTheme(globalStyles);

  const {type, title, isSelected, onSelect, style} = props;

  return (
    <TouchableOpacity style={style} onPress={onSelect}>
      <View
        style={{
          height: 40,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <CheckBoxCT
          style={{marginLeft: 10, marginRight: 20}}
          type={type}
          isSelected={isSelected}
        />
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

SelectedValueCell.defaultProps = {
  type: 'NONE',
  title: '',
  onSelect: () => {},
  style: {},
};

SelectedValueCell.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  onSelect: PropTypes.func,
  style: PropTypes.object,
};

export default SelectedValueCell;

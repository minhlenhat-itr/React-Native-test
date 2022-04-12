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

const WorkSideShopCell = props => {
  const [styles, theme] = useTheme(themedStyles);
  const [glbStyles] = useTheme(globalStyles);

  const {type, title, isSelected, onSelect, style, data} = props;

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: theme.gray0,
          flex: 1,
          margin: 4,
          padding: 15,
          justifyContent: 'space-between',
        },
      ]}
      onPress={onSelect}>
      <Text style={{fontSize: 30}}>{data?.title}</Text>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          <Text style={{fontSize: 30}}>
            {data?.amount}{' '}
            {data?.amount !== 0 && (
              <Text style={{fontSize: 15}}>{'Selected'}</Text>
            )}
          </Text>
        </View>
        <Text>{data?.subTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

WorkSideShopCell.defaultProps = {
  type: 'NONE',
  title: '',
  onSelect: () => {},
  style: {},
  data: {},
};

WorkSideShopCell.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  onSelect: PropTypes.func,
  style: PropTypes.object,
  data: PropTypes.object,
};

export default WorkSideShopCell;

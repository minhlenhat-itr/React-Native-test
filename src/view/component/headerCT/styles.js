import {styleSheetFactory} from '../../../constants/themes';

const themedStyles = styleSheetFactory(theme => ({
  container: {
    height: 50,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  baseLine: {
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10,
  },
}));

export default themedStyles;

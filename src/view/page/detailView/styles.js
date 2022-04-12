import {styleSheetFactory} from '../../../constants/themes';

const themedStyles = styleSheetFactory(theme => ({
  container: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  cell: {
    marginVertical: 10,
  },
}));

export default themedStyles;

import {styleSheetFactory} from '../../../constants/themes';

const themedStyles = styleSheetFactory(theme => ({
  container: {
    // flex: 1,
    marginHorizontal: 50,
  },
  btnStyle: {
    marginBottom: 50,
  },
}));

export default themedStyles;

import {styleSheetFactory} from '../../../constants/themes';

const themedStyles = styleSheetFactory(theme => ({
  container: {
    // flex: 1,
    marginHorizontal: 50,
  },
  btnStyle: {
    marginVertical: 25,
  },
}));

export default themedStyles;

import {styleSheetFactory} from '../../../constants/themes';

const themedStyle = styleSheetFactory(theme => ({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  input: {
    height: 50,
    backgroundColor: theme.blue,
  },
}));

export default themedStyle;

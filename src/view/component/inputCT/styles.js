import {styleSheetFactory} from '../../../constants/themes';

const themedStyles = styleSheetFactory(theme => ({
  input: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    padding: 12,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  error: {
    marginVertical: 4,
    color: 'red',
    fontWeight: 'bold',
  },
}));

export default themedStyles;

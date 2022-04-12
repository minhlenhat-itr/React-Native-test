import {styleSheetFactory} from '../../../constants/themes';

const themedStyles = styleSheetFactory(theme => ({
  coverView: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 55,
  },
  container: {
    backgroundColor: theme.gray0,
    flexDirection: 'row',
    alignContent: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  baseLine: {
    borderBottomWidth: 2,
    borderBottomColor: theme.green0,
  },
  input: {padding: 0, flex: 1},
  startIcon: {alignSelf: 'center', margin: 15},
  mainView: {
    flex: 1,
    marginRight: 20,
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disableView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  error: {
    marginLeft: 15,
  },
  txtError: {
    color: 'red',
  },
  checkbox: {marginLeft: 10, marginRight: 20},
}));

export default themedStyles;

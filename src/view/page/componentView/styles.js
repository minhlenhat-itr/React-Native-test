import {styleSheetFactory} from '../../../constants/themes';

const themedStyle = styleSheetFactory(theme => ({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  inputContainer: {borderColor: 'black', borderWidth: 1, marginVertical: 5},
  input: {
    height: 50,
    backgroundColor: theme.blue,
  },
  btnContainer: {
    width: '100%',
    marginTop: 10,
    height: 55,
    marginBottom: 10,
    backgroundColor: '#098ae0',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  txtSubmit: {color: 'white', fontWeight: 'bold'},
  txtTitle: {fontSize: 15, fontWeight: 'bold'},
}));

export default themedStyle;

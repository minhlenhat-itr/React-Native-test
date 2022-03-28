import {styleSheetFactory} from '../../../constants/themes';

const themedStyles = styleSheetFactory(theme => ({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
  },
  btnNext: {
    width: '100%',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    marginVertical: 10,
  },
  lbl: {
    fontSize: 20,
    color: 'white',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    padding: 12,
  },
  btnContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    marginVertical: 25,
  },
  btnBack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    marginEnd: 40,
  },
  btnSubmit: {
    borderRadius: 4,
    backgroundColor: 'blue',
    padding: 12,
    alignItems: 'center',
  },
}));

export default themedStyles;

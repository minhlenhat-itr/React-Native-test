import {styleSheetFactory} from './themes';

const globalStyles = styleSheetFactory(theme => ({
  flex1: {
    flex: 1,
  },
}));

export default globalStyles;

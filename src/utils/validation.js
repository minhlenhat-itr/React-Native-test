import _ from 'lodash';
import {validateEmail} from '.';

export const checkNull = checkNullData => {
  const errorObject = {};
  _.forEach(checkNullData, data => {
    if (data.isRequired) {
      if (data.field === 'email' && !validateEmail(data.value)) {
        _.assign(errorObject, {[data.field]: '*Incorrect'});
      } else if (data.value.trim() === '') {
        _.assign(errorObject, {[data.field]: '*Incorrect'});
      }
    }
  });

  return errorObject;
};

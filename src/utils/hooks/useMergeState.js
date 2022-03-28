import {useState, useCallback} from 'react';
import _ from 'lodash';

export default function useMergeState(initialState) {
  const [state, setState] = useState(initialState);
  const momoirizedMergedState = useCallback(
    newState =>
      setState(prevState => {
        const expectedState = _.assign(prevState, newState);

        return {...expectedState};
      }),
    [],
  );

  return [state, momoirizedMergedState];
}

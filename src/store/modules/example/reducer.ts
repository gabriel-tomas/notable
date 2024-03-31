import * as types from '../types';

const initialState = {
  isTrue: false,
};

export default (state = initialState, action: Record<string, unknown>) => {
  switch (action.type) {
    case types.TEST: {
      return state;
    }

    default: {
      return state;
    }
  }
};

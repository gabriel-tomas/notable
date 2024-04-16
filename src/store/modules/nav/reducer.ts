import * as types from '../types';

export const initialState = {
  navIsOpened: false,
};

export default (state = initialState, action: Record<string, unknown>) => {
  switch (action.type) {
    case types.SET_NAV_IS_OPEN: {
      const newState = { ...state };
      newState.navIsOpened = true;
      return newState;
    }

    case types.SET_NAV_IS_CLOSED: {
      const newState = { ...state };
      newState.navIsOpened = false;
      return newState;
    }

    default: {
      return state;
    }
  }
};

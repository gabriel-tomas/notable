import * as types from '../types';

const initialState = {
  menuIsOpened: false,
};

export default (state = initialState, action: Record<string, unknown>) => {
  switch (action.type) {
    case types.SET_MENU_IS_OPEN: {
      const newState = { ...state };
      newState.menuIsOpened = true;
      return newState;
    }

    case types.SET_MENU_IS_CLOSED: {
      const newState = { ...state };
      newState.menuIsOpened = false;
      return newState;
    }

    default: {
      return state;
    }
  }
};

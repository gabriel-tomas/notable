import * as types from '../types';
import { ActionProtocol } from '../pages/interfaces';

export const initialState = {
  currentPageID: '',
};

export default (state = initialState, action: ActionProtocol) => {
  switch (action.type) {
    case types.SET_CURRENT_PAGE_ID: {
      const newState = { ...state };
      newState.currentPageID = action.payload.id;
      return newState;
    }

    default: {
      return state;
    }
  }
};

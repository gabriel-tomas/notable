import * as types from '../types';
import { ActionProtocol, PagePayload } from './interfaces';

export const initialState = {
  pages: [] as PagePayload[],
};

export default (state = initialState, action: ActionProtocol) => {
  switch (action.type) {
    case types.CREATE_NEW_PAGE: {
      const newState = { ...state };
      const newArray = [...newState.pages];
      newArray.push({
        id: action.payload.id,
        content: action.payload.content,
      });
      newState.pages = newArray;
      return newState;
    }

    case types.DELETE_PAGE: {
      const newState = { ...state };
      const newArray = [...newState.pages];
      newState.pages = newArray.filter((page) => {
        return page.id !== action.payload.id;
      });
      return newState;
    }

    case types.UPDATE_PAGE_CONTENT: {
      const newState = { ...state };
      newState.pages = newState.pages.map((page) => {
        if (page.id === action.payload.id) {
          return {
            ...page,
            content: action.payload.content,
          };
        }
        return page;
      });
      return newState;
    }

    default: {
      return state;
    }
  }
};

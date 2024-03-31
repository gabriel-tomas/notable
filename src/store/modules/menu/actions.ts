import * as types from '../types';

export function setMenuIsOpen() {
  return {
    type: types.SET_MENU_IS_OPEN,
  };
}

export function setMenuIsClosed() {
  return {
    type: types.SET_MENU_IS_CLOSED,
  };
}

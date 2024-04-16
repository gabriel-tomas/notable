import * as types from '../types';

export function setNavIsOpen() {
  return {
    type: types.SET_NAV_IS_OPEN,
  };
}

export function setNavIsClosed() {
  return {
    type: types.SET_NAV_IS_CLOSED,
  };
}

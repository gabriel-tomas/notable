import * as types from '../types';

import { PageIDPayload } from '../pages/interfaces';

export function setCurrentPageID(payload: PageIDPayload) {
  return {
    type: types.SET_CURRENT_PAGE_ID,
    payload: payload,
  };
}

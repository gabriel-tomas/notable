import * as types from '../types';
import { PagePayload } from './interfaces';

export function setCreateNewPage(payload: PagePayload) {
  return {
    type: types.CREATE_NEW_PAGE,
    payload: payload,
  };
}
export function setUpdatePageContent(payload: PagePayload) {
  return {
    type: types.UPDATE_PAGE_CONTENT,
    payload: payload,
  };
}

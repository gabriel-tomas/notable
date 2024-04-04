import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

import * as pagesActions from '../store/modules/pages/actions';
import * as currentPageID from '../store/modules/currentPageID/actions';

import {
  ArticleDataProtocol,
  PagePayload,
} from '../store/modules/pages/interfaces';

export function FirstStart(
  pages: PagePayload[],
  setContent: React.Dispatch<
    React.SetStateAction<Record<string, never> | ArticleDataProtocol>
  >,
) {
  const dispatch = useDispatch();
  if (pages.length === 0) {
    const id = nanoid();
    const content = {};
    setContent(content);
    dispatch(currentPageID.setCurrentPageID({ id }));
    dispatch(pagesActions.setCreateNewPage({ id, content }));
  }
}

import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

import * as pagesActions from '../store/modules/pages/actions';
import {
  ArticleDataProtocol,
  PagePayload,
} from '../store/modules/pages/interfaces';

export function FirstStart(
  pages: PagePayload[],
  setId: React.Dispatch<React.SetStateAction<string>>,
  setContent: React.Dispatch<
    React.SetStateAction<Record<string, never> | ArticleDataProtocol>
  >,
) {
  const dispatch = useDispatch();
  if (pages.length === 0) {
    console.log('ta vázio pages: ', pages);
    const id = nanoid();
    const content = {};
    setId(id);
    setContent(content);
    dispatch(pagesActions.setCreateNewPage({ id, content }));
  }
}

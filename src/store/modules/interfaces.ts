import { initialState as navState } from './nav/reducer';
import { initialState as pageState } from './pages/reducer';
import { initialState as currentPageID } from './currentPageID/reducer';

export interface GlobalState {
  nav: typeof navState;
  pages: typeof pageState;
  currentPageID: typeof currentPageID;
}

import { initialState as menuState } from './menu/reducer';
import { initialState as pageState } from './pages/reducer';
import { initialState as currentPageID } from './currentPageID/reducer';

export interface GlobalState {
  menu: typeof menuState;
  pages: typeof pageState;
  currentPageID: typeof currentPageID;
}

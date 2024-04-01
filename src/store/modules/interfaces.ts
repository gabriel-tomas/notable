import { initialState as menuState } from './menu/reducer';
import { initialState as pageState } from './pages/reducer';

export interface GlobalState {
  menu: typeof menuState;
  pages: typeof pageState;
}

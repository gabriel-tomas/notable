import { combineReducers } from 'redux';
import menu from './menu/reducer';
import pages from './pages/reducer';
import currentPageID from './currentPageID/reducer';

export default combineReducers({
  menu,
  pages,
  currentPageID,
});

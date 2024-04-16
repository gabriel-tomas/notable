import { combineReducers } from 'redux';
import nav from './nav/reducer';
import pages from './pages/reducer';
import currentPageID from './currentPageID/reducer';

export default combineReducers({
  nav,
  pages,
  currentPageID,
});

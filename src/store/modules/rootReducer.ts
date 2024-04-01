import { combineReducers } from 'redux';
import menu from './menu/reducer';
import pages from './pages/reducer';

export default combineReducers({
  menu,
  pages,
});

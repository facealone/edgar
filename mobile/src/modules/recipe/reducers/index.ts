import { combineReducers } from 'redux';
import { listReducers } from './list';
import { addReducers } from './add';
import { removeReducers } from './remove';
import { categoriesReducers } from './categories';

export default combineReducers({
  list: listReducers,
  add: addReducers,
  remove: removeReducers,
  categories: categoriesReducers,
});

import { combineReducers } from 'redux';
import { listReducers } from './list';
import memberReducers from './member';
import { addReducers } from './add';

export default combineReducers({
  list: listReducers,
  member: memberReducers,
  add: addReducers,
});

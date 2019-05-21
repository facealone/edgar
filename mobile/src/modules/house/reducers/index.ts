import { combineReducers } from 'redux';
import { listReducers } from './list';
import memberReducers from './member';

export default combineReducers({
  list: listReducers,
  member: memberReducers,
});
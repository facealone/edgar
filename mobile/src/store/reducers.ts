import { combineReducers } from 'redux';
import user from '../modules/user/reducers';
import card from '../modules/card/reducers';

export default combineReducers({
  user,
  card,
});

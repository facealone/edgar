import { combineReducers } from 'redux';
import user from '../modules/user/reducers';
import card from '../modules/card/reducers';
import house from '../modules/house/reducers';
import shop from '../modules/shop/reducers';

export default combineReducers({
  user,
  card,
  house,
  shop,
});

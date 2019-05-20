import { combineReducers } from 'redux';
import auth from '../modules/auth/reducers';
import card from '../modules/card/reducers';
import house from '../modules/house/reducers';
import shop from '../modules/shop/reducers';

export default combineReducers({
  auth,
  card,
  house,
  shop,
});

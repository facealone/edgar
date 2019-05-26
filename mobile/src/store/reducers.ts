import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from '../modules/auth/reducers';
import card from '../modules/card/reducers';
import house from '../modules/house/reducers';
import shop from '../modules/shop/reducers';

export default combineReducers({
  form: formReducer,
  auth,
  card,
  house,
  shop,
});

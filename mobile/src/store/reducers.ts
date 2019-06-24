import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from '../modules/auth/reducers';
import card from '../modules/card/reducers';
import house from '../modules/house/reducers';
import shop from '../modules/shop/reducers';
import recipe from '../modules/recipe/reducers';
import budget from '../modules/budget/reducers';

export default combineReducers({
  form: formReducer,
  auth,
  card,
  house,
  shop,
  recipe,
  budget,
});

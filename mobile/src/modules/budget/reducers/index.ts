import { combineReducers } from 'redux';
import transactionReducers from './transaction';
import { listReducers } from './list';
import { addReducers } from './add';

export default combineReducers({
  list: listReducers,
  add: addReducers,
  transaction: transactionReducers,
});

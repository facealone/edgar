import { combineReducers } from 'redux';
import transactionReducers from './transaction';
import { listReducers } from './list';

export default combineReducers({
  list: listReducers,
  transaction: transactionReducers,
});

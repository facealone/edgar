import { combineReducers } from 'redux';
import transactionReducers from './transaction';

export default combineReducers({
  transaction: transactionReducers,
});

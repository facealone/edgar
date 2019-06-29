import { combineReducers } from 'redux';
import transactionReducers from './transaction';
import { listReducers } from './list';
import { addReducers } from './add';
import { updateReducers } from './update';

export default combineReducers({
  list: listReducers,
  add: addReducers,
  update: updateReducers,
  transaction: transactionReducers,
});

import { combineReducers } from 'redux';
import { listReducers } from './list';
import memberReducers from './member';
import voucherReducers from './voucher';
import { addReducers } from './add';
import { currentReducers } from './current';

export default combineReducers({
  list: listReducers,
  member: memberReducers,
  voucher: voucherReducers,
  add: addReducers,
  current: currentReducers,
});

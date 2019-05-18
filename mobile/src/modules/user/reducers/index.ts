import { combineReducers } from 'redux';
import { authenticationReducers } from './authentication';
import { registrationReducers } from './registration';

export default combineReducers({
  authentication: authenticationReducers,
  registration: registrationReducers,
});

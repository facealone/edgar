import {
  loading,
  errors,
  authenticated,
  user,
} from '../actions/authentication';
import { LoggedUser } from '../models/LoggedUser';
import { TokenStorage } from '../../../libraries/tokenStorage';
import { Error } from '../../common/models/Error';
import { IAuthenticationForm } from '../types/authentication';

export const authentication = (payload: IAuthenticationForm) => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const { email, password } = payload;
      const { firstName, lastName, currentHouse, token } = await axios.post(
        'login',
        { email, password },
      );

      await TokenStorage.save(token);
      dispatch(user(new LoggedUser(firstName, lastName, email, currentHouse)));
      dispatch(authenticated(true));
    } catch (err) {
      dispatch(errors([new Error('auth.authentication.failure.content')]));
    } finally {
      dispatch(loading(false));
    }
  };
};

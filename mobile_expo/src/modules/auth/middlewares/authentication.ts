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
import { House } from '../../house/models/House';
import { success } from '../../house/actions/current';

export const authentication = (payload: IAuthenticationForm) => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const { email, password } = payload;
      const response = await axios.post('login', { email, password });
      const { firstName, lastName, currentHouse, apiToken } = response.data;

      await TokenStorage.save(apiToken);

      if (currentHouse) {
        dispatch(success(new House(currentHouse.id, currentHouse.name)));
      }

      dispatch(user(new LoggedUser(firstName, lastName, email)));
      dispatch(authenticated(true));
    } catch (err) {
      dispatch(errors([new Error('auth.authentication.failure.content')]));
    } finally {
      dispatch(loading(false));
    }
  };
};

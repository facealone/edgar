import { IRegistrationForm } from '../types/registration';
import { loading, errors } from '../actions/registration';
import { user, authenticated } from '../actions/authentication';
import { LoggedUser } from '../models/LoggedUser';
import { TokenStorage } from '../../../libraries/tokenStorage';

export const register = (payload: IRegistrationForm) => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.post('register', payload);
      const { firstName, lastName, email, token } = response.data;

      await TokenStorage.save(token);
      dispatch(user(new LoggedUser(firstName, lastName, email, null)));
      dispatch(authenticated(true));
    } catch (err) {
      // todo dispatch error
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};

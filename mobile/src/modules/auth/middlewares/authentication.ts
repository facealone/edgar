import {
  loading,
  errors,
  authenticated,
  auth,
} from '../actions/authentication';

export const authentication = (email: string, password: string) => {
  return async (dispatch, getState, axios) => {
    dispatch(loading(true));

    try {
      const response = await axios.post('login', {
        email,
        password,
      });

      dispatch(authenticated(true));
      dispatch(auth(true));
      //let token = response.token;
      // todo :
      // store token
      // set logged auth
    } catch (e) {
      dispatch(errors([e]));
    } finally {
      dispatch(loading(false));
    }
  };
};

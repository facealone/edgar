import { errors, loading, success } from '../actions/current';
import { House } from '../models/House';

export const changeCurrentHouse = (house: string) => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.put('users/me/current-house', { house });
      const { name, id } = response.data;

      dispatch(success(new House(id, name), true));
    } catch (err) {
      // todo : errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};

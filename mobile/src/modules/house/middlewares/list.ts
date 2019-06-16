import { errors, loading, success } from '../actions/list';
import { House } from '../models/House';

export const listHouses = () => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.get('users/me/houses');
      const houses = [];

      for (const house of response.data) {
        houses.push(new House(house.id, house.name));
      }

      dispatch(success(houses));
    } catch (err) {
      // todo : errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};

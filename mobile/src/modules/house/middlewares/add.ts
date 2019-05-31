import { IHouseForm } from '../types/house';
import { errors, loading, success } from '../actions/add';
import { House } from '../models/House';

export const addHouse = (payload: IHouseForm) => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.post('houses', { name: payload.name });
      const { name, id } = response.data;
      const house = new House(id, name);

      dispatch(success(house));
    } catch (err) {
      // todo : errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};

import { errors, loading, success } from '../actions/add';
import { House } from '../models/House';
import { IHouseForm } from '../types/add';

export const addHouse = (payload: IHouseForm) => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.post('houses', { name: payload.name });
      const { name, id } = response.data;

      dispatch(success(new House(id, name)));
    } catch (err) {
      // todo : errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};

export const joinHouse = (code: string) => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.put(`vouchers/${code}/consume`);
      const { name, id } = response.data;

      dispatch(success(new House(id, name)));
    } catch (err) {
      // todo : errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};

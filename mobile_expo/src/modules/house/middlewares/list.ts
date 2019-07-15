import { errors, loading, success } from '../actions/list';
import { House } from '../models/House';
import { Pagination } from '../../common/models/Pagination';

export const listHouses = (page: number = 1) => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.get(`users/me/houses?page=${page}`);
      const { items, pageCount, totalItems } = response.data;
      const houses = [];

      for (const house of items) {
        houses.push(new House(house.id, house.name));
      }

      dispatch(success(new Pagination<House>(houses, pageCount, totalItems)));
    } catch (err) {
      // todo : errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};

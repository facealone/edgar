import { loading, success, errors } from '../actions/list';
import { Shop } from '../models/Shop';
import { Pagination } from '../../common/models/Pagination';

export const listShops = (page: number = 1) => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.get(
        `users/me/current-house/shops?page=${page}`,
      );
      const { items, pageCount, totalItems } = response.data;
      const shops = [];

      for (const shop of items) {
        shops.push(new Shop(shop.id, shop.name, shop.numberOfItems));
      }

      dispatch(success(new Pagination<Shop>(shops, pageCount, totalItems)));
    } catch (err) {
      // todo errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};

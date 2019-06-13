import { loading, success, errors } from '../actions/list';
import { Shop } from '../models/Shop';

export const listShops = () => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.get('users/me/current-house/shops');
      const shops = [];

      for (const shop of response.data) {
        shops.push(new Shop(shop.id, shop.name, shop.numberOfItems));
      }

      dispatch(success(shops));
    } catch (err) {
      // todo errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};

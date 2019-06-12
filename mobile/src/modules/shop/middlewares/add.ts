import { loading, success, errors } from '../actions/add';
import { Shop } from '../models/Shop';

export const addShop = (name: string) => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.post('shops', { name });
      const shop = response.data;

      dispatch(success(new Shop(shop.id, shop.name)));
    } catch (err) {
      // todo errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};

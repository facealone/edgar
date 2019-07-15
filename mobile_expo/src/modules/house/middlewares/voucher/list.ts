import { errors, loading, success } from '../../actions/voucher/list';
import { Voucher } from '../../models/Voucher';
import { Pagination } from '../../../common/models/Pagination';

export const listVouchers = (houseId: string, page: number = 1) => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.get(
        `houses/${houseId}/vouchers?page=${page}`,
      );
      const { items, pageCount, totalItems } = response.data;
      const vouchers = [];

      for (const voucher of items) {
        vouchers.push(
          new Voucher(voucher.username, voucher.code, voucher.role),
        );
      }

      dispatch(
        success(new Pagination<Voucher>(vouchers, pageCount, totalItems)),
      );
    } catch (err) {
      // todo : errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};

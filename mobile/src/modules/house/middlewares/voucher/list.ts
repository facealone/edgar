import { errors, loading, success } from '../../actions/voucher/list';
import { Voucher } from '../../models/Voucher';

export const listVouchers = (houseId: string) => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));

    try {
      const response = await axios.get(`houses/${houseId}/vouchers`);
      const vouchers = [];

      for (const voucher of response.data) {
        vouchers.push(
          new Voucher(voucher.username, voucher.code, voucher.role),
        );
      }

      dispatch(success(vouchers));
    } catch (err) {
      // todo : errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};

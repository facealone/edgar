import { errors, loading, success } from '../../actions/voucher/add';
import { Voucher } from '../../models/Voucher';
import { IVoucherForm } from '../../types/voucher/add';

export const addVoucher = (payload: IVoucherForm) => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));
    try {
      const response = await axios.post('vouchers', payload);
      const { username, code, role } = response.data;

      dispatch(success(new Voucher(username, code, role)));
    } catch (err) {
      // todo : errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};

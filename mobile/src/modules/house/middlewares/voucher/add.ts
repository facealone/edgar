import { errors, loading, success } from '../../actions/voucher/add';

export const addVoucher = (houseId: string) => {
  return async (dispatch: any, getState: any, axios: any) => {
    dispatch(loading(true));
    try {
      const response = await axios.post('vouchers', {
        houseId,
        role: 'ROLE_OWNER',
      });
      const { code } = response.data;

      dispatch(success(code));
    } catch (err) {
      // todo : errors
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};

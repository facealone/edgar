import { Error } from '../../../common/models/Error';
import {
  HOUSE_VOUCHER_ADD_RESET,
  HOUSE_VOUCHER_ADD_SUCCESS,
  HOUSE_VOUCHER_ADD_LOADING,
  HOUSE_VOUCHER_ADD_ERROR,
} from '../../constants/voucher/add';
import {
  IHouseVoucherAddSuccessAction,
  IHouseVoucherAddResetAction,
  IHouseVoucherAddErrorAction,
  IHouseVoucherAddLoadingAction,
} from '../../types/voucher/add';
import { Voucher } from '../../models/Voucher';

export const success = (payload: Voucher): IHouseVoucherAddSuccessAction => {
  return {
    type: HOUSE_VOUCHER_ADD_SUCCESS,
    payload,
  };
};

export const loading = (loading: boolean): IHouseVoucherAddLoadingAction => {
  return {
    type: HOUSE_VOUCHER_ADD_LOADING,
    loading,
  };
};

export const errors = (errors: Error[]): IHouseVoucherAddErrorAction => {
  return {
    type: HOUSE_VOUCHER_ADD_ERROR,
    errors,
  };
};

export const reset = (): IHouseVoucherAddResetAction => {
  return {
    type: HOUSE_VOUCHER_ADD_RESET,
  };
};

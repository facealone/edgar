import { IError } from '../../../common/models/Error';
import {
  HOUSE_VOUCHER_LIST_RESET,
  HOUSE_VOUCHER_LIST_SUCCESS,
  HOUSE_VOUCHER_LIST_LOADING,
  HOUSE_VOUCHER_LIST_ERROR,
} from '../../constants/voucher/list';
import {
  IHouseVoucherListSuccessAction,
  IHouseVoucherListResetAction,
  IHouseVoucherListErrorAction,
  IHouseVoucherListLoadingAction,
} from '../../types/voucher/list';
import { IVoucher } from '../../models/Voucher';

export const success = (
  payload: IVoucher[],
): IHouseVoucherListSuccessAction => {
  return {
    type: HOUSE_VOUCHER_LIST_SUCCESS,
    payload,
  };
};

export const loading = (loading: boolean): IHouseVoucherListLoadingAction => {
  return {
    type: HOUSE_VOUCHER_LIST_LOADING,
    loading,
  };
};

export const errors = (errors: IError[]): IHouseVoucherListErrorAction => {
  return {
    type: HOUSE_VOUCHER_LIST_ERROR,
    errors,
  };
};

export const reset = (): IHouseVoucherListResetAction => {
  return {
    type: HOUSE_VOUCHER_LIST_RESET,
  };
};

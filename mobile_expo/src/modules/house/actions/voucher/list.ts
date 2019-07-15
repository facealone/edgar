import { Error } from '../../../common/models/Error';
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
import { Voucher } from '../../models/Voucher';
import { Pagination } from '../../../common/models/Pagination';

export const success = (
  payload: Pagination<Voucher>,
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

export const errors = (errors: Error[]): IHouseVoucherListErrorAction => {
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

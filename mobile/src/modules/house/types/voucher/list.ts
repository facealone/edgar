import {
  HOUSE_VOUCHER_LIST_SUCCESS,
  HOUSE_VOUCHER_LIST_LOADING,
  HOUSE_VOUCHER_LIST_ERROR,
  HOUSE_VOUCHER_LIST_RESET,
} from '../../constants/voucher/list';
import { IState } from '../../../common/types/states';
import { ILoadingAction, IErrorAction } from '../../../common/types/actions';
import { IVoucher } from '../../models/Voucher';
import { IHouseVoucherAddSuccessAction } from './add';

export interface IHouseVoucherListState extends IState {
  payload: IVoucher[];
}

export interface IHouseVoucherListSuccessAction {
  type: typeof HOUSE_VOUCHER_LIST_SUCCESS;
  payload: IVoucher[];
}

export interface IHouseVoucherListLoadingAction extends ILoadingAction {
  type: typeof HOUSE_VOUCHER_LIST_LOADING;
}

export interface IHouseVoucherListErrorAction extends IErrorAction {
  type: typeof HOUSE_VOUCHER_LIST_ERROR;
}

export interface IHouseVoucherListResetAction {
  type: typeof HOUSE_VOUCHER_LIST_RESET;
}

export type IHouseVoucherListActionTypes =
  | IHouseVoucherListSuccessAction
  | IHouseVoucherAddSuccessAction
  | IHouseVoucherListLoadingAction
  | IHouseVoucherListErrorAction
  | IHouseVoucherListResetAction;

import { IState } from '../../../common/types/states';
import {
  HOUSE_VOUCHER_ADD_SUCCESS,
  HOUSE_VOUCHER_ADD_ERROR,
  HOUSE_VOUCHER_ADD_LOADING,
  HOUSE_VOUCHER_ADD_RESET,
} from '../../constants/voucher/add';
import { IErrorAction, ILoadingAction } from '../../../common/types/actions';
import { Voucher } from '../../models/Voucher';

export interface IHouseVoucherAddState extends IState {
  payload: Voucher | null;
}

export interface IHouseVoucherAddSuccessAction {
  type: typeof HOUSE_VOUCHER_ADD_SUCCESS;
  payload: Voucher;
}

export interface IHouseVoucherAddErrorAction extends IErrorAction {
  type: typeof HOUSE_VOUCHER_ADD_ERROR;
}

export interface IHouseVoucherAddLoadingAction extends ILoadingAction {
  type: typeof HOUSE_VOUCHER_ADD_LOADING;
}

export interface IHouseVoucherAddResetAction {
  type: typeof HOUSE_VOUCHER_ADD_RESET;
}

export interface IHouseVoucherForm {
  name: string;
}

export interface IVoucherForm {
  username: string;
  role: string;
  houseId: string;
}

export type IHouseVoucherAddActionTypes =
  | IHouseVoucherAddSuccessAction
  | IHouseVoucherAddErrorAction
  | IHouseVoucherAddLoadingAction
  | IHouseVoucherAddResetAction;

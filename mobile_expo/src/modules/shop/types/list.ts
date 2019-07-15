import {
  SHOP_LIST_SUCCESS,
  SHOP_LIST_LOADING,
  SHOP_LIST_RESET,
  SHOP_LIST_ERROR,
} from '../constants/list';
import { IState } from '../../common/types/states';
import { ILoadingAction, IErrorAction } from '../../common/types/actions';
import { Shop } from '../models/Shop';
import { IShopAddSuccessAction } from './add';
import { ICurrentHouseSuccessAction } from '../../house/types/current';
import { IAuthenticationLogoutAction } from '../../auth/types/authentication';
import { Pagination } from '../../common/models/Pagination';

export interface IShopListState extends IState {
  payload: Pagination<Shop>;
}

export interface IShopListSuccessAction {
  type: typeof SHOP_LIST_SUCCESS;
  payload: Pagination<Shop>;
}

export interface IShopListLoadingAction extends ILoadingAction {
  type: typeof SHOP_LIST_LOADING;
}

export interface IShopListResetAction {
  type: typeof SHOP_LIST_RESET;
}

export interface IShopListErrorAction extends IErrorAction {
  type: typeof SHOP_LIST_ERROR;
}

export type IShopListActionTypes =
  | IShopListSuccessAction
  | IShopAddSuccessAction
  | IShopListLoadingAction
  | IShopListResetAction
  | IAuthenticationLogoutAction
  | ICurrentHouseSuccessAction
  | IShopListErrorAction;

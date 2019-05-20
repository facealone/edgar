import {
  SHOP_LIST_SUCCESS,
  SHOP_LIST_LOADING,
  SHOP_LIST_RESET,
  SHOP_LIST_ERROR,
} from '../constants/list';
import { IListState } from '../../../types/states';
import {
  IListSuccessAction,
  ILoadingAction,
  IErrorAction,
} from '../../../types/actions';

export interface IShopListState extends IListState {}

export interface IShopListSuccessAction extends IListSuccessAction {
  type: typeof SHOP_LIST_SUCCESS;
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
  | IShopListLoadingAction
  | IShopListResetAction
  | IShopListErrorAction;

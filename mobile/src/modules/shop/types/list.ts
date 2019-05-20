import {
  SHOP_LIST_SUCCESS,
  SHOP_LIST_LOADING,
  SHOP_LIST_RESET,
  SHOP_LIST_ERROR,
} from '../constants/list';

export interface IShopListState {
  loading: boolean;
  errors: [];
  payload: [];
}

export interface IShopListSuccessAction {
  type: typeof SHOP_LIST_SUCCESS;
  payload: [];
}

export interface IShopListLoadingAction {
  type: typeof SHOP_LIST_LOADING;
  loading: boolean;
}

export interface IShopListResetAction {
  type: typeof SHOP_LIST_RESET;
}

export interface IShopListErrorAction {
  type: typeof SHOP_LIST_ERROR;
  errors: [];
}

export type IShopListActionTypes =
  | IShopListSuccessAction
  | IShopListLoadingAction
  | IShopListResetAction
  | IShopListErrorAction;

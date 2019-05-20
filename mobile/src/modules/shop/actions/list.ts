import {
  SHOP_LIST_SUCCESS,
  SHOP_LIST_LOADING,
  SHOP_LIST_ERROR,
  SHOP_LIST_RESET,
} from '../constants/list';
import {
  IShopListSuccessAction,
  IShopListErrorAction,
  IShopListLoadingAction,
  IShopListResetAction,
} from '../types/list';

export const success = (payload: []): IShopListSuccessAction => {
  return {
    type: SHOP_LIST_SUCCESS,
    payload,
  };
};

export const loading = (loading: boolean): IShopListLoadingAction => {
  return {
    type: SHOP_LIST_LOADING,
    loading,
  };
};

export const errors = (errors: []): IShopListErrorAction => {
  return {
    type: SHOP_LIST_ERROR,
    errors,
  };
};

export const reset = (): IShopListResetAction => {
  return {
    type: SHOP_LIST_RESET,
  };
};

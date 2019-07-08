import { Shop } from '../models/Shop';
import {
  IShopAddSuccessAction,
  IShopAddLoadingAction,
  IShopAddErrorAction,
  IShopAddResetAction,
} from '../types/add';
import {
  SHOP_ADD_SUCCESS,
  SHOP_ADD_LOADING,
  SHOP_ADD_ERROR,
  SHOP_ADD_RESET,
} from '../constants/add';
import { IError } from '../../common/models/Error';

export const success = (payload: Shop): IShopAddSuccessAction => {
  return {
    type: SHOP_ADD_SUCCESS,
    payload,
  };
};
export const loading = (loading: boolean): IShopAddLoadingAction => {
  return {
    type: SHOP_ADD_LOADING,
    loading,
  };
};
export const errors = (errors: IError[]): IShopAddErrorAction => {
  return {
    type: SHOP_ADD_ERROR,
    errors,
  };
};

export const reset = (): IShopAddResetAction => {
  return {
    type: SHOP_ADD_RESET,
  };
};

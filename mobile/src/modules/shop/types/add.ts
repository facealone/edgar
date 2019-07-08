import { IState } from '../../common/types/states';
import { Shop } from '../models/Shop';
import {
  SHOP_ADD_SUCCESS,
  SHOP_ADD_LOADING,
  SHOP_ADD_ERROR,
  SHOP_ADD_RESET,
} from '../constants/add';
import { ILoadingAction, IErrorAction } from '../../common/types/actions';

export interface IShopAddState extends IState {
  payload: Shop | null;
}

export interface IShopAddSuccessAction {
  type: typeof SHOP_ADD_SUCCESS;
  payload: Shop;
}

export interface IShopAddLoadingAction extends ILoadingAction {
  type: typeof SHOP_ADD_LOADING;
}

export interface IShopAddErrorAction extends IErrorAction {
  type: typeof SHOP_ADD_ERROR;
}

export interface IShopAddResetAction {
  type: typeof SHOP_ADD_RESET;
}

export interface IShopForm {
  name: string;
}

export type IShopAddActionTypes =
  | IShopAddSuccessAction
  | IShopAddLoadingAction
  | IShopAddErrorAction
  | IShopAddResetAction;

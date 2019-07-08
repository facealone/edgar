import {
  HOUSE_LIST_SUCCESS,
  HOUSE_LIST_LOADING,
  HOUSE_LIST_ERROR,
  HOUSE_LIST_RESET,
} from '../constants/list';
import { IState } from '../../common/types/states';
import { ILoadingAction, IErrorAction } from '../../common/types/actions';
import { House } from '../models/House';
import { IHouseAddActionTypes } from './add';
import { IAuthenticationLogoutAction } from '../../auth/types/authentication';
import { Pagination } from '../../common/models/Pagination';

export interface IHouseListState extends IState {
  payload: Pagination<House>;
}

export interface IHouseListSuccessAction {
  type: typeof HOUSE_LIST_SUCCESS;
  payload: Pagination<House>;
}

export interface IHouseListLoadingAction extends ILoadingAction {
  type: typeof HOUSE_LIST_LOADING;
}

export interface IHouseListErrorAction extends IErrorAction {
  type: typeof HOUSE_LIST_ERROR;
}

export interface IHouseListResetAction {
  type: typeof HOUSE_LIST_RESET;
}

export type IHouseListActionTypes =
  | IHouseAddActionTypes
  | IHouseListSuccessAction
  | IAuthenticationLogoutAction
  | IHouseListLoadingAction
  | IHouseListErrorAction
  | IHouseListResetAction;

import {
  HOUSE_LIST_SUCCESS,
  HOUSE_LIST_LOADING,
  HOUSE_LIST_ERROR,
  HOUSE_LIST_RESET,
} from '../constants/list';
import { IListState } from '../../../types/states';
import {
  IListSuccessAction,
  ILoadingAction,
  IErrorAction,
} from '../../../types/actions';

export interface IHouseListState extends IListState {}

export interface IHouseListSuccessAction extends IListSuccessAction {
  type: typeof HOUSE_LIST_SUCCESS;
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
  | IHouseListSuccessAction
  | IHouseListLoadingAction
  | IHouseListErrorAction
  | IHouseListResetAction;

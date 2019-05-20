import {
  HOUSE_LIST_SUCCESS,
  HOUSE_LIST_LOADING,
  HOUSE_LIST_ERROR,
  HOUSE_LIST_RESET,
} from '../constants/list';

export interface IHouseListState {
  loading: boolean;
  errors: [];
  payload: [];
}

export interface IHouseListSuccessAction {
  type: typeof HOUSE_LIST_SUCCESS;
  payload: [];
}

export interface IHouseListLoadingAction {
  type: typeof HOUSE_LIST_LOADING;
  loading: boolean;
}

export interface IHouseListErrorAction {
  type: typeof HOUSE_LIST_ERROR;
  errors: [];
}

export interface IHouseListResetAction {
  type: typeof HOUSE_LIST_RESET;
}

export type IHouseListActionTypes =
  | IHouseListSuccessAction
  | IHouseListLoadingAction
  | IHouseListErrorAction
  | IHouseListResetAction;

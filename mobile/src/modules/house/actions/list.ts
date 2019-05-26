import {
  HOUSE_LIST_ERROR,
  HOUSE_LIST_SUCCESS,
  HOUSE_LIST_LOADING,
  HOUSE_LIST_RESET,
} from '../constants/list';
import {
  IHouseListSuccessAction,
  IHouseListLoadingAction,
  IHouseListErrorAction,
  IHouseListResetAction,
} from '../types/list';
import { IHouse } from '../models/House';

export const success = (payload: IHouse[]): IHouseListSuccessAction => {
  return {
    type: HOUSE_LIST_SUCCESS,
    payload,
  };
};

export const loading = (loading: boolean): IHouseListLoadingAction => {
  return {
    type: HOUSE_LIST_LOADING,
    loading,
  };
};

export const errors = (errors: []): IHouseListErrorAction => {
  return {
    type: HOUSE_LIST_ERROR,
    errors,
  };
};

export const reset = (): IHouseListResetAction => {
  return {
    type: HOUSE_LIST_RESET,
  };
};

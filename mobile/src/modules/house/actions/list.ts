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
import { House } from '../models/House';
import { Error } from '../../common/models/Error';
import { Pagination } from '../../common/models/Pagination';

export const success = (
  payload: Pagination<House>,
): IHouseListSuccessAction => {
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

export const errors = (errors: Error[]): IHouseListErrorAction => {
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

import {
  HOUSE_CURRENT_SUCCESS,
  HOUSE_CURRENT_LOADING,
  HOUSE_CURRENT_ERROR,
  HOUSE_CURRENT_RESET,
} from '../constants/current';
import { House } from '../models/House';
import {
  ICurrentHouseSuccessAction,
  ICurrentHouseLoadingAction,
  ICurrentHouseErrorAction,
  ICurrentHouseResetAction,
} from '../types/current';
import { Error } from '../../common/models/Error';

export const success = (
  payload: House,
  success: boolean,
): ICurrentHouseSuccessAction => {
  return {
    type: HOUSE_CURRENT_SUCCESS,
    payload,
    success,
  };
};

export const loading = (loading: boolean): ICurrentHouseLoadingAction => {
  return {
    type: HOUSE_CURRENT_LOADING,
    loading,
  };
};

export const errors = (errors: Error[]): ICurrentHouseErrorAction => {
  return {
    type: HOUSE_CURRENT_ERROR,
    errors,
  };
};

export const reset = (): ICurrentHouseResetAction => {
  return {
    type: HOUSE_CURRENT_RESET,
  };
};

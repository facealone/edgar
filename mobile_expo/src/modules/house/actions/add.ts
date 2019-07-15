import { Error } from '../../common/models/Error';
import {
  HOUSE_ADD_RESET,
  HOUSE_ADD_SUCCESS,
  HOUSE_ADD_LOADING,
  HOUSE_ADD_ERROR,
} from '../constants/add';
import {
  IHouseAddSuccessAction,
  IHouseAddResetAction,
  IHouseAddErrorAction,
  IHouseAddLoadingAction,
} from '../types/add';
import { House } from '../models/House';

export const success = (payload: House): IHouseAddSuccessAction => {
  return {
    type: HOUSE_ADD_SUCCESS,
    payload,
  };
};

export const loading = (loading: boolean): IHouseAddLoadingAction => {
  return {
    type: HOUSE_ADD_LOADING,
    loading,
  };
};

export const errors = (errors: Error[]): IHouseAddErrorAction => {
  return {
    type: HOUSE_ADD_ERROR,
    errors,
  };
};

export const reset = (): IHouseAddResetAction => {
  return {
    type: HOUSE_ADD_RESET,
  };
};

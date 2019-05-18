import {
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_ERROR,
  USER_REGISTRATION_RESET,
  USER_REGISTRATION_LOADING,
} from '../constants/registration';
import {
  ISuccessAction,
  IErrorAction,
  IResetAction,
  ILoadingAction,
} from '../types/registration';

export const success = (payload: string): ISuccessAction => {
  return {
    type: USER_REGISTRATION_SUCCESS,
    payload,
  };
};

export const loading = (loading: boolean): ILoadingAction => {
  return {
    type: USER_REGISTRATION_LOADING,
    loading,
  };
};

export const errors = (errors: []): IErrorAction => {
  return {
    type: USER_REGISTRATION_ERROR,
    errors,
  };
};

export const reset = (): IResetAction => {
  return {
    type: USER_REGISTRATION_RESET,
  };
};

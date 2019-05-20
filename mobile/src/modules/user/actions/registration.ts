import {
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_ERROR,
  USER_REGISTRATION_RESET,
  USER_REGISTRATION_LOADING,
} from '../constants/registration';
import {
  IRegistrationSuccessAction,
  IRegistrationErrorAction,
  IRegistrationResetAction,
  IRegistrationLoadingAction,
} from '../types/registration';

export const success = (payload: string): IRegistrationSuccessAction => {
  return {
    type: USER_REGISTRATION_SUCCESS,
    payload,
  };
};

export const loading = (loading: boolean): IRegistrationLoadingAction => {
  return {
    type: USER_REGISTRATION_LOADING,
    loading,
  };
};

export const errors = (errors: []): IRegistrationErrorAction => {
  return {
    type: USER_REGISTRATION_ERROR,
    errors,
  };
};

export const reset = (): IRegistrationResetAction => {
  return {
    type: USER_REGISTRATION_RESET,
  };
};

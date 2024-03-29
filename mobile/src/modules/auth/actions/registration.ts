import {
  AUTH_REGISTRATION_ERROR,
  AUTH_REGISTRATION_RESET,
  AUTH_REGISTRATION_LOADING,
} from '../constants/registration';
import {
  IRegistrationErrorAction,
  IRegistrationResetAction,
  IRegistrationLoadingAction,
} from '../types/registration';
import { Error } from '../../common/models/Error';

export const loading = (loading: boolean): IRegistrationLoadingAction => {
  return {
    type: AUTH_REGISTRATION_LOADING,
    loading,
  };
};

export const errors = (errors: Error[]): IRegistrationErrorAction => {
  return {
    type: AUTH_REGISTRATION_ERROR,
    errors,
  };
};

export const reset = (): IRegistrationResetAction => {
  return {
    type: AUTH_REGISTRATION_RESET,
  };
};

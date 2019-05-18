import {
  USER_AUTHENTICATION_AUTHENTICATED,
  USER_AUTHENTICATION_LOADING,
  USER_AUTHENTICATION_ERROR,
  USER_AUTHENTICATION_RESET,
  USER_AUTHENTICATION_LOGOUT,
} from '../constants/authentication';
import {
  IErrorAction,
  IResetAction,
  ILogoutAction,
  ILoadingAction,
  IAuthenticatedAction,
} from '../types/authentication';

export const authenticated = (authenticated: boolean): IAuthenticatedAction => {
  return {
    type: USER_AUTHENTICATION_AUTHENTICATED,
    authenticated,
  };
};

export const loading = (loading: boolean): ILoadingAction => {
  return {
    type: USER_AUTHENTICATION_LOADING,
    loading,
  };
};

export const errors = (errors: []): IErrorAction => {
  return {
    type: USER_AUTHENTICATION_ERROR,
    errors,
  };
};

export const reset = (): IResetAction => {
  return {
    type: USER_AUTHENTICATION_RESET,
  };
};

export const logout = (): ILogoutAction => {
  return {
    type: USER_AUTHENTICATION_LOGOUT,
  };
};

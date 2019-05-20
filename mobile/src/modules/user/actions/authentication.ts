import {
  USER_AUTHENTICATION_AUTHENTICATED,
  USER_AUTHENTICATION_LOADING,
  USER_AUTHENTICATION_ERROR,
  USER_AUTHENTICATION_RESET,
  USER_AUTHENTICATION_LOGOUT,
} from '../constants/authentication';
import {
  IAuthenticationErrorAction,
  IAuthenticationResetAction,
  IAuthenticationLogoutAction,
  IAuthenticationLoadingAction,
  IAuthenticatedAction,
} from '../types/authentication';

export const authenticated = (authenticated: boolean): IAuthenticatedAction => {
  return {
    type: USER_AUTHENTICATION_AUTHENTICATED,
    authenticated,
  };
};

export const loading = (loading: boolean): IAuthenticationLoadingAction => {
  return {
    type: USER_AUTHENTICATION_LOADING,
    loading,
  };
};

export const errors = (errors: []): IAuthenticationErrorAction => {
  return {
    type: USER_AUTHENTICATION_ERROR,
    errors,
  };
};

export const reset = (): IAuthenticationResetAction => {
  return {
    type: USER_AUTHENTICATION_RESET,
  };
};

export const logout = (): IAuthenticationLogoutAction => {
  return {
    type: USER_AUTHENTICATION_LOGOUT,
  };
};

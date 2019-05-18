import {
  USER_AUTHENTICATION_AUTHENTICATED,
  USER_AUTHENTICATION_RESET,
  USER_AUTHENTICATION_ERROR,
  USER_AUTHENTICATION_LOGOUT,
  USER_AUTHENTICATION_LOADING,
} from '../constants/authentication';

export interface IAuthenticatedUserState {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}

export interface IAuthenticatedState {
  loading: boolean;
  authenticated: boolean;
  errors: [];
  user: IAuthenticatedUserState;
}

export interface IAuthenticatedAction {
  type: typeof USER_AUTHENTICATION_AUTHENTICATED;
  authenticated: boolean;
}

export interface ILoadingAction {
  type: typeof USER_AUTHENTICATION_LOADING;
  loading: boolean;
}

export interface IResetAction {
  type: typeof USER_AUTHENTICATION_RESET;
}

export interface IErrorAction {
  type: typeof USER_AUTHENTICATION_ERROR;
  errors: [];
}

export interface ILogoutAction {
  type: typeof USER_AUTHENTICATION_LOGOUT;
}

export type AuthenticationActionTypes =
  | IAuthenticatedAction
  | ILoadingAction
  | IErrorAction
  | IResetAction
  | ILogoutAction;

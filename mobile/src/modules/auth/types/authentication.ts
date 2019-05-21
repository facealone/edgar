import {
  AUTH_AUTHENTICATION_AUTHENTICATED,
  AUTH_AUTHENTICATION_RESET,
  AUTH_AUTHENTICATION_ERROR,
  AUTH_AUTHENTICATION_LOGOUT,
  AUTH_AUTHENTICATION_LOADING,
  AUTH_AUTHENTICATION_USER,
} from '../constants/authentication';
import { ILoadingAction, IErrorAction } from '../../../types/actions';
import { IBaseState } from '../../../types/states';

export interface IAuthenticationUserState {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  currentHouse: string | null;
}

export interface IAuthenticationState extends IBaseState {
  authenticated: boolean;
  user: IAuthenticationUserState;
}

export interface IAuthenticatedAction {
  type: typeof AUTH_AUTHENTICATION_AUTHENTICATED;
  authenticated: boolean;
}

export interface IAuthenticationUserAction {
  type: typeof AUTH_AUTHENTICATION_USER;
  user: IAuthenticationUserState;
}

export interface IAuthenticationLoadingAction extends ILoadingAction {
  type: typeof AUTH_AUTHENTICATION_LOADING;
}

export interface IAuthenticationResetAction {
  type: typeof AUTH_AUTHENTICATION_RESET;
}

export interface IAuthenticationErrorAction extends IErrorAction {
  type: typeof AUTH_AUTHENTICATION_ERROR;
  errors: [];
}

export interface IAuthenticationLogoutAction {
  type: typeof AUTH_AUTHENTICATION_LOGOUT;
}

export type AuthenticationActionTypes =
  | IAuthenticatedAction
  | IAuthenticationLoadingAction
  | IAuthenticationErrorAction
  | IAuthenticationResetAction
  | IAuthenticationLogoutAction
  | IAuthenticationUserAction;

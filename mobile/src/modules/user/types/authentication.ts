import {
  USER_AUTHENTICATION_AUTHENTICATED,
  USER_AUTHENTICATION_RESET,
  USER_AUTHENTICATION_ERROR,
  USER_AUTHENTICATION_LOGOUT,
  USER_AUTHENTICATION_LOADING,
} from '../constants/authentication';
import { ILoadingAction, IErrorAction } from '../../../types/actions';
import { IBaseState } from '../../../types/states';

export interface IAuthenticatedUserState {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}

export interface IAuthenticatedState extends IBaseState {
  authenticated: boolean;
  user: IAuthenticatedUserState;
}

export interface IAuthenticatedAction {
  type: typeof USER_AUTHENTICATION_AUTHENTICATED;
  authenticated: boolean;
}

export interface IAuthenticationLoadingAction extends ILoadingAction {
  type: typeof USER_AUTHENTICATION_LOADING;
}

export interface IAuthenticationResetAction {
  type: typeof USER_AUTHENTICATION_RESET;
}

export interface IAuthenticationErrorAction extends IErrorAction {
  type: typeof USER_AUTHENTICATION_ERROR;
  errors: [];
}

export interface IAuthenticationLogoutAction {
  type: typeof USER_AUTHENTICATION_LOGOUT;
}

export type AuthenticationActionTypes =
  | IAuthenticatedAction
  | IAuthenticationLoadingAction
  | IAuthenticationErrorAction
  | IAuthenticationResetAction
  | IAuthenticationLogoutAction;

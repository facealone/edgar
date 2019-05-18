import {
  USER_REGISTRATION_ERROR,
  USER_REGISTRATION_LOADING,
  USER_REGISTRATION_RESET,
  USER_REGISTRATION_SUCCESS,
} from '../constants/registration';

export interface IRegistrationState {
  loading: boolean;
  payload: string | null;
  errors: [];
}

export interface ISuccessAction {
  type: typeof USER_REGISTRATION_SUCCESS;
  payload: string;
}

export interface ILoadingAction {
  type: typeof USER_REGISTRATION_LOADING;
  loading: boolean;
}

export interface IResetAction {
  type: typeof USER_REGISTRATION_RESET;
}

export interface IErrorAction {
  type: typeof USER_REGISTRATION_ERROR;
  errors: [];
}

export type RegistrationActionTypes =
  | ISuccessAction
  | ILoadingAction
  | IResetAction
  | IErrorAction;

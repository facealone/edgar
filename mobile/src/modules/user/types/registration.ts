import {
  USER_REGISTRATION_ERROR,
  USER_REGISTRATION_LOADING,
  USER_REGISTRATION_RESET,
  USER_REGISTRATION_SUCCESS,
} from '../constants/registration';
import { IErrorAction, ILoadingAction } from '../../../types/actions';
import { IBaseState } from '../../../types/states';

export interface IRegistrationState extends IBaseState {
  payload: string | null;
}

export interface IRegistrationSuccessAction {
  type: typeof USER_REGISTRATION_SUCCESS;
  payload: string;
}

export interface IRegistrationLoadingAction extends ILoadingAction {
  type: typeof USER_REGISTRATION_LOADING;
}

export interface IRegistrationResetAction {
  type: typeof USER_REGISTRATION_RESET;
}

export interface IRegistrationErrorAction extends IErrorAction {
  type: typeof USER_REGISTRATION_ERROR;
}

export type RegistrationActionTypes =
  | IRegistrationSuccessAction
  | IRegistrationLoadingAction
  | IRegistrationResetAction
  | IRegistrationErrorAction;

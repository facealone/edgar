import {
  AUTH_REGISTRATION_ERROR,
  AUTH_REGISTRATION_LOADING,
  AUTH_REGISTRATION_RESET,
} from '../constants/registration';
import { IErrorAction, ILoadingAction } from '../../common/types/actions';
import { IState } from '../../common/types/states';

export interface IRegistrationState extends IState {}

export interface IRegistrationLoadingAction extends ILoadingAction {
  type: typeof AUTH_REGISTRATION_LOADING;
}

export interface IRegistrationResetAction {
  type: typeof AUTH_REGISTRATION_RESET;
}

export interface IRegistrationErrorAction extends IErrorAction {
  type: typeof AUTH_REGISTRATION_ERROR;
}

export type RegistrationActionTypes =
  | IRegistrationLoadingAction
  | IRegistrationResetAction
  | IRegistrationErrorAction;

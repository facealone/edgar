import { IHouse } from '../models/House';
import {
  HOUSE_CURRENT_SUCCESS,
  HOUSE_CURRENT_LOADING,
  HOUSE_CURRENT_ERROR,
  HOUSE_CURRENT_RESET,
} from '../constants/current';
import { IHouseAddSuccessAction } from './add';
import { IAuthenticationLogoutAction } from '../../auth/types/authentication';
import { IState } from '../../common/types/states';
import { ILoadingAction, IErrorAction } from '../../common/types/actions';

export interface ICurrentHouseState extends IState {
  payload: IHouse | null;
}

export interface ICurrentHouseSuccessAction {
  type: typeof HOUSE_CURRENT_SUCCESS;
  payload: IHouse;
}

export interface ICurrentHouseLoadingAction extends ILoadingAction {
  type: typeof HOUSE_CURRENT_LOADING;
}

export interface ICurrentHouseErrorAction extends IErrorAction {
  type: typeof HOUSE_CURRENT_ERROR;
}

export interface ICurrentHouseResetAction {
  type: typeof HOUSE_CURRENT_RESET;
}

export type ICurrentHouseActionTypes =
  | IAuthenticationLogoutAction
  | ICurrentHouseSuccessAction
  | ICurrentHouseResetAction
  | ICurrentHouseErrorAction
  | ICurrentHouseLoadingAction
  | IHouseAddSuccessAction;

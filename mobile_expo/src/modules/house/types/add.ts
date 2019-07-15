import { IState } from '../../common/types/states';
import { House } from '../models/House';
import {
  HOUSE_ADD_SUCCESS,
  HOUSE_ADD_ERROR,
  HOUSE_ADD_LOADING,
  HOUSE_ADD_RESET,
} from '../constants/add';
import { IErrorAction, ILoadingAction } from '../../common/types/actions';

export interface IHouseAddState extends IState {
  payload: House | null;
}

export interface IHouseAddSuccessAction {
  type: typeof HOUSE_ADD_SUCCESS;
  payload: House;
}

export interface IHouseAddErrorAction extends IErrorAction {
  type: typeof HOUSE_ADD_ERROR;
}

export interface IHouseAddLoadingAction extends ILoadingAction {
  type: typeof HOUSE_ADD_LOADING;
}

export interface IHouseAddResetAction {
  type: typeof HOUSE_ADD_RESET;
}

export interface IHouseForm {
  name: string;
}

export type IHouseAddActionTypes =
  | IHouseAddSuccessAction
  | IHouseAddErrorAction
  | IHouseAddLoadingAction
  | IHouseAddResetAction;

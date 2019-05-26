import {
  CARD_ADD_SUCCESS,
  CARD_ADD_ERROR,
  CARD_ADD_LOADING,
  CARD_ADD_RESET,
} from '../constants/add';
import {
  ILoadingAction,
  IErrorAction,
  ISuccessAction,
} from '../../../types/actions';
import { IState } from '../../../types/states';

export interface ICardAddState extends IState {}

export interface ICardAddSuccessAction extends ISuccessAction {
  type: typeof CARD_ADD_SUCCESS;
}

export interface ICardAddErrorAction extends IErrorAction {
  type: typeof CARD_ADD_ERROR;
}

export interface ICardAddLoadingAction extends ILoadingAction {
  type: typeof CARD_ADD_LOADING;
}

export interface ICardAddResetAction {
  type: typeof CARD_ADD_RESET;
}

export type ICardAddActionTypes =
  | ICardAddSuccessAction
  | ICardAddErrorAction
  | ICardAddLoadingAction
  | ICardAddResetAction;

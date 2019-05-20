import {
  CARD_LIST_SUCCESS,
  CARD_LIST_LOADING,
  CARD_LIST_RESET,
  CARD_LIST_ERROR,
} from '../constants/list';
import {
  IListSuccessAction,
  ILoadingAction,
  IErrorAction,
} from '../../../types/actions';
import { IListState } from '../../../types/states';

export interface ICardListState extends IListState {}

export interface ICardListSuccessAction extends IListSuccessAction {
  type: typeof CARD_LIST_SUCCESS;
}

export interface ICardListLoadingAction extends ILoadingAction {
  type: typeof CARD_LIST_LOADING;
}

export interface ICardListResetAction {
  type: typeof CARD_LIST_RESET;
}

export interface ICardListErrorAction extends IErrorAction {
  type: typeof CARD_LIST_ERROR;
}

export type ICardListActionTypes =
  | ICardListSuccessAction
  | ICardListLoadingAction
  | ICardListResetAction
  | ICardListErrorAction;

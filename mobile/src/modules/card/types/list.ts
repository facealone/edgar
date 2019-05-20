import {
  CARD_LIST_SUCCESS,
  CARD_LIST_LOADING,
  CARD_LIST_RESET,
  CARD_LIST_ERROR,
} from '../constants/list';

export interface ICardListState {
  loading: boolean;
  errors: [];
  payload: [];
}

export interface ICardListSuccessAction {
  type: typeof CARD_LIST_SUCCESS;
  payload: [];
}

export interface ICardListLoadingAction {
  type: typeof CARD_LIST_LOADING;
  loading: boolean;
}

export interface ICardListResetAction {
  type: typeof CARD_LIST_RESET;
}

export interface ICardListErrorAction {
  type: typeof CARD_LIST_ERROR;
  errors: [];
}

export type ICardListActionTypes =
  | ICardListSuccessAction
  | ICardListLoadingAction
  | ICardListResetAction
  | ICardListErrorAction;

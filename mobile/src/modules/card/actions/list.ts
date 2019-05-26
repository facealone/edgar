import {
  CARD_LIST_SUCCESS,
  CARD_LIST_LOADING,
  CARD_LIST_ERROR,
  CARD_LIST_RESET,
} from '../constants/list';
import {
  ICardListSuccessAction,
  ICardListErrorAction,
  ICardListLoadingAction,
  ICardListResetAction,
} from '../types/list';
import { ICard } from '../models/Card';

export const success = (payload: ICard[]): ICardListSuccessAction => {
  return {
    type: CARD_LIST_SUCCESS,
    payload,
  };
};

export const loading = (loading: boolean): ICardListLoadingAction => {
  return {
    type: CARD_LIST_LOADING,
    loading,
  };
};

export const errors = (errors: []): ICardListErrorAction => {
  return {
    type: CARD_LIST_ERROR,
    errors,
  };
};

export const reset = (): ICardListResetAction => {
  return {
    type: CARD_LIST_RESET,
  };
};

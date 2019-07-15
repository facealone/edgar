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
import { Card } from '../models/Card';
import { Error } from '../../common/models/Error';
import { Pagination } from '../../common/models/Pagination';

export const success = (payload: Pagination<Card>): ICardListSuccessAction => {
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

export const errors = (errors: Error[]): ICardListErrorAction => {
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

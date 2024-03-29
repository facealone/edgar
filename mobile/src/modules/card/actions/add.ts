import {
  CARD_ADD_LOADING,
  CARD_ADD_SUCCESS,
  CARD_ADD_ERROR,
  CARD_ADD_RESET,
} from '../constants/add';
import {
  ICardAddLoadingAction,
  ICardAddSuccessAction,
  ICardAddErrorAction,
  ICardAddResetAction,
} from '../types/add';
import { Card } from '../models/Card';
import { Error } from '../../common/models/Error';

export const loading = (loading: boolean): ICardAddLoadingAction => {
  return {
    type: CARD_ADD_LOADING,
    loading,
  };
};

export const success = (payload: Card): ICardAddSuccessAction => {
  return {
    type: CARD_ADD_SUCCESS,
    payload,
  };
};

export const errors = (errors: Error[]): ICardAddErrorAction => {
  return {
    type: CARD_ADD_ERROR,
    errors,
  };
};

export const reset = (): ICardAddResetAction => {
  return {
    type: CARD_ADD_RESET,
  };
};

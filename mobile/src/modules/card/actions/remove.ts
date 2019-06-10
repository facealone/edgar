import {
  CARD_REMOVE_LOADING,
  CARD_REMOVE_SUCCESS,
  CARD_REMOVE_ERROR,
  CARD_REMOVE_RESET,
} from '../constants/remove';
import { IError } from '../../common/models/Error';
import {
  ICardRemoveLoadingAction,
  ICardRemoveSuccessAction,
  ICardRemoveErrorAction,
  ICardRemoveResetAction,
} from '../types/remove';

export const loading = (loading: boolean): ICardRemoveLoadingAction => {
  return {
    type: CARD_REMOVE_LOADING,
    loading,
  };
};

export const success = (id: string): ICardRemoveSuccessAction => {
  return {
    type: CARD_REMOVE_SUCCESS,
    id,
  };
};

export const errors = (errors: IError[]): ICardRemoveErrorAction => {
  return {
    type: CARD_REMOVE_ERROR,
    errors,
  };
};

export const reset = (): ICardRemoveResetAction => {
  return {
    type: CARD_REMOVE_RESET,
  };
};

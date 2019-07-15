import {
  CARD_ADD_SUCCESS,
  CARD_ADD_ERROR,
  CARD_ADD_LOADING,
  CARD_ADD_RESET,
} from '../constants/add';
import { ILoadingAction, IErrorAction } from '../../common/types/actions';
import { IState } from '../../common/types/states';
import { Card } from '../models/Card';

export interface ICardAddState extends IState {
  payload: Card | null;
}

export interface ICardAddSuccessAction {
  type: typeof CARD_ADD_SUCCESS;
  payload: Card;
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

export interface ICardForm {
  name: string;
}

export type ICardAddActionTypes =
  | ICardAddSuccessAction
  | ICardAddErrorAction
  | ICardAddLoadingAction
  | ICardAddResetAction;

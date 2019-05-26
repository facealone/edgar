import {
  CARD_ADD_SUCCESS,
  CARD_ADD_ERROR,
  CARD_ADD_LOADING,
  CARD_ADD_RESET,
} from '../constants/add';
import { ILoadingAction, IErrorAction } from '../../common/types/actions';
import { IState } from '../../common/types/states';
import { ICard } from '../models/Card';

export interface ICardAddState extends IState {
  payload: ICard | null;
}

export interface ICardAddSuccessAction {
  type: typeof CARD_ADD_SUCCESS;
  payload: ICard;
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

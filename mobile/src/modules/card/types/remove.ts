import { IState } from '../../common/types/states';
import { ILoadingAction, IErrorAction } from '../../common/types/actions';
import {
  CARD_REMOVE_LOADING,
  CARD_REMOVE_ERROR,
  CARD_REMOVE_RESET,
  CARD_REMOVE_SUCCESS,
} from '../constants/remove';

export interface ICardRemoveState extends IState {
  id: string | null;
}

export interface ICardRemoveSuccessAction {
  type: typeof CARD_REMOVE_SUCCESS;
  id: string;
}

export interface ICardRemoveLoadingAction extends ILoadingAction {
  type: typeof CARD_REMOVE_LOADING;
}

export interface ICardRemoveErrorAction extends IErrorAction {
  type: typeof CARD_REMOVE_ERROR;
}

export interface ICardRemoveResetAction {
  type: typeof CARD_REMOVE_RESET;
}

export type ICardRemoveActionTypes =
  | ICardRemoveSuccessAction
  | ICardRemoveLoadingAction
  | ICardRemoveErrorAction
  | ICardRemoveResetAction;

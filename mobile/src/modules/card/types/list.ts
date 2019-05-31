import {
  CARD_LIST_SUCCESS,
  CARD_LIST_LOADING,
  CARD_LIST_RESET,
  CARD_LIST_ERROR,
} from '../constants/list';
import { ILoadingAction, IErrorAction } from '../../common/types/actions';
import { IState } from '../../common/types/states';
import { ICardAddSuccessAction } from './add';
import { ICard } from '../models/Card';
import { IAuthenticationLogoutAction } from '../../auth/types/authentication';

export interface ICardListState extends IState {
  payload: ICard[];
}

export interface ICardListSuccessAction {
  type: typeof CARD_LIST_SUCCESS;
  payload: ICard[];
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
  | ICardAddSuccessAction
  | IAuthenticationLogoutAction
  | ICardListLoadingAction
  | ICardListResetAction
  | ICardListErrorAction;

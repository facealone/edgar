import {
  CARD_LIST_SUCCESS,
  CARD_LIST_LOADING,
  CARD_LIST_RESET,
  CARD_LIST_ERROR,
} from '../constants/list';
import { ILoadingAction, IErrorAction } from '../../common/types/actions';
import { Card } from '../models/Card';
import { IAuthenticationLogoutAction } from '../../auth/types/authentication';
import { ICurrentHouseSuccessAction } from '../../house/types/current';
import { Pagination } from '../../common/models/Pagination';
import { IState } from '../../common/types/states';
import { ICardAddSuccessAction } from './add';
import { ICardRemoveActionTypes } from './remove';

export interface ICardListState extends IState {
  payload: Pagination<Card>;
}

export interface ICardListSuccessAction {
  type: typeof CARD_LIST_SUCCESS;
  payload: Pagination<Card>;
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
  | ICardRemoveActionTypes
  | ICurrentHouseSuccessAction
  | IAuthenticationLogoutAction
  | ICardListLoadingAction
  | ICardListResetAction
  | ICardListErrorAction;

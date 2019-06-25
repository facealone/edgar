import { IState } from '../../common/types/states';
import {
  BUDGET_LIST_SUCCESS,
  BUDGET_LIST_ERROR,
  BUDGET_LIST_RESET,
  BUDGET_LIST_LOADING,
} from '../constants/list';
import { IErrorAction, ILoadingAction } from '../../common/types/actions';
import { ICurrentHouseSuccessAction } from '../../house/types/current';
import { IAuthenticationLogoutAction } from '../../auth/types/authentication';
import { Budget } from '../models/Budget';

export interface IBudgetListSate extends IState {
  payload: Budget[];
}

export interface IBudgetListSuccessAction {
  payload: Budget[];
  type: typeof BUDGET_LIST_SUCCESS;
}

export interface IBudgetListLoadingAction extends ILoadingAction {
  type: typeof BUDGET_LIST_LOADING;
}

export interface IBudgetListErrorAction extends IErrorAction {
  type: typeof BUDGET_LIST_ERROR;
}

export interface IBudgetListResetAction {
  type: typeof BUDGET_LIST_RESET;
}

export type IBudgetListActionTypes =
  | IBudgetListSuccessAction
  | IBudgetListLoadingAction
  | IBudgetListErrorAction
  | ICurrentHouseSuccessAction
  | IAuthenticationLogoutAction
  | IBudgetListResetAction;

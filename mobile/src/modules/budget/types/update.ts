import { IState } from '../../common/types/states';
import { Budget } from '../models/Budget';
import {
  BUDGET_UPDATE_SUCCESS,
  BUDGET_UPDATE_LOADING,
  BUDGET_UPDATE_ERROR,
  BUDGET_UPDATE_RESET,
} from '../constants/update';
import { IErrorAction, ILoadingAction } from '../../common/types/actions';

export interface IBudgetUpdateState extends IState {
  payload: Budget | null;
}

export interface IBudgetUpdateSuccessAction {
  payload: Budget;
  type: typeof BUDGET_UPDATE_SUCCESS;
}

export interface IBudgetUpdateLoadingAction extends ILoadingAction {
  type: typeof BUDGET_UPDATE_LOADING;
}

export interface IBudgetUpdateErrorAction extends IErrorAction {
  type: typeof BUDGET_UPDATE_ERROR;
}

export interface IBudgetUpdateResetAction {
  type: typeof BUDGET_UPDATE_RESET;
}

export interface IBudgetForm {
  name: string;
  amount: number;
  shared: boolean;
}

export type IBudgetUpdateActionTypes =
  | IBudgetUpdateSuccessAction
  | IBudgetUpdateLoadingAction
  | IBudgetUpdateErrorAction
  | IBudgetUpdateResetAction;

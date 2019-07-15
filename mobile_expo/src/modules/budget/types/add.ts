import { IState } from '../../common/types/states';
import { Budget } from '../models/Budget';
import {
  BUDGET_ADD_SUCCESS,
  BUDGET_ADD_LOADING,
  BUDGET_ADD_ERROR,
  BUDGET_ADD_RESET,
} from '../constants/add';
import { IErrorAction, ILoadingAction } from '../../common/types/actions';

export interface IBudgetAddState extends IState {
  payload: Budget | null;
}

export interface IBudgetAddSuccessAction {
  payload: Budget;
  type: typeof BUDGET_ADD_SUCCESS;
}

export interface IBudgetAddLoadingAction extends ILoadingAction {
  type: typeof BUDGET_ADD_LOADING;
}

export interface IBudgetAddErrorAction extends IErrorAction {
  type: typeof BUDGET_ADD_ERROR;
}

export interface IBudgetAddResetAction {
  type: typeof BUDGET_ADD_RESET;
}

export interface IBudgetForm {
  name: string;
  amount: number;
  shared: boolean;
}

export type IBudgetAddActionTypes =
  | IBudgetAddSuccessAction
  | IBudgetAddLoadingAction
  | IBudgetAddErrorAction
  | IBudgetAddResetAction;

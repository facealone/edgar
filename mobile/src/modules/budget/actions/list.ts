import {
  IBudgetListSuccessAction,
  IBudgetListLoadingAction,
  IBudgetListErrorAction,
  IBudgetListResetAction,
} from '../types/list';
import {
  BUDGET_LIST_SUCCESS,
  BUDGET_LIST_LOADING,
  BUDGET_LIST_ERROR,
  BUDGET_LIST_RESET,
} from '../constants/list';
import { IError } from '../../common/models/Error';
import { Budget } from '../models/Budget';

export const success = (payload: Budget[]): IBudgetListSuccessAction => {
  return {
    type: BUDGET_LIST_SUCCESS,
    payload,
  };
};

export const loading = (loading: boolean): IBudgetListLoadingAction => {
  return {
    type: BUDGET_LIST_LOADING,
    loading,
  };
};

export const errors = (errors: IError[]): IBudgetListErrorAction => {
  return {
    type: BUDGET_LIST_ERROR,
    errors,
  };
};

export const reset = (): IBudgetListResetAction => {
  return {
    type: BUDGET_LIST_RESET,
  };
};

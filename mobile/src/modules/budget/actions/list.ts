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
import { Error } from '../../common/models/Error';
import { Budget } from '../models/Budget';
import { Pagination } from '../../common/models/Pagination';

export const success = (
  payload: Pagination<Budget>,
): IBudgetListSuccessAction => {
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

export const errors = (errors: Error[]): IBudgetListErrorAction => {
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

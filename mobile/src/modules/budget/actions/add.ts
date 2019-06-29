import {
  IBudgetAddSuccessAction,
  IBudgetAddLoadingAction,
  IBudgetAddErrorAction,
  IBudgetAddResetAction,
} from '../types/add';
import {
  BUDGET_ADD_SUCCESS,
  BUDGET_ADD_LOADING,
  BUDGET_ADD_ERROR,
  BUDGET_ADD_RESET,
} from '../constants/add';
import { IError } from '../../common/models/Error';
import { Budget } from '../models/Budget';

export const success = (payload: Budget): IBudgetAddSuccessAction => {
  return {
    type: BUDGET_ADD_SUCCESS,
    payload,
  };
};

export const loading = (loading: boolean): IBudgetAddLoadingAction => {
  return {
    type: BUDGET_ADD_LOADING,
    loading,
  };
};

export const errors = (errors: IError[]): IBudgetAddErrorAction => {
  return {
    type: BUDGET_ADD_ERROR,
    errors,
  };
};

export const reset = (): IBudgetAddResetAction => {
  return {
    type: BUDGET_ADD_RESET,
  };
};

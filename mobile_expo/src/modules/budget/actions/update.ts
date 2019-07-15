import {
  IBudgetUpdateSuccessAction,
  IBudgetUpdateLoadingAction,
  IBudgetUpdateErrorAction,
  IBudgetUpdateResetAction,
} from '../types/update';
import {
  BUDGET_UPDATE_SUCCESS,
  BUDGET_UPDATE_LOADING,
  BUDGET_UPDATE_ERROR,
  BUDGET_UPDATE_RESET,
} from '../constants/update';
import { Error } from '../../common/models/Error';
import { Budget } from '../models/Budget';

export const success = (payload: Budget): IBudgetUpdateSuccessAction => {
  return {
    type: BUDGET_UPDATE_SUCCESS,
    payload,
  };
};

export const loading = (loading: boolean): IBudgetUpdateLoadingAction => {
  return {
    type: BUDGET_UPDATE_LOADING,
    loading,
  };
};

export const errors = (errors: Error[]): IBudgetUpdateErrorAction => {
  return {
    type: BUDGET_UPDATE_ERROR,
    errors,
  };
};

export const reset = (): IBudgetUpdateResetAction => {
  return {
    type: BUDGET_UPDATE_RESET,
  };
};

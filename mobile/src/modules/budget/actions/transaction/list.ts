import { TransactionList } from '../../models/TransactionList';
import {
  IBudgetTransactionListSuccessAction,
  IBudgetTransactionListLoadingAction,
  IBudgetTransactionListErrorAction,
  IBudgetTransactionListResetAction,
} from '../../types/transaction/list';
import {
  BUDGET_TRANSACTION_LIST_SUCCESS,
  BUDGET_TRANSACTION_LIST_LOADING,
  BUDGET_TRANSACTION_LIST_ERROR,
  BUDGET_TRANSACTION_LIST_RESET,
} from '../../constants/transaction/list';
import { IError } from '../../../common/models/Error';

export const success = (
  payload: TransactionList,
): IBudgetTransactionListSuccessAction => {
  return {
    type: BUDGET_TRANSACTION_LIST_SUCCESS,
    payload,
  };
};

export const loading = (
  loading: boolean,
): IBudgetTransactionListLoadingAction => {
  return {
    type: BUDGET_TRANSACTION_LIST_LOADING,
    loading,
  };
};

export const errors = (errors: IError[]): IBudgetTransactionListErrorAction => {
  return {
    type: BUDGET_TRANSACTION_LIST_ERROR,
    errors,
  };
};

export const reset = (): IBudgetTransactionListResetAction => {
  return {
    type: BUDGET_TRANSACTION_LIST_RESET,
  };
};

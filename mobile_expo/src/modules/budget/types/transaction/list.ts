import { IState } from '../../../common/types/states';
import { TransactionList } from '../../models/TransactionList';
import {
  BUDGET_TRANSACTION_LIST_SUCCESS,
  BUDGET_TRANSACTION_LIST_ERROR,
  BUDGET_TRANSACTION_LIST_RESET,
  BUDGET_TRANSACTION_LIST_LOADING,
} from '../../constants/transaction/list';
import { IErrorAction, ILoadingAction } from '../../../common/types/actions';

export interface IBudgetTransactionListSate extends IState {
  payload: TransactionList | null;
}

export interface IBudgetTransactionListSuccessAction {
  payload: TransactionList;
  type: typeof BUDGET_TRANSACTION_LIST_SUCCESS;
}

export interface IBudgetTransactionListLoadingAction extends ILoadingAction {
  type: typeof BUDGET_TRANSACTION_LIST_LOADING;
}

export interface IBudgetTransactionListErrorAction extends IErrorAction {
  type: typeof BUDGET_TRANSACTION_LIST_ERROR;
}

export interface IBudgetTransactionListResetAction {
  type: typeof BUDGET_TRANSACTION_LIST_RESET;
}

export type IBudgetTransactionListActionTypes =
  | IBudgetTransactionListSuccessAction
  | IBudgetTransactionListLoadingAction
  | IBudgetTransactionListErrorAction
  | IBudgetTransactionListResetAction;

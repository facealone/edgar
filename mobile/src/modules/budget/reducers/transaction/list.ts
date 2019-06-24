import {
  IBudgetTransactionListSate,
  IBudgetTransactionListActionTypes,
} from '../../types/transaction/list';
import {
  BUDGET_TRANSACTION_LIST_SUCCESS,
  BUDGET_TRANSACTION_LIST_ERROR,
  BUDGET_TRANSACTION_LIST_RESET,
  BUDGET_TRANSACTION_LIST_LOADING,
} from '../../constants/transaction/list';
import { AUTH_AUTHENTICATION_LOGOUT } from '../../../auth/constants/authentication';
import { HOUSE_CURRENT_SUCCESS } from '../../../house/constants/current';

const initialState: IBudgetTransactionListSate = {
  payload: null,
  errors: [],
  loading: false,
};

export const listReducers = (
  state = initialState,
  action: IBudgetTransactionListActionTypes,
): IBudgetTransactionListSate => {
  switch (action.type) {
    case BUDGET_TRANSACTION_LIST_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case BUDGET_TRANSACTION_LIST_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case BUDGET_TRANSACTION_LIST_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case BUDGET_TRANSACTION_LIST_RESET:
      return {
        ...state,
        loading: false,
        errors: [],
      };

    case AUTH_AUTHENTICATION_LOGOUT:
    case HOUSE_CURRENT_SUCCESS:
      return initialState;

    default:
      return state;
  }
};

import { IBudgetListSate, IBudgetListActionTypes } from '../types/list';
import {
  BUDGET_LIST_SUCCESS,
  BUDGET_LIST_ERROR,
  BUDGET_LIST_RESET,
  BUDGET_LIST_LOADING,
} from '../constants/list';
import { AUTH_AUTHENTICATION_LOGOUT } from '../../auth/constants/authentication';
import { HOUSE_CURRENT_SUCCESS } from '../../house/constants/current';
import { BUDGET_ADD_SUCCESS } from '../constants/add';
import { Pagination } from '../../common/models/Pagination';
import { Budget } from '../models/Budget';

const initialState: IBudgetListSate = {
  payload: new Pagination<Budget>(),
  errors: [],
  loading: false,
};

export const listReducers = (
  state = initialState,
  action: IBudgetListActionTypes,
): IBudgetListSate => {
  switch (action.type) {
    case BUDGET_LIST_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case BUDGET_ADD_SUCCESS:
      return {
        ...state,
        payload: {
          ...state.payload,
          items: [
            ...state.payload.items.slice(0, 0),
            action.payload,
            ...state.payload.items.slice(0),
          ],
          totalItems: state.payload.totalItems + 1,
        },
      };

    case BUDGET_LIST_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case BUDGET_LIST_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case BUDGET_LIST_RESET:
      return {
        ...state,
        errors: [],
        loading: false,
      };

    case AUTH_AUTHENTICATION_LOGOUT:
    case HOUSE_CURRENT_SUCCESS:
      return initialState;

    default:
      return state;
  }
};

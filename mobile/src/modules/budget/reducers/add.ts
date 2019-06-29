import { IBudgetAddState, IBudgetAddActionTypes } from '../types/add';
import {
  BUDGET_ADD_RESET,
  BUDGET_ADD_SUCCESS,
  BUDGET_ADD_LOADING,
  BUDGET_ADD_ERROR,
} from '../constants/add';

const initialState: IBudgetAddState = {
  payload: null,
  loading: false,
  errors: [],
};

export const addReducers = (
  state = initialState,
  action: IBudgetAddActionTypes,
): IBudgetAddState => {
  switch (action.type) {
    case BUDGET_ADD_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case BUDGET_ADD_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case BUDGET_ADD_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case BUDGET_ADD_RESET:
      return initialState;

    default:
      return state;
  }
};

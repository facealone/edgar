import { IBudgetUpdateState, IBudgetUpdateActionTypes } from '../types/update';
import {
  BUDGET_UPDATE_RESET,
  BUDGET_UPDATE_SUCCESS,
  BUDGET_UPDATE_LOADING,
  BUDGET_UPDATE_ERROR,
} from '../constants/update';

const initialState: IBudgetUpdateState = {
  payload: null,
  loading: false,
  errors: [],
};

export const updateReducers = (
  state = initialState,
  action: IBudgetUpdateActionTypes,
): IBudgetUpdateState => {
  switch (action.type) {
    case BUDGET_UPDATE_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case BUDGET_UPDATE_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case BUDGET_UPDATE_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case BUDGET_UPDATE_RESET:
      return initialState;

    default:
      return state;
  }
};

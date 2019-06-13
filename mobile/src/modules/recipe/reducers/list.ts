import { IRecipeListState, IRecipeListActionTypes } from '../types/list';
import {
  RECIPE_LIST_RESET,
  RECIPE_LIST_SUCCESS,
  RECIPE_LIST_LOADING,
  RECIPE_LIST_ERROR,
} from '../constants/list';

const initialState: IRecipeListState = {
  payload: [],
  loading: false,
  errors: [],
};

export const listReducers = (
  state = initialState,
  action: IRecipeListActionTypes,
): IRecipeListState => {
  switch (action.type) {
    case RECIPE_LIST_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case RECIPE_LIST_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case RECIPE_LIST_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case RECIPE_LIST_RESET:
      return initialState;

    default:
      return state;
  }
};

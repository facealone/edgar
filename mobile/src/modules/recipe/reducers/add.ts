import { IRecipeAddState, IRecipeAddActionTypes } from '../types/add';
import {
  RECIPE_ADD_RESET,
  RECIPE_ADD_SUCCESS,
  RECIPE_ADD_LOADING,
  RECIPE_ADD_ERROR,
} from '../constants/add';

const initialState: IRecipeAddState = {
  payload: null,
  loading: false,
  errors: [],
};

export const addReducers = (
  state = initialState,
  action: IRecipeAddActionTypes,
): IRecipeAddState => {
  switch (action.type) {
    case RECIPE_ADD_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case RECIPE_ADD_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case RECIPE_ADD_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case RECIPE_ADD_RESET:
      return initialState;

    default:
      return state;
  }
};

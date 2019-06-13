import { IRecipeRemoveState, IRecipeRemoveActionTypes } from '../types/remove';
import {
  RECIPE_REMOVE_RESET,
  RECIPE_REMOVE_SUCCESS,
  RECIPE_REMOVE_LOADING,
  RECIPE_REMOVE_ERROR,
} from '../constants/remove';

const initialState: IRecipeRemoveState = {
  id: null,
  loading: false,
  errors: [],
};

export const removeReducers = (
  state = initialState,
  action: IRecipeRemoveActionTypes,
): IRecipeRemoveState => {
  switch (action.type) {
    case RECIPE_REMOVE_SUCCESS:
      return {
        ...state,
        id: action.id,
      };

    case RECIPE_REMOVE_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case RECIPE_REMOVE_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case RECIPE_REMOVE_RESET:
      return initialState;

    default:
      return state;
  }
};

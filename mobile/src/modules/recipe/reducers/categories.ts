import {
  RECIPE_CATEGORIES_RESET,
  RECIPE_CATEGORIES_SUCCESS,
  RECIPE_CATEGORIES_LOADING,
  RECIPE_CATEGORIES_ERROR,
} from '../constants/categories';
import { ICategoriesState, ICategoriesActionTypes } from '../types/categories';

const initialState: ICategoriesState = {
  payload: [],
  loading: false,
  errors: [],
};

export const categoriesReducers = (
  state = initialState,
  action: ICategoriesActionTypes,
): ICategoriesState => {
  switch (action.type) {
    case RECIPE_CATEGORIES_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case RECIPE_CATEGORIES_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case RECIPE_CATEGORIES_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case RECIPE_CATEGORIES_RESET:
      return {
        ...state,
        errors: [],
        loading: false,
        currentFilter: null,
      };

    default:
      return state;
  }
};

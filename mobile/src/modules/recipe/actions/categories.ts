import {
  RECIPE_CATEGORIES_SUCCESS,
  RECIPE_CATEGORIES_LOADING,
  RECIPE_CATEGORIES_ERROR,
  RECIPE_CATEGORIES_RESET,
} from '../constants/categories';
import { Error } from '../../common/models/Error';
import {
  ICategoriesSuccessAction,
  ICategoriesResetAction,
  ICategoriesErrorAction,
  ICategoriesLoadingAction,
} from '../types/categories';
import { RecipeCategory } from '../models/RecipeCategory';

export const success = (
  payload: RecipeCategory[],
): ICategoriesSuccessAction => {
  return {
    type: RECIPE_CATEGORIES_SUCCESS,
    payload,
  };
};

export const loading = (loading: boolean): ICategoriesLoadingAction => {
  return {
    type: RECIPE_CATEGORIES_LOADING,
    loading,
  };
};

export const errors = (errors: Error[]): ICategoriesErrorAction => {
  return {
    type: RECIPE_CATEGORIES_ERROR,
    errors,
  };
};

export const reset = (): ICategoriesResetAction => {
  return {
    type: RECIPE_CATEGORIES_RESET,
  };
};

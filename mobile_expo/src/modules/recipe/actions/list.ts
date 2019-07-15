import { Recipe } from '../models/Recipe';
import {
  RECIPE_LIST_SUCCESS,
  RECIPE_LIST_LOADING,
  RECIPE_LIST_ERROR,
  RECIPE_LIST_RESET,
} from '../constants/list';
import { Error } from '../../common/models/Error';
import {
  IRecipeListSuccessAction,
  IRecipeListResetAction,
  IRecipeListErrorAction,
  IRecipeListLoadingAction,
} from '../types/list';
import { Pagination } from '../../common/models/Pagination';

export const success = (
  payload: Pagination<Recipe>,
): IRecipeListSuccessAction => {
  return {
    type: RECIPE_LIST_SUCCESS,
    payload,
  };
};

export const loading = (loading: boolean): IRecipeListLoadingAction => {
  return {
    type: RECIPE_LIST_LOADING,
    loading,
  };
};

export const errors = (errors: Error[]): IRecipeListErrorAction => {
  return {
    type: RECIPE_LIST_ERROR,
    errors,
  };
};

export const reset = (): IRecipeListResetAction => {
  return {
    type: RECIPE_LIST_RESET,
  };
};

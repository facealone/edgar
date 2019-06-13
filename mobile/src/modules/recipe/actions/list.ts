import { IRecipe } from '../models/Recipe';
import {
  RECIPE_LIST_SUCCESS,
  RECIPE_LIST_LOADING,
  RECIPE_LIST_ERROR,
  RECIPE_LIST_RESET,
} from '../constants/list';
import { IError } from '../../common/models/Error';
import {
  IRecipeListSuccessAction,
  IRecipeListResetAction,
  IRecipeListErrorAction,
  IRecipeListLoadingAction,
} from '../types/list';

export const success = (payload: IRecipe[]): IRecipeListSuccessAction => {
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

export const errors = (errors: IError[]): IRecipeListErrorAction => {
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

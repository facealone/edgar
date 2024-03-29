import { Recipe } from '../models/Recipe';
import {
  RECIPE_ADD_SUCCESS,
  RECIPE_ADD_LOADING,
  RECIPE_ADD_ERROR,
  RECIPE_ADD_RESET,
} from '../constants/add';
import { Error } from '../../common/models/Error';
import {
  IRecipeAddSuccessAction,
  IRecipeAddResetAction,
  IRecipeAddErrorAction,
  IRecipeAddLoadingAction,
} from '../types/add';

export const success = (payload: Recipe): IRecipeAddSuccessAction => {
  return {
    type: RECIPE_ADD_SUCCESS,
    payload,
  };
};

export const loading = (loading: boolean): IRecipeAddLoadingAction => {
  return {
    type: RECIPE_ADD_LOADING,
    loading,
  };
};

export const errors = (errors: Error[]): IRecipeAddErrorAction => {
  return {
    type: RECIPE_ADD_ERROR,
    errors,
  };
};

export const reset = (): IRecipeAddResetAction => {
  return {
    type: RECIPE_ADD_RESET,
  };
};

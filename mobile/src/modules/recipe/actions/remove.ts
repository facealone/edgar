import {
  RECIPE_REMOVE_SUCCESS,
  RECIPE_REMOVE_LOADING,
  RECIPE_REMOVE_ERROR,
  RECIPE_REMOVE_RESET,
} from '../constants/remove';
import { Error } from '../../common/models/Error';
import {
  IRecipeRemoveSuccessAction,
  IRecipeRemoveResetAction,
  IRecipeRemoveErrorAction,
  IRecipeRemoveLoadingAction,
} from '../types/remove';

export const success = (id: string): IRecipeRemoveSuccessAction => {
  return {
    type: RECIPE_REMOVE_SUCCESS,
    id,
  };
};

export const loading = (loading: boolean): IRecipeRemoveLoadingAction => {
  return {
    type: RECIPE_REMOVE_LOADING,
    loading,
  };
};

export const errors = (errors: Error[]): IRecipeRemoveErrorAction => {
  return {
    type: RECIPE_REMOVE_ERROR,
    errors,
  };
};

export const reset = (): IRecipeRemoveResetAction => {
  return {
    type: RECIPE_REMOVE_RESET,
  };
};

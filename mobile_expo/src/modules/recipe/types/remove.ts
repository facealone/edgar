import { IRecipe } from '../models/Recipe';
import { IState } from '../../common/types/states';
import {
  RECIPE_REMOVE_SUCCESS,
  RECIPE_REMOVE_LOADING,
  RECIPE_REMOVE_RESET,
  RECIPE_REMOVE_ERROR,
} from '../constants/remove';
import { ILoadingAction, IErrorAction } from '../../common/types/actions';

export interface IRecipeRemoveState extends IState {
  id: string | null;
}

export interface IRecipeRemoveSuccessAction {
  type: typeof RECIPE_REMOVE_SUCCESS;
  id: string;
}

export interface IRecipeRemoveLoadingAction extends ILoadingAction {
  type: typeof RECIPE_REMOVE_LOADING;
}

export interface IRecipeRemoveErrorAction extends IErrorAction {
  type: typeof RECIPE_REMOVE_ERROR;
}

export interface IRecipeRemoveResetAction {
  type: typeof RECIPE_REMOVE_RESET;
}

export type IRecipeRemoveActionTypes =
  | IRecipeRemoveSuccessAction
  | IRecipeRemoveErrorAction
  | IRecipeRemoveResetAction
  | IRecipeRemoveLoadingAction;

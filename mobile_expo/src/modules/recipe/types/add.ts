import { IRecipe } from '../models/Recipe';
import { IState } from '../../common/types/states';
import {
  RECIPE_ADD_SUCCESS,
  RECIPE_ADD_LOADING,
  RECIPE_ADD_RESET,
  RECIPE_ADD_ERROR,
} from '../constants/add';
import { ILoadingAction, IErrorAction } from '../../common/types/actions';

export interface IRecipeAddState extends IState {
  payload: IRecipe | null;
}

export interface IRecipeAddSuccessAction {
  type: typeof RECIPE_ADD_SUCCESS;
  payload: IRecipe;
}

export interface IRecipeAddLoadingAction extends ILoadingAction {
  type: typeof RECIPE_ADD_LOADING;
}

export interface IRecipeAddErrorAction extends IErrorAction {
  type: typeof RECIPE_ADD_ERROR;
}

export interface IRecipeAddResetAction {
  type: typeof RECIPE_ADD_RESET;
}

export interface IRecipeForm {
  name: string;
  uri: string;
  recipeCategory: string;
}

export type IRecipeAddActionTypes =
  | IRecipeAddSuccessAction
  | IRecipeAddErrorAction
  | IRecipeAddResetAction
  | IRecipeAddLoadingAction;

import { IState } from '../../common/types/states';
import {
  RECIPE_CATEGORIES_SUCCESS,
  RECIPE_CATEGORIES_LOADING,
  RECIPE_CATEGORIES_RESET,
  RECIPE_CATEGORIES_ERROR,
} from '../constants/categories';
import { ILoadingAction, IErrorAction } from '../../common/types/actions';
import { RecipeCategory } from '../models/RecipeCategory';

export interface ICategoriesState extends IState {
  payload: RecipeCategory[];
}

export interface ICategoriesSuccessAction {
  type: typeof RECIPE_CATEGORIES_SUCCESS;
  payload: RecipeCategory[];
}

export interface ICategoriesLoadingAction extends ILoadingAction {
  type: typeof RECIPE_CATEGORIES_LOADING;
}

export interface ICategoriesErrorAction extends IErrorAction {
  type: typeof RECIPE_CATEGORIES_ERROR;
}

export interface ICategoriesResetAction {
  type: typeof RECIPE_CATEGORIES_RESET;
}

export type ICategoriesActionTypes =
  | ICategoriesSuccessAction
  | ICategoriesErrorAction
  | ICategoriesResetAction
  | ICategoriesLoadingAction;

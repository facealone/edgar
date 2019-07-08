import { Recipe } from '../models/Recipe';
import { IState } from '../../common/types/states';
import {
  RECIPE_LIST_SUCCESS,
  RECIPE_LIST_LOADING,
  RECIPE_LIST_RESET,
  RECIPE_LIST_ERROR,
} from '../constants/list';
import { ILoadingAction, IErrorAction } from '../../common/types/actions';
import { IAuthenticationLogoutAction } from '../../auth/types/authentication';
import { IRecipeAddSuccessAction } from './add';
import { IRecipeRemoveSuccessAction } from './remove';
import { ICurrentHouseSuccessAction } from '../../house/types/current';
import { Pagination } from '../../common/models/Pagination';

export interface IRecipeListState extends IState {
  payload: Pagination<Recipe>;
}

export interface IRecipeListSuccessAction {
  type: typeof RECIPE_LIST_SUCCESS;
  payload: Pagination<Recipe>;
}

export interface IRecipeListLoadingAction extends ILoadingAction {
  type: typeof RECIPE_LIST_LOADING;
}

export interface IRecipeListErrorAction extends IErrorAction {
  type: typeof RECIPE_LIST_ERROR;
}

export interface IRecipeListResetAction {
  type: typeof RECIPE_LIST_RESET;
}

export type IRecipeListActionTypes =
  | IRecipeListSuccessAction
  | IRecipeListErrorAction
  | IRecipeAddSuccessAction
  | IRecipeRemoveSuccessAction
  | IRecipeListResetAction
  | ICurrentHouseSuccessAction
  | IRecipeListLoadingAction
  | IAuthenticationLogoutAction;

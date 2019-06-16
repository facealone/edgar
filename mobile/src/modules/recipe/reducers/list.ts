import { IRecipeListState, IRecipeListActionTypes } from '../types/list';
import {
  RECIPE_LIST_RESET,
  RECIPE_LIST_SUCCESS,
  RECIPE_LIST_LOADING,
  RECIPE_LIST_ERROR,
} from '../constants/list';
import { AUTH_AUTHENTICATION_LOGOUT } from '../../auth/constants/authentication';
import { RECIPE_ADD_SUCCESS } from '../constants/add';
import { RECIPE_REMOVE_SUCCESS } from '../constants/remove';
import { HOUSE_CURRENT_SUCCESS } from '../../house/constants/current';

const initialState: IRecipeListState = {
  payload: [],
  loading: false,
  errors: [],
};

export const listReducers = (
  state = initialState,
  action: IRecipeListActionTypes,
): IRecipeListState => {
  switch (action.type) {
    case RECIPE_LIST_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case RECIPE_ADD_SUCCESS:
      return {
        ...state,
        payload: [...state.payload, action.payload],
      };

    case RECIPE_REMOVE_SUCCESS:
      return {
        ...state,
        payload: state.payload.filter(recipe => recipe.id !== action.id),
      };

    case RECIPE_LIST_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case RECIPE_LIST_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case RECIPE_LIST_RESET:
    case AUTH_AUTHENTICATION_LOGOUT:
    case HOUSE_CURRENT_SUCCESS:
      return initialState;

    default:
      return state;
  }
};

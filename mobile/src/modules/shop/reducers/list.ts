import { IShopListState, IShopListActionTypes } from '../types/list';
import {
  SHOP_LIST_SUCCESS,
  SHOP_LIST_LOADING,
  SHOP_LIST_ERROR,
  SHOP_LIST_RESET,
} from '../constants/list';
import { SHOP_ADD_SUCCESS } from '../constants/add';
import { AUTH_AUTHENTICATION_LOGOUT } from '../../auth/constants/authentication';
import { HOUSE_CURRENT_SUCCESS } from '../../house/constants/current';

const initialState: IShopListState = {
  loading: false,
  payload: [],
  errors: [],
};

export const listReducers = (
  state = initialState,
  action: IShopListActionTypes,
): IShopListState => {
  switch (action.type) {
    case SHOP_LIST_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case SHOP_ADD_SUCCESS:
      return {
        ...state,
        payload: [...state.payload, action.payload],
      };

    case SHOP_LIST_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case SHOP_LIST_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case SHOP_LIST_RESET:
    case AUTH_AUTHENTICATION_LOGOUT:
    case HOUSE_CURRENT_SUCCESS:
      return initialState;

    default:
      return state;
  }
};

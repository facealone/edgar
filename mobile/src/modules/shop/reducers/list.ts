import { IShopListState, IShopListActionTypes } from '../types/list';
import {
  SHOP_LIST_SUCCESS,
  SHOP_LIST_LOADING,
  SHOP_LIST_ERROR,
  SHOP_LIST_RESET,
} from '../constants/list';

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
      return initialState;

    default:
      return state;
  }
};

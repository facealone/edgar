import { IShopAddState, IShopAddActionTypes } from '../types/add';
import {
  SHOP_ADD_SUCCESS,
  SHOP_ADD_LOADING,
  SHOP_ADD_RESET,
  SHOP_ADD_ERROR,
} from '../constants/add';

const initialState: IShopAddState = {
  loading: false,
  errors: [],
  payload: null,
};

export const addReducers = (
  state = initialState,
  action: IShopAddActionTypes,
): IShopAddState => {
  switch (action.type) {
    case SHOP_ADD_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case SHOP_ADD_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case SHOP_ADD_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case SHOP_ADD_RESET:
      return initialState;

    default:
      return state;
  }
};

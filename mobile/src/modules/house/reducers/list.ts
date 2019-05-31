import { IHouseListState, IHouseListActionTypes } from '../types/list';
import {
  HOUSE_LIST_SUCCESS,
  HOUSE_LIST_LOADING,
  HOUSE_LIST_ERROR,
  HOUSE_LIST_RESET,
} from '../constants/list';
import { HOUSE_ADD_SUCCESS } from '../constants/add';
import { AUTH_AUTHENTICATION_LOGOUT } from '../../auth/constants/authentication';

const initialState: IHouseListState = {
  loading: false,
  payload: [],
  errors: [],
};

export const listReducers = (
  state = initialState,
  action: IHouseListActionTypes,
): IHouseListState => {
  switch (action.type) {
    case HOUSE_ADD_SUCCESS:
      return {
        ...state,
        payload: [...state.payload, action.payload],
      };

    case HOUSE_LIST_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case HOUSE_LIST_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case HOUSE_LIST_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case HOUSE_LIST_RESET:
    case AUTH_AUTHENTICATION_LOGOUT:
      return initialState;

    default:
      return state;
  }
};

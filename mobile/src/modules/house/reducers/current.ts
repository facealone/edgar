import { ICurrentHouseActionTypes, ICurrentHouseState } from '../types/current';
import {
  HOUSE_CURRENT_SUCCESS,
  HOUSE_CURRENT_LOADING,
  HOUSE_CURRENT_ERROR,
  HOUSE_CURRENT_RESET,
} from '../constants/current';
import { HOUSE_ADD_SUCCESS } from '../constants/add';
import { AUTH_AUTHENTICATION_LOGOUT } from '../../auth/constants/authentication';

const initialState: ICurrentHouseState = {
  payload: null,
  loading: false,
  errors: [],
};

export const currentReducers = (
  state = initialState,
  action: ICurrentHouseActionTypes,
) => {
  switch (action.type) {
    case HOUSE_ADD_SUCCESS:
    case HOUSE_CURRENT_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case HOUSE_CURRENT_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case HOUSE_CURRENT_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case HOUSE_CURRENT_RESET:
      return {
        ...state,
        loading: false,
        errors: [],
      };

    case AUTH_AUTHENTICATION_LOGOUT:
      return initialState;

    default:
      return state;
  }
};

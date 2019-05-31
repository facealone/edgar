import { ICardListState, ICardListActionTypes } from '../types/list';
import {
  CARD_LIST_SUCCESS,
  CARD_LIST_LOADING,
  CARD_LIST_ERROR,
  CARD_LIST_RESET,
} from '../constants/list';
import { CARD_ADD_SUCCESS } from '../constants/add';
import { AUTH_AUTHENTICATION_LOGOUT } from '../../auth/constants/authentication';

const initialState: ICardListState = {
  loading: false,
  payload: [],
  errors: [],
};

export const listReducers = (
  state = initialState,
  action: ICardListActionTypes,
): ICardListState => {
  switch (action.type) {
    case CARD_ADD_SUCCESS:
      return {
        ...state,
        payload: [...state.payload, action.payload],
      };

    case CARD_LIST_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case CARD_LIST_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case CARD_LIST_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case CARD_LIST_RESET:
    case AUTH_AUTHENTICATION_LOGOUT:
      return initialState;

    default:
      return state;
  }
};

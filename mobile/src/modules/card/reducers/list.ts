import { ICardListActionTypes, ICardListState } from '../types/list';
import {
  CARD_LIST_SUCCESS,
  CARD_LIST_LOADING,
  CARD_LIST_ERROR,
  CARD_LIST_RESET,
} from '../constants/list';
import { CARD_ADD_SUCCESS } from '../constants/add';
import { AUTH_AUTHENTICATION_LOGOUT } from '../../auth/constants/authentication';
import { CARD_REMOVE_SUCCESS } from '../constants/remove';
import { HOUSE_CURRENT_SUCCESS } from '../../house/constants/current';
import { Pagination } from '../../common/models/Pagination';
import { Card } from '../models/Card';

const initialState: ICardListState = {
  loading: false,
  payload: new Pagination<Card>(),
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
        payload: {
          ...state.payload,
          items: [
            ...state.payload.items.slice(0, 0),
            action.payload,
            ...state.payload.items.slice(0),
          ],
          totalItems: state.payload.totalItems + 1,
        },
      };

    case CARD_LIST_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case CARD_REMOVE_SUCCESS:
      return {
        ...state,
        payload: {
          ...state.payload,
          items: state.payload.items.filter(card => card.id !== action.id),
          totalItems: state.payload.totalItems - 1,
        },
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
      return {
        ...state,
        errors: [],
        loading: false,
      };

    case AUTH_AUTHENTICATION_LOGOUT:
    case HOUSE_CURRENT_SUCCESS:
      return initialState;

    default:
      return state;
  }
};

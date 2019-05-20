import { ICardListState, ICardListActionTypes } from '../types/list';
import {
  CARD_LIST_SUCCESS,
  CARD_LIST_LOADING,
  CARD_LIST_ERROR,
  CARD_LIST_RESET,
} from '../constants/list';

const initialState: ICardListState = {
  loading: false,
  payload: [],
  errors: [],
};

export const listReducers = (
  state: ICardListState = initialState,
  action: ICardListActionTypes,
): ICardListState => {
  switch (action.type) {
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
      return initialState;

    default:
      return state;
  }
};

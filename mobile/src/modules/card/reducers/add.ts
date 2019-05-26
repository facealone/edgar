import { ICardAddState, ICardAddActionTypes } from '../types/add';
import {
  CARD_ADD_LOADING,
  CARD_ADD_SUCCESS,
  CARD_ADD_ERROR,
  CARD_ADD_RESET,
} from '../constants/add';

const initialState: ICardAddState = {
  payload: {},
  errors: [],
  loading: false,
};

export const addReducers = (
  state = initialState,
  action: ICardAddActionTypes,
): ICardAddState => {
  switch (action.type) {
    case CARD_ADD_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case CARD_ADD_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case CARD_ADD_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case CARD_ADD_RESET:
      return initialState;

    default:
      return state;
  }
};

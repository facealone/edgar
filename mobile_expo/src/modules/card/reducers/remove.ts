import { ICardRemoveState, ICardRemoveActionTypes } from '../types/remove';
import {
  CARD_REMOVE_SUCCESS,
  CARD_REMOVE_LOADING,
  CARD_REMOVE_ERROR,
  CARD_REMOVE_RESET,
} from '../constants/remove';

const initialState: ICardRemoveState = {
  loading: false,
  id: null,
  errors: [],
};

export const removeReducers = (
  state = initialState,
  action: ICardRemoveActionTypes,
) => {
  switch (action.type) {
    case CARD_REMOVE_SUCCESS:
      return {
        ...state,
        id: action.id,
      };

    case CARD_REMOVE_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case CARD_REMOVE_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case CARD_REMOVE_RESET:
      return initialState;

    default:
      return state;
  }
};

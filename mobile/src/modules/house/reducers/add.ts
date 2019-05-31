import { IHouseAddState, IHouseAddActionTypes } from '../types/add';
import {
  HOUSE_ADD_SUCCESS,
  HOUSE_ADD_LOADING,
  HOUSE_ADD_ERROR,
  HOUSE_ADD_RESET,
} from '../constants/add';

const initialState: IHouseAddState = {
  payload: null,
  loading: false,
  errors: [],
};

export const addReducers = (
  state = initialState,
  action: IHouseAddActionTypes,
): IHouseAddState => {
  switch (action.type) {
    case HOUSE_ADD_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case HOUSE_ADD_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case HOUSE_ADD_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case HOUSE_ADD_RESET:
      return initialState;

    default:
      return state;
  }
};

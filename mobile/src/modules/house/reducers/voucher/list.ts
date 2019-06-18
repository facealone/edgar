import {
  IHouseVoucherListState,
  IHouseVoucherListActionTypes,
} from '../../types/voucher/list';
import {
  HOUSE_VOUCHER_LIST_SUCCESS,
  HOUSE_VOUCHER_LIST_LOADING,
  HOUSE_VOUCHER_LIST_ERROR,
  HOUSE_VOUCHER_LIST_RESET,
} from '../../constants/voucher/list';
import { HOUSE_VOUCHER_ADD_SUCCESS } from '../../constants/voucher/add';

const initialState: IHouseVoucherListState = {
  payload: [],
  loading: false,
  errors: [],
};

export const listReducers = (
  state = initialState,
  action: IHouseVoucherListActionTypes,
): IHouseVoucherListState => {
  switch (action.type) {
    case HOUSE_VOUCHER_LIST_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case HOUSE_VOUCHER_ADD_SUCCESS:
      return {
        ...state,
        payload: [...state.payload, action.payload],
      };

    case HOUSE_VOUCHER_LIST_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case HOUSE_VOUCHER_LIST_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case HOUSE_VOUCHER_LIST_RESET:
      return initialState;

    default:
      return state;
  }
};

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
import { Pagination } from '../../../common/models/Pagination';
import { Voucher } from '../../models/Voucher';

const initialState: IHouseVoucherListState = {
  payload: new Pagination<Voucher>(),
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

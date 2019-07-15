import {
  IHouseVoucherAddState,
  IHouseVoucherAddActionTypes,
} from '../../types/voucher/add';
import {
  HOUSE_VOUCHER_ADD_SUCCESS,
  HOUSE_VOUCHER_ADD_LOADING,
  HOUSE_VOUCHER_ADD_ERROR,
  HOUSE_VOUCHER_ADD_RESET,
} from '../../constants/voucher/add';

const initialState: IHouseVoucherAddState = {
  payload: null,
  loading: false,
  errors: [],
};

export const addReducers = (
  state = initialState,
  action: IHouseVoucherAddActionTypes,
): IHouseVoucherAddState => {
  switch (action.type) {
    case HOUSE_VOUCHER_ADD_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case HOUSE_VOUCHER_ADD_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case HOUSE_VOUCHER_ADD_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case HOUSE_VOUCHER_ADD_RESET:
      return initialState;

    default:
      return state;
  }
};

import {
  IHouseMemberListState,
  IHouseMemberListActionTypes,
} from '../../types/member/list';
import {
  HOUSE_MEMBER_LIST_SUCCESS,
  HOUSE_MEMBER_LIST_LOADING,
  HOUSE_MEMBER_LIST_ERROR,
  HOUSE_MEMBER_LIST_RESET,
} from '../../constants/member/list';

const initialState: IHouseMemberListState = {
  loading: false,
  errors: [],
  payload: [],
};

export const listReducers = (
  state = initialState,
  action: IHouseMemberListActionTypes,
): IHouseMemberListState => {
  switch (action.type) {
    case HOUSE_MEMBER_LIST_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case HOUSE_MEMBER_LIST_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case HOUSE_MEMBER_LIST_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case HOUSE_MEMBER_LIST_RESET:
      return initialState;

    default:
      return state;
  }
};

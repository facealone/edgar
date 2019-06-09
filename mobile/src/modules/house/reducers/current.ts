import { ICurrentHouseActionTypes, ICurrentHouseState } from '../types/current';
import { HOUSE_CURRENT_SUCCESS } from '../constants/current';
import { HOUSE_ADD_SUCCESS } from '../constants/add';
import { AUTH_AUTHENTICATION_LOGOUT } from '../../auth/constants/authentication';

const initialState: ICurrentHouseState = {
  payload: null,
};

export const currentReducers = (
  state = initialState,
  action: ICurrentHouseActionTypes,
) => {
  switch (action.type) {
    case HOUSE_ADD_SUCCESS:
    case HOUSE_CURRENT_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };
    case AUTH_AUTHENTICATION_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

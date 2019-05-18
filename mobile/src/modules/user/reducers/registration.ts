import {
  IRegistrationState,
  RegistrationActionTypes,
} from '../types/registration';
import {
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_RESET,
  USER_REGISTRATION_LOADING,
  USER_REGISTRATION_ERROR,
} from '../constants/registration';

const initialState: IRegistrationState = {
  loading: false,
  payload: null,
  errors: [],
};

export const registrationReducers = (
  state = initialState,
  action: RegistrationActionTypes,
): IRegistrationState => {
  switch (action.type) {
    case USER_REGISTRATION_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case USER_REGISTRATION_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case USER_REGISTRATION_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case USER_REGISTRATION_RESET:
      return initialState;

    default:
      return state;
  }
};

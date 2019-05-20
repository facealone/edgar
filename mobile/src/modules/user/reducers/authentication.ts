import {
  USER_AUTHENTICATION_LOADING,
  USER_AUTHENTICATION_ERROR,
  USER_AUTHENTICATION_AUTHENTICATED,
  USER_AUTHENTICATION_RESET,
} from '../constants/authentication';
import {
  IAuthenticatedUserState,
  IAuthenticatedState,
  AuthenticationActionTypes,
} from '../types/authentication';

const initialUserState: IAuthenticatedUserState = {
  firstName: null,
  lastName: null,
  email: null,
};

const initialState: IAuthenticatedState = {
  loading: false,
  authenticated: false,
  errors: [],
  user: initialUserState,
};

export const authenticationReducers = (
  state: IAuthenticatedState = initialState,
  action: AuthenticationActionTypes,
): IAuthenticatedState => {
  switch (action.type) {
    case USER_AUTHENTICATION_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case USER_AUTHENTICATION_AUTHENTICATED:
      return {
        ...state,
        authenticated: action.authenticated,
      };

    case USER_AUTHENTICATION_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case USER_AUTHENTICATION_RESET:
      return initialState;

    default:
      return state;
  }
};

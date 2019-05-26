import {
  AUTH_AUTHENTICATION_LOADING,
  AUTH_AUTHENTICATION_ERROR,
  AUTH_AUTHENTICATION_AUTHENTICATED,
  AUTH_AUTHENTICATION_RESET,
  AUTH_AUTHENTICATION_USER,
} from '../constants/authentication';
import {
  AuthenticationActionTypes,
  IAuthenticationState,
} from '../types/authentication';

const initialState: IAuthenticationState = {
  loading: false,
  authenticated: false,
  errors: [],
  user: null,
};

export const authenticationReducers = (
  state = initialState,
  action: AuthenticationActionTypes,
): IAuthenticationState => {
  switch (action.type) {
    case AUTH_AUTHENTICATION_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case AUTH_AUTHENTICATION_AUTHENTICATED:
      return {
        ...state,
        authenticated: action.authenticated,
      };

    case AUTH_AUTHENTICATION_USER:
      return {
        ...state,
        user: action.user,
      };

    case AUTH_AUTHENTICATION_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case AUTH_AUTHENTICATION_RESET:
      return {
        ...state,
        loading: false,
        errors: [],
      };

    default:
      return state;
  }
};

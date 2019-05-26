export interface IListSuccessAction {
  payload: [];
}

export interface ISuccessAction {
  payload: {};
}

export interface IErrorAction {
  errors: [];
}

export interface ILoadingAction {
  loading: boolean;
}

export interface IBaseState {
  loading: boolean;
  errors: [];
}

export interface IListState extends IBaseState {
  payload: [];
}

export interface IState extends IBaseState {
  payload: {};
}

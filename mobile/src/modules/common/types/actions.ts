import { IError } from '../models/Error';

export interface IErrorAction {
  errors: IError[];
}

export interface ILoadingAction {
  loading: boolean;
}

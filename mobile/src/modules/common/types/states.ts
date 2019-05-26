import { IError } from '../models/Error';

export interface IState {
  loading: boolean;
  errors: IError[];
}

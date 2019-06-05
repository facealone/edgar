import { IHouse } from '../models/House';
import { HOUSE_CURRENT_SUCCESS } from '../constants/current';
import { IHouseAddSuccessAction } from './add';

export interface ICurrentHouseState {
  payload: IHouse | null;
}

export interface ICurrentHouseSuccessAction {
  type: typeof HOUSE_CURRENT_SUCCESS;
  payload: IHouse;
}

export type ICurrentHouseActionTypes =
  | ICurrentHouseSuccessAction
  | IHouseAddSuccessAction;
